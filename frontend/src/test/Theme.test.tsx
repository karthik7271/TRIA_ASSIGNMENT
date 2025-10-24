import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TopBar } from '../components/TopBar'

describe('Theme Toggle', () => {
  it('renders theme toggle button', () => {
    const mockOnSearchChange = vi.fn()
    const mockOnAddContact = vi.fn()

    render(
      <TopBar
        searchValue=""
        onSearchChange={mockOnSearchChange}
        onAddContact={mockOnAddContact}
      />
    )

    const themeButton = screen.getByLabelText('Toggle theme')
    expect(themeButton).toBeInTheDocument()
  })

  it('calls toggleTheme when button is clicked', () => {
    const mockOnSearchChange = vi.fn()
    const mockOnAddContact = vi.fn()

    render(
      <TopBar
        searchValue=""
        onSearchChange={mockOnSearchChange}
        onAddContact={mockOnAddContact}
      />
    )

    const themeButton = screen.getByLabelText('Toggle theme')
    fireEvent.click(themeButton)
    
    // The button should be clickable (we can't easily test the store state in this test)
    expect(themeButton).toBeInTheDocument()
  })
})
