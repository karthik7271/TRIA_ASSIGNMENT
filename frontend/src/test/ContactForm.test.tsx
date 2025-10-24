import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from '../components/ContactForm'
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

describe('ContactForm', () => {
  it('renders add contact form when no contact provided', () => {
    const mockOnClose = vi.fn()
    const mockOnSubmit = vi.fn()

    render(
      <ContactForm
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    )

    expect(screen.getByText('Add New Contact')).toBeInTheDocument()
    expect(screen.getByLabelText('First Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Email *')).toBeInTheDocument()
    expect(screen.getByText('Add Contact')).toBeInTheDocument()
  })

  it('renders edit contact form when contact provided', () => {
    const mockOnClose = vi.fn()
    const mockOnSubmit = vi.fn()

    render(
      <ContactForm
        contact={mockContact}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    )

    expect(screen.getByText('Edit Contact')).toBeInTheDocument()
    expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Update Contact')).toBeInTheDocument()
  })

  it('calls onClose when cancel button is clicked', () => {
    const mockOnClose = vi.fn()
    const mockOnSubmit = vi.fn()

    render(
      <ContactForm
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    )

    fireEvent.click(screen.getByText('Cancel'))
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = vi.fn()
    const mockOnSubmit = vi.fn()

    render(
      <ContactForm
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    )

    const closeButton = screen.getByLabelText('Close')
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('prevents submission with invalid form data', async () => {
    const mockOnClose = vi.fn()
    const mockOnSubmit = vi.fn()

    render(
      <ContactForm
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    )

    // Submit form with empty required fields
    fireEvent.click(screen.getByText('Add Contact'))

    // Form should not submit with empty required fields
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with form data when form is valid', async () => {
    const mockOnClose = vi.fn()
    const mockOnSubmit = vi.fn()

    render(
      <ContactForm
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    )

    // Fill in form data
    fireEvent.change(screen.getByLabelText('First Name *'), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByLabelText('Last Name *'), { target: { value: 'Smith' } })
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'jane@example.com' } })
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+1234567890' } })
    fireEvent.change(screen.getByLabelText('Job Title'), { target: { value: 'Designer' } })
    fireEvent.change(screen.getByLabelText('Company'), { target: { value: 'Design Co' } })

    // Submit form
    fireEvent.click(screen.getByText('Add Contact'))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '+1234567890',
        company: 'Design Co',
        jobTitle: 'Designer',
        tags: [],
        favorite: false,
      })
    })
  })

  it('handles tag addition and removal', () => {
    const mockOnClose = vi.fn()
    const mockOnSubmit = vi.fn()

    render(
      <ContactForm
        contact={mockContact}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    )

    // Check existing tags are displayed
    expect(screen.getByText('engineering')).toBeInTheDocument()
    expect(screen.getByText('react')).toBeInTheDocument()

    // Add a new tag
    const tagInput = screen.getByPlaceholderText('Add a tag')
    fireEvent.change(tagInput, { target: { value: 'new-tag' } })
    fireEvent.click(screen.getByText('Add'))

    expect(screen.getByText('new-tag')).toBeInTheDocument()

    // Remove a tag - find the first remove button (X button)
    const removeButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg') && button.className.includes('hover:bg-blue-200')
    )
    fireEvent.click(removeButtons[0]) // Remove first tag

    expect(screen.queryByText('engineering')).not.toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    const mockOnClose = vi.fn()
    const mockOnSubmit = vi.fn()

    render(
      <ContactForm
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    )

    expect(screen.queryByText('Add New Contact')).not.toBeInTheDocument()
  })
})
