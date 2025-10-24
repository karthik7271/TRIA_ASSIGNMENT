import React from 'react';
import type { Contact } from '../types/contact';
import { ContactItem } from './ContactItem';
import { EmptyState } from './EmptyState';

interface ContactListProps {
  contacts: Contact[];
  selectedContactId?: string;
  searchTerm?: string;
  onContactSelect: (contact: Contact) => void;
  onToggleFavorite: (id: string, favorite: boolean) => void;
  isLoading?: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContactId,
  searchTerm,
  onContactSelect,
  onToggleFavorite,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {/* Loading skeleton */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="shrink-0 h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2 animate-pulse" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1 animate-pulse" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="flex-1 overflow-hidden">
        <EmptyState
          title={searchTerm ? 'No contacts found' : 'No contacts yet'}
          description={
            searchTerm
              ? `No contacts match "${searchTerm}". Try adjusting your search.`
              : 'Get started by adding your first contact.'
          }
          actionText={searchTerm ? 'Clear search' : 'Add Contact'}
          onAction={searchTerm ? () => onContactSelect({} as Contact) : undefined} // Clear search or no action for add contact
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div
        className="h-full overflow-y-auto"
        role="list"
        aria-label="Contacts list"
      >
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onClick={onContactSelect}
            onToggleFavorite={onToggleFavorite}
            searchTerm={searchTerm}
            isSelected={selectedContactId === contact.id}
          />
        ))}
      </div>
    </div>
  );
};
