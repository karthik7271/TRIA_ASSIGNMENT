import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContactItem } from '../components/ContactItem'
import type { Contact } from '../types/contact'

const mockContact: Contact = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  avatarUrl: null,
  company: 'Test Company',
  jobTitle: 'Developer',
  tags: ['engineering', 'react'],
  favorite: false,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z'
}

describe('ContactItem', () => {
  it('renders contact information correctly', () => {
    const mockOnClick = vi.fn()
    const mockOnToggleFavorite = vi.fn()

    render(
      <ContactItem
        contact={mockContact}
        onClick={mockOnClick}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('engineering')).toBeInTheDocument()
  })

  it('calls onClick when contact is clicked', () => {
    const mockOnClick = vi.fn()
    const mockOnToggleFavorite = vi.fn()

    render(
      <ContactItem
        contact={mockContact}
        onClick={mockOnClick}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    fireEvent.click(screen.getByLabelText('View details for John Doe'))
    expect(mockOnClick).toHaveBeenCalledWith(mockContact)
  })

  it('calls onToggleFavorite when star is clicked', () => {
    const mockOnClick = vi.fn()
    const mockOnToggleFavorite = vi.fn()

    render(
      <ContactItem
        contact={mockContact}
        onClick={mockOnClick}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    const starButton = screen.getByLabelText('Add to favorites')
    fireEvent.click(starButton)
    expect(mockOnToggleFavorite).toHaveBeenCalledWith('1', true)
  })

  it('shows favorite star when contact is favorited', () => {
    const favoritedContact = { ...mockContact, favorite: true }
    const mockOnClick = vi.fn()
    const mockOnToggleFavorite = vi.fn()

    render(
      <ContactItem
        contact={favoritedContact}
        onClick={mockOnClick}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument()
  })

  it('highlights search terms', () => {
    const mockOnClick = vi.fn()
    const mockOnToggleFavorite = vi.fn()

    render(
      <ContactItem
        contact={mockContact}
        onClick={mockOnClick}
        onToggleFavorite={mockOnToggleFavorite}
        searchTerm="John"
      />
    )

    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Doe')).toBeInTheDocument()
    // Check that highlighting is applied by looking for the mark element
    const container = screen.getByLabelText('View details for John Doe')
    expect(container.innerHTML).toContain('<mark')
  })
})
