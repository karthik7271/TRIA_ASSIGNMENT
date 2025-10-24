import { http, HttpResponse } from 'msw';
import { mockContacts } from './data';
import type { Contact, ContactFormData } from '../types/contact';

let contacts = [...mockContacts];

export const handlers = [
  // GET /contacts - List contacts with search and pagination
  http.get('/api/contacts', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const favorite = url.searchParams.get('favorite');
    const tags = url.searchParams.get('tags')?.split(',') || [];

    let filteredContacts = contacts;

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredContacts = filteredContacts.filter(contact =>
        contact.firstName.toLowerCase().includes(searchLower) ||
        contact.lastName.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.company.toLowerCase().includes(searchLower)
      );
    }

    // Apply favorite filter
    if (favorite === 'true') {
      filteredContacts = filteredContacts.filter(contact => contact.favorite);
    }

    // Apply tags filter
    if (tags.length > 0 && tags[0] !== '') {
      filteredContacts = filteredContacts.filter(contact =>
        tags.some(tag => contact.tags.includes(tag))
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedContacts,
      meta: {
        page,
        limit,
        total: filteredContacts.length
      }
    });
  }),

  // GET /contacts/:id - Get single contact
  http.get('/api/contacts/:id', ({ params }) => {
    const contact = contacts.find(c => c.id === params.id);
    if (!contact) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(contact);
  }),

  // POST /contacts - Create new contact
  http.post('/api/contacts', async ({ request }) => {
    const newContact = await request.json() as ContactFormData;
    const contact: Contact = {
      id: crypto.randomUUID(),
      ...newContact,
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    contacts.push(contact);
    return HttpResponse.json(contact, { status: 201 });
  }),

  // PUT /contacts/:id - Update contact
  http.put('/api/contacts/:id', async ({ params, request }) => {
    const contactIndex = contacts.findIndex(c => c.id === params.id);
    if (contactIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updates = await request.json() as Partial<ContactFormData>;
    const updatedContact = {
      ...contacts[contactIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    contacts[contactIndex] = updatedContact;
    return HttpResponse.json(updatedContact);
  }),

  // DELETE /contacts/:id - Delete contact
  http.delete('/api/contacts/:id', ({ params }) => {
    const contactIndex = contacts.findIndex(c => c.id === params.id);
    if (contactIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    contacts.splice(contactIndex, 1);
    return new HttpResponse(null, { status: 204 });
  })
];
