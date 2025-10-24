import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useContacts, useToggleFavorite, useDeleteContact, useCreateContact, useUpdateContact } from '../hooks/useContacts';
import type { Contact, ContactFormData } from '../types/contact';
import { TopBar } from '../components/TopBar';
import { ContactList } from '../components/ContactList';
import { ContactDetail } from '../components/ContactDetail';
import { ContactForm } from '../components/ContactForm';
import { useDebounce } from '../hooks/useDebounce';

export const ContactsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactDetail, setShowContactDetail] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  
  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Fetch contacts with search
  const { data: contactsData, isLoading, error } = useContacts({
    search: debouncedSearchTerm,
    limit: 50,
  });
  
  const contacts = contactsData?.data || [];
  
  // Mutations
  const toggleFavoriteMutation = useToggleFavorite();
  const deleteContactMutation = useDeleteContact();
  const createContactMutation = useCreateContact();
  const updateContactMutation = useUpdateContact();
  
  // Handle contact selection
  const handleContactSelect = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setShowContactDetail(true);
  }, []);
  
  // Handle favorite toggle
  const handleToggleFavorite = useCallback((id: string, favorite: boolean) => {
    toggleFavoriteMutation.mutate(
      { id, favorite },
      {
        onSuccess: (updatedContact) => {
          toast.success(favorite ? 'Added to favorites' : 'Removed from favorites');
          // Update selected contact if it's the same contact being toggled
          if (selectedContact && selectedContact.id === id) {
            setSelectedContact(updatedContact);
          }
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || error.message || 'Unknown error';
          toast.error(`Failed to update favorite: ${errorMessage}`);
        },
      }
    );
  }, [toggleFavoriteMutation, selectedContact]);
  
  // Handle contact deletion
  const handleDeleteContact = useCallback((id: string) => {
    deleteContactMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Contact deleted successfully');
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || error.message || 'Unknown error';
        toast.error(`Failed to delete contact: ${errorMessage}`);
      },
    });
  }, [deleteContactMutation]);
  
  // Handle contact edit
  const handleEditContact = useCallback((contact: Contact) => {
    setEditingContact(contact);
    setShowContactForm(true);
    setShowContactDetail(false);
  }, []);
  
  // Close contact detail
  const handleCloseContactDetail = useCallback(() => {
    setShowContactDetail(false);
    setSelectedContact(null);
  }, []);
  
  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);
  
  // Handle add contact
  const handleAddContact = useCallback(() => {
    setEditingContact(null);
    setShowContactForm(true);
  }, []);

  // Handle form submission
  const handleFormSubmit = useCallback((formData: ContactFormData) => {
    if (editingContact) {
      // Update existing contact
      updateContactMutation.mutate(
        { id: editingContact.id, data: formData },
        {
          onSuccess: () => {
            toast.success('Contact updated successfully');
            setShowContactForm(false);
            setEditingContact(null);
          },
          onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error.message || 'Unknown error';
            toast.error(`Failed to update contact: ${errorMessage}`);
          },
        }
      );
    } else {
      // Create new contact
      createContactMutation.mutate(formData, {
        onSuccess: () => {
          toast.success('Contact created successfully');
          setShowContactForm(false);
          setEditingContact(null);
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || error.message || 'Unknown error';
          toast.error(`Failed to create contact: ${errorMessage}`);
        },
      });
    }
  }, [editingContact, createContactMutation, updateContactMutation]);

  // Close contact form
  const handleCloseContactForm = useCallback(() => {
    setShowContactForm(false);
    setEditingContact(null);
  }, []);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showContactDetail) {
          handleCloseContactDetail();
        } else if (showContactForm) {
          handleCloseContactForm();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showContactDetail, showContactForm, handleCloseContactDetail, handleCloseContactForm]);
  
  // Show error toast when contacts fail to load
  useEffect(() => {
    if (error) {
      const errorMessage = (error as any)?.response?.data?.message || error.message || 'Unknown error';
      toast.error(`Failed to load contacts: ${errorMessage}`);
    }
  }, [error]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        onAddContact={handleAddContact}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <ContactList
            contacts={contacts}
            selectedContactId={selectedContact?.id}
            searchTerm={debouncedSearchTerm}
            onContactSelect={handleContactSelect}
            onToggleFavorite={handleToggleFavorite}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {showContactDetail && selectedContact && (
        <ContactDetail
          contact={selectedContact}
          onClose={handleCloseContactDetail}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {showContactForm && (
        <ContactForm
          contact={editingContact}
          isOpen={showContactForm}
          onClose={handleCloseContactForm}
          onSubmit={handleFormSubmit}
          isLoading={createContactMutation.isPending || updateContactMutation.isPending}
        />
      )}
    </div>
  );
};
