import { describe, it, expect } from 'vitest'
import { getInitials, formatPhoneNumber, formatDate, highlightSearchTerm } from '../utils/format'

describe('format utilities', () => {
  describe('getInitials', () => {
    it('returns correct initials for names', () => {
      expect(getInitials('John', 'Doe')).toBe('JD')
      expect(getInitials('Jane', 'Smith')).toBe('JS')
    })

    it('handles single character names', () => {
      expect(getInitials('A', 'B')).toBe('AB')
    })
  })

  describe('formatPhoneNumber', () => {
    it('formats 10-digit numbers correctly', () => {
      expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890')
    })

    it('formats 11-digit numbers with country code', () => {
      expect(formatPhoneNumber('11234567890')).toBe('+1 (123) 456-7890')
    })

    it('returns original format for non-standard numbers', () => {
      expect(formatPhoneNumber('+91-9876543210')).toBe('+91-9876543210')
    })
  })

  describe('formatDate', () => {
    it('formats ISO date strings correctly', () => {
      const date = '2023-01-15T10:30:00.000Z'
      const formatted = formatDate(date)
      expect(formatted).toMatch(/Jan 15, 2023/)
    })
  })

  describe('highlightSearchTerm', () => {
    it('highlights search terms in text', () => {
      const text = 'John Doe'
      const searchTerm = 'John'
      const result = highlightSearchTerm(text, searchTerm)
      expect(result).toContain('<mark')
      expect(result).toContain('John')
    })

    it('returns original text when no search term', () => {
      const text = 'John Doe'
      const result = highlightSearchTerm(text, '')
      expect(result).toBe(text)
    })

    it('handles case-insensitive highlighting', () => {
      const text = 'john doe'
      const searchTerm = 'JOHN'
      const result = highlightSearchTerm(text, searchTerm)
      expect(result).toContain('<mark')
    })
  })
})
