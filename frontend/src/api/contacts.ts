import axios from 'axios';
import type { Contact, ContactsResponse, ContactsParams, ContactFormData } from '../types/contact';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactsApi = {
  // Get contacts with optional search and pagination
  getContacts: async (params: ContactsParams = {}): Promise<ContactsResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params.search) searchParams.append('search', params.search);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.favorite !== undefined) searchParams.append('favorite', params.favorite.toString());
    if (params.tags && params.tags.length > 0) searchParams.append('tags', params.tags.join(','));

    const response = await api.get(`/contacts?${searchParams.toString()}`);
    return response.data;
  },

  // Get single contact by ID
  getContact: async (id: string): Promise<Contact> => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  // Create new contact
  createContact: async (contactData: ContactFormData): Promise<Contact> => {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },

  // Update contact
  updateContact: async (id: string, contactData: Partial<ContactFormData>): Promise<Contact> => {
    const response = await api.put(`/contacts/${id}`, contactData);
    return response.data;
  },

  // Delete contact
  deleteContact: async (id: string): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  },

  // Toggle favorite status
  toggleFavorite: async (id: string, favorite: boolean): Promise<Contact> => {
    const response = await api.patch(`/contacts/${id}/favorite`, { favorite });
    return response.data;
  }
};
