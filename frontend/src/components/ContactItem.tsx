import React from 'react';
import type { Contact } from '../types/contact';
import { getInitials, formatPhoneNumber } from '../utils/format';

interface ContactItemProps {
  contact: Contact;
  onClick: (contact: Contact) => void;
  onToggleFavorite: (id: string, favorite: boolean) => void;
  searchTerm?: string;
  isSelected?: boolean;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  onClick,
  onToggleFavorite,
  searchTerm = '',
  isSelected = false,
}) => {
  const handleClick = () => {
    onClick(contact);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(contact.id, !contact.favorite);
  };

  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
  };

  return (
    <div
      className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
        isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View details for ${contact.firstName} ${contact.lastName}`}
    >
      {/* Avatar */}
      <div className="shrink-0 h-12 w-12">
        {contact.avatarUrl ? (
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={contact.avatarUrl}
            alt={`${contact.firstName} ${contact.lastName}`}
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            {getInitials(contact.firstName, contact.lastName)}
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            <span
              dangerouslySetInnerHTML={{
                __html: highlightText(`${contact.firstName} ${contact.lastName}`),
              }}
            />
          </h3>
          <button
            onClick={handleToggleFavorite}
            className={`ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
              contact.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
            }`}
            aria-label={contact.favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className="h-5 w-5"
              fill={contact.favorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          <span
            dangerouslySetInnerHTML={{
              __html: highlightText(contact.jobTitle),
            }}
          />
          {contact.company && (
            <>
              {' '}at{' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightText(contact.company),
                }}
              />
            </>
          )}
        </p>
        
        {/* make the email and phone appear on different lines on mobile */}
        <div className="mt-1 flex flex-col items-start sm:items-center sm:flex-row text-sm text-gray-500 dark:text-gray-400">
          <span
            dangerouslySetInnerHTML={{
              __html: highlightText(contact.email),
            }}
          />
          {contact.phone && (
            <div className="flex items-center">
              <span className="mx-2 hidden sm:inline">•</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightText(formatPhoneNumber(contact.phone)),
                }}
              />
            </div>
          )}
        </div>

        {/* Tags */}
        {contact.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {contact.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                dangerouslySetInnerHTML={{
                  __html: highlightText(tag),
                }}
              />
            ))}
            {contact.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                +{contact.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
