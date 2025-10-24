import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { EmptyState } from '../components/EmptyState'

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(
      <EmptyState
        title="No contacts found"
        description="Try adjusting your search criteria"
      />
    )

    expect(screen.getByText('No contacts found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search criteria')).toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    const mockOnAction = vi.fn()
    
    render(
      <EmptyState
        title="No contacts"
        description="Get started by adding your first contact"
        actionText="Add Contact"
        onAction={mockOnAction}
      />
    )

    const button = screen.getByText('Add Contact')
    expect(button).toBeInTheDocument()
    
    fireEvent.click(button)
    expect(mockOnAction).toHaveBeenCalled()
  })

  it('does not render action button when not provided', () => {
    render(
      <EmptyState
        title="No contacts"
        description="No contacts available"
      />
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
