import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookFilter from '../BookFilter'
import { renderWithProviders } from '../../test/test-utils'

describe('BookFilter Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Rendering', () => {
    it('renders search input', () => {
      renderWithProviders(<BookFilter />)
      
      expect(screen.getByLabelText(/cari buku/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/mis: atomic habits/i)).toBeInTheDocument()
    })

    it('renders status filter dropdown', () => {
      renderWithProviders(<BookFilter />)
      
      expect(screen.getByLabelText(/filter status/i)).toBeInTheDocument()
    })

    it('has all status options', () => {
      renderWithProviders(<BookFilter />)
      
      const select = screen.getByLabelText(/filter status/i)
      
      expect(within(select).getByText(/semua status/i)).toBeInTheDocument()
      expect(within(select).getByText(/^milik$/i)).toBeInTheDocument()
      expect(within(select).getByText(/dibaca/i)).toBeInTheDocument()
      expect(within(select).getByText(/akan dibeli/i)).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    it('allows typing in search input', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookFilter />)
      
      const searchInput = screen.getByLabelText(/cari buku/i)
      await user.type(searchInput, 'atomic')
      
      expect(searchInput).toHaveValue('atomic')
    })

    it('updates search term on input change', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookFilter />)
      
      const searchInput = screen.getByLabelText(/cari buku/i)
      
      await user.type(searchInput, 'deep work')
      expect(searchInput).toHaveValue('deep work')
      
      await user.clear(searchInput)
      await user.type(searchInput, 'atomic habits')
      expect(searchInput).toHaveValue('atomic habits')
    })

    it('can clear search input', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookFilter />)
      
      const searchInput = screen.getByLabelText(/cari buku/i)
      
      await user.type(searchInput, 'test search')
      expect(searchInput).toHaveValue('test search')
      
      await user.clear(searchInput)
      expect(searchInput).toHaveValue('')
    })
  })

  describe('Status Filter Functionality', () => {
    it('allows selecting different status options', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookFilter />)
      
      const statusSelect = screen.getByLabelText(/filter status/i)
      
      await user.selectOptions(statusSelect, 'owned')
      expect(statusSelect).toHaveValue('owned')
      
      await user.selectOptions(statusSelect, 'read')
      expect(statusSelect).toHaveValue('read')
      
      await user.selectOptions(statusSelect, 'to-buy')
      expect(statusSelect).toHaveValue('to-buy')
      
      await user.selectOptions(statusSelect, 'all')
      expect(statusSelect).toHaveValue('all')
    })

    it('starts with "all" as default status', () => {
      renderWithProviders(<BookFilter />)
      
      const statusSelect = screen.getByLabelText(/filter status/i)
      expect(statusSelect).toHaveValue('all')
    })
  })

  describe('Responsive Layout', () => {
    it('has responsive flex layout', () => {
      const { container } = renderWithProviders(<BookFilter />)
      
      const filterContainer = container.querySelector('.flex')
      expect(filterContainer).toBeInTheDocument()
    })

    it('has proper spacing classes', () => {
      const { container } = renderWithProviders(<BookFilter />)
      
      const filterContainer = container.querySelector('.gap-4')
      expect(filterContainer).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper labels for inputs', () => {
      renderWithProviders(<BookFilter />)
      
      expect(screen.getByLabelText(/cari buku/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/filter status/i)).toBeInTheDocument()
    })

    it('search input has proper id', () => {
      renderWithProviders(<BookFilter />)
      
      const searchInput = screen.getByLabelText(/cari buku/i)
      expect(searchInput).toHaveAttribute('id', 'search')
    })

    it('status select has proper id', () => {
      renderWithProviders(<BookFilter />)
      
      const statusSelect = screen.getByLabelText(/filter status/i)
      expect(statusSelect).toHaveAttribute('id', 'statusFilter')
    })
  })

  describe('Styling', () => {
    it('has proper focus styles', () => {
      renderWithProviders(<BookFilter />)
      
      const searchInput = screen.getByLabelText(/cari buku/i)
      expect(searchInput).toHaveClass('focus:ring-indigo-500')
      expect(searchInput).toHaveClass('focus:border-indigo-500')
    })

    it('has proper border and shadow', () => {
      renderWithProviders(<BookFilter />)
      
      const searchInput = screen.getByLabelText(/cari buku/i)
      expect(searchInput).toHaveClass('border')
      expect(searchInput).toHaveClass('rounded-md')
      expect(searchInput).toHaveClass('shadow-sm')
    })
  })
})