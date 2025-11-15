import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookForm from '../BookForm'
import { renderWithProviders } from '../../test/test-utils'

describe('BookForm Component', () => {
  const mockSetSelectedBook = vi.fn()

  beforeEach(() => {
    mockSetSelectedBook.mockClear()
    localStorage.clear()
  })

  describe('Rendering', () => {
    it('renders form with all fields', () => {
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      expect(screen.getByLabelText(/judul/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/penulis/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /simpan buku/i })).toBeInTheDocument()
    })

    it('shows "Tambah Buku Baru" title when not editing', () => {
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      expect(screen.getByText(/tambah buku baru/i)).toBeInTheDocument()
    })

    it('shows "Edit Buku" title when editing', () => {
      const selectedBook = {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        status: 'owned'
      }
      
      renderWithProviders(<BookForm selectedBook={selectedBook} setSelectedBook={mockSetSelectedBook} />)
      
      expect(screen.getByText(/edit buku/i)).toBeInTheDocument()
    })

    it('shows cancel button when editing', () => {
      const selectedBook = {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        status: 'owned'
      }
      
      renderWithProviders(<BookForm selectedBook={selectedBook} setSelectedBook={mockSetSelectedBook} />)
      
      expect(screen.getByRole('button', { name: /batal edit/i })).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('shows error when title is empty', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      const submitButton = screen.getByRole('button', { name: /simpan buku/i })
      await user.click(submitButton)
      
      expect(screen.getByText(/judul tidak boleh kosong/i)).toBeInTheDocument()
    })

    it('shows error when author is empty', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      const submitButton = screen.getByRole('button', { name: /simpan buku/i })
      await user.click(submitButton)
      
      expect(screen.getByText(/penulis tidak boleh kosong/i)).toBeInTheDocument()
    })

    it('shows both errors when both fields are empty', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      const submitButton = screen.getByRole('button', { name: /simpan buku/i })
      await user.click(submitButton)
      
      expect(screen.getByText(/judul tidak boleh kosong/i)).toBeInTheDocument()
      expect(screen.getByText(/penulis tidak boleh kosong/i)).toBeInTheDocument()
    })

    it('clears errors when user starts typing', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      const submitButton = screen.getByRole('button', { name: /simpan buku/i })
      await user.click(submitButton)
      
      expect(screen.getByText(/judul tidak boleh kosong/i)).toBeInTheDocument()
      
      const titleInput = screen.getByLabelText(/judul/i)
      await user.type(titleInput, 'Test Book')
      
      await user.click(submitButton)
      
      expect(screen.queryByText(/judul tidak boleh kosong/i)).not.toBeInTheDocument()
    })
  })

  describe('Adding New Book', () => {
    it('submits form with valid data', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      const titleInput = screen.getByLabelText(/judul/i)
      const authorInput = screen.getByLabelText(/penulis/i)
      const statusSelect = screen.getByLabelText(/status/i)
      
      await user.type(titleInput, 'Atomic Habits')
      await user.type(authorInput, 'James Clear')
      await user.selectOptions(statusSelect, 'read')
      
      const submitButton = screen.getByRole('button', { name: /simpan buku/i })
      await user.click(submitButton)
      
      // Form should be cleared after submission
      await waitFor(() => {
        expect(titleInput).toHaveValue('')
        expect(authorInput).toHaveValue('')
        expect(statusSelect).toHaveValue('owned')
      })
    })

    it('shows success toast after adding book', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      await user.type(screen.getByLabelText(/judul/i), 'Test Book')
      await user.type(screen.getByLabelText(/penulis/i), 'Test Author')
      
      await user.click(screen.getByRole('button', { name: /simpan buku/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/buku berhasil ditambahkan/i)).toBeInTheDocument()
      })
    })
  })

  describe('Editing Book', () => {
    it('populates form with selected book data', () => {
      const selectedBook = {
        id: '1',
        title: 'Atomic Habits',
        author: 'James Clear',
        status: 'read'
      }
      
      renderWithProviders(<BookForm selectedBook={selectedBook} setSelectedBook={mockSetSelectedBook} />)
      
      expect(screen.getByLabelText(/judul/i)).toHaveValue('Atomic Habits')
      expect(screen.getByLabelText(/penulis/i)).toHaveValue('James Clear')
      expect(screen.getByLabelText(/status/i)).toHaveValue('read')
    })

    it('updates book with new data', async () => {
      const user = userEvent.setup()
      const selectedBook = {
        id: '1',
        title: 'Original Title',
        author: 'Original Author',
        status: 'owned'
      }
      
      renderWithProviders(<BookForm selectedBook={selectedBook} setSelectedBook={mockSetSelectedBook} />)
      
      const titleInput = screen.getByLabelText(/judul/i)
      await user.clear(titleInput)
      await user.type(titleInput, 'Updated Title')
      
      await user.click(screen.getByRole('button', { name: /update buku/i }))
      
      await waitFor(() => {
        expect(screen.getByText(/buku berhasil diupdate/i)).toBeInTheDocument()
      })
    })

    it('cancels edit mode when cancel button clicked', async () => {
      const user = userEvent.setup()
      const selectedBook = {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        status: 'owned'
      }
      
      renderWithProviders(<BookForm selectedBook={selectedBook} setSelectedBook={mockSetSelectedBook} />)
      
      await user.click(screen.getByRole('button', { name: /batal edit/i }))
      
      expect(mockSetSelectedBook).toHaveBeenCalledWith(null)
      expect(screen.getByLabelText(/judul/i)).toHaveValue('')
      expect(screen.getByLabelText(/penulis/i)).toHaveValue('')
    })
  })

  describe('Form Interactions', () => {
    it('allows typing in title input', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      const titleInput = screen.getByLabelText(/judul/i)
      await user.type(titleInput, 'New Book')
      
      expect(titleInput).toHaveValue('New Book')
    })

    it('allows typing in author input', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      const authorInput = screen.getByLabelText(/penulis/i)
      await user.type(authorInput, 'New Author')
      
      expect(authorInput).toHaveValue('New Author')
    })

    it('allows selecting different status options', async () => {
      const user = userEvent.setup()
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      const statusSelect = screen.getByLabelText(/status/i)
      
      await user.selectOptions(statusSelect, 'read')
      expect(statusSelect).toHaveValue('read')
      
      await user.selectOptions(statusSelect, 'to-buy')
      expect(statusSelect).toHaveValue('to-buy')
      
      await user.selectOptions(statusSelect, 'owned')
      expect(statusSelect).toHaveValue('owned')
    })
  })

  describe('Accessibility', () => {
    it('has proper labels for all inputs', () => {
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      expect(screen.getByLabelText(/judul/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/penulis/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    })

    it('has placeholder texts', () => {
      renderWithProviders(<BookForm selectedBook={null} setSelectedBook={mockSetSelectedBook} />)
      
      expect(screen.getByPlaceholderText(/masukkan judul buku/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/masukkan nama penulis/i)).toBeInTheDocument()
    })
  })
})