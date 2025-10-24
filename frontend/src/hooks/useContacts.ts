import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsApi } from '../api/contacts';
import type { Contact, ContactsParams, ContactFormData } from '../types/contact';

// Query keys
export const contactKeys = {
  all: ['contacts'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  list: (params: ContactsParams) => [...contactKeys.lists(), params] as const,
  details: () => [...contactKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
};

// Hook for fetching contacts list
export const useContacts = (params: ContactsParams = {}) => {
  return useQuery({
    queryKey: contactKeys.list(params),
    queryFn: () => contactsApi.getContacts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook for fetching single contact
export const useContact = (id: string) => {
  return useQuery({
    queryKey: contactKeys.detail(id),
    queryFn: () => contactsApi.getContact(id),
    enabled: !!id,
  });
};

// Hook for creating contact
export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactData: ContactFormData) => contactsApi.createContact(contactData),
    onSuccess: () => {
      // Invalidate and refetch contacts list
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
    },
  });
};

// Hook for updating contact
export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ContactFormData> }) =>
      contactsApi.updateContact(id, data),
    onSuccess: (updatedContact) => {
      // Update the specific contact in cache
      queryClient.setQueryData(contactKeys.detail(updatedContact.id), updatedContact);
      // Invalidate contacts list to refetch
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
    },
  });
};

// Hook for deleting contact
export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactsApi.deleteContact(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: contactKeys.detail(deletedId) });
      // Invalidate contacts list
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
    },
  });
};

// Hook for toggling favorite
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, favorite }: { id: string; favorite: boolean }) =>
      contactsApi.toggleFavorite(id, favorite),
    onMutate: async ({ id, favorite }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: contactKeys.detail(id) });

      // Snapshot the previous value
      const previousContact = queryClient.getQueryData<Contact>(contactKeys.detail(id));

      // Optimistically update
      if (previousContact) {
        queryClient.setQueryData(contactKeys.detail(id), {
          ...previousContact,
          favorite,
        });
      }

      return { previousContact };
    },
    onError: (_, { id }, context) => {
      // Rollback on error
      if (context?.previousContact) {
        queryClient.setQueryData(contactKeys.detail(id), context.previousContact);
      }
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
    },
  });
};
