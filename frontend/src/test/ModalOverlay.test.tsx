import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from '../components/ContactForm'

describe('Modal Overlay', () => {
  it('renders modal with proper overlay structure', () => {
    const mockOnClose = vi.fn()
    const mockOnSubmit = vi.fn()

    render(
      <ContactForm
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    )

    // Check that modal content is present
    expect(screen.getByText('Add Contact')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
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

    expect(screen.queryByText('Add Contact')).not.toBeInTheDocument()
  })
})
