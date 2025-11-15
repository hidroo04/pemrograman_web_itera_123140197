import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { BookProvider, useBooks } from '../BookContext'

describe('BookContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>

  describe('Initial State', () => {
    it('provides empty books array initially', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      expect(result.current.books).toEqual([])
      expect(result.current.filteredBooks).toEqual([])
      expect(result.current.searchTerm).toBe('')
      expect(result.current.statusFilter).toBe('all')
    })
  })

  describe('Add Book', () => {
    it('adds a new book successfully', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      act(() => {
        result.current.addBook({
          title: 'Test Book',
          author: 'Test Author',
          status: 'owned'
        })
      })
      
      expect(result.current.books).toHaveLength(1)
      expect(result.current.books[0]).toMatchObject({
        title: 'Test Book',
        author: 'Test Author',
        status: 'owned'
      })
      expect(result.current.books[0].id).toBeDefined()
      expect(result.current.books[0].createdAt).toBeDefined()
    })

    it('adds multiple books', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      act(() => {
        result.current.addBook({
          title: 'Book 1',
          author: 'Author 1',
          status: 'owned'
        })
        result.current.addBook({
          title: 'Book 2',
          author: 'Author 2',
          status: 'read'
        })
      })
      
      expect(result.current.books).toHaveLength(2)
    })
  })

  describe('Update Book', () => {
    it('updates an existing book', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      let bookId
      
      act(() => {
        result.current.addBook({
          title: 'Original Title',
          author: 'Original Author',
          status: 'owned'
        })
        bookId = result.current.books[0].id
      })
      
      act(() => {
        result.current.updateBook({
          id: bookId,
          title: 'Updated Title',
          author: 'Updated Author',
          status: 'read'
        })
      })
      
      expect(result.current.books[0].title).toBe('Updated Title')
      expect(result.current.books[0].author).toBe('Updated Author')
      expect(result.current.books[0].status).toBe('read')
    })

    it('does not update non-existent book', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      act(() => {
        result.current.addBook({
          title: 'Test Book',
          author: 'Test Author',
          status: 'owned'
        })
      })
      
      const initialLength = result.current.books.length
      
      act(() => {
        result.current.updateBook({
          id: 'non-existent-id',
          title: 'Updated Title',
          author: 'Updated Author',
          status: 'read'
        })
      })
      
      expect(result.current.books).toHaveLength(initialLength)
    })
  })

  describe('Delete Book', () => {
    it('deletes a book successfully', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      let bookId
      
      act(() => {
        result.current.addBook({
          title: 'Test Book',
          author: 'Test Author',
          status: 'owned'
        })
        bookId = result.current.books[0].id
      })
      
      act(() => {
        result.current.deleteBook(bookId)
      })
      
      expect(result.current.books).toHaveLength(0)
    })

    it('does not delete non-existent book', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      act(() => {
        result.current.addBook({
          title: 'Test Book',
          author: 'Test Author',
          status: 'owned'
        })
      })
      
      const initialLength = result.current.books.length
      
      act(() => {
        result.current.deleteBook('non-existent-id')
      })
      
      expect(result.current.books).toHaveLength(initialLength)
    })
  })

  describe('Search Functionality', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    it('filters books by title search term', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      act(() => {
        result.current.addBook({
          title: 'Atomic Habits',
          author: 'James Clear',
          status: 'owned'
        })
        result.current.addBook({
          title: 'Deep Work',
          author: 'Cal Newport',
          status: 'read'
        })
      })
      
      act(() => {
        result.current.setSearchTerm('atomic')
      })
      
      expect(result.current.filteredBooks).toHaveLength(1)
      expect(result.current.filteredBooks[0].title).toBe('Atomic Habits')
    })

    it('filters books by author search term', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      act(() => {
        result.current.addBook({
          title: 'Atomic Habits',
          author: 'James Clear',
          status: 'owned'
        })
        result.current.addBook({
          title: 'Deep Work',
          author: 'Cal Newport',
          status: 'read'
        })
      })
      
      act(() => {
        result.current.setSearchTerm('newport')
      })
      
      expect(result.current.filteredBooks).toHaveLength(1)
      expect(result.current.filteredBooks[0].author).toBe('Cal Newport')
    })

    it('is case insensitive', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      act(() => {
        result.current.addBook({
          title: 'Atomic Habits',
          author: 'James Clear',
          status: 'owned'
        })
      })
      
      act(() => {
        result.current.setSearchTerm('ATOMIC')
      })
      
      expect(result.current.filteredBooks).toHaveLength(1)
    })
  })

  describe('Status Filter', () => {
    it('filters books by status', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      act(() => {
        result.current.addBook({
          title: 'Book 1',
          author: 'Author 1',
          status: 'owned'
        })
        result.current.addBook({
          title: 'Book 2',
          author: 'Author 2',
          status: 'read'
        })
        result.current.addBook({
          title: 'Book 3',
          author: 'Author 3',
          status: 'to-buy'
        })
      })
      
      act(() => {
        result.current.setStatusFilter('read')
      })
      
      expect(result.current.filteredBooks).toHaveLength(1)
      expect(result.current.filteredBooks[0].status).toBe('read')
    })

    it('shows all books when filter is "all"', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      act(() => {
        result.current.addBook({
          title: 'Book 1',
          author: 'Author 1',
          status: 'owned'
        })
        result.current.addBook({
          title: 'Book 2',
          author: 'Author 2',
          status: 'read'
        })
      })
      
      act(() => {
        result.current.setStatusFilter('all')
      })
      
      expect(result.current.filteredBooks).toHaveLength(2)
    })
  })

  describe('Combined Filters', () => {
    it('applies both search and status filter', () => {
      const { result } = renderHook(() => useBooks(), { wrapper })
      
      act(() => {
        result.current.addBook({
          title: 'Atomic Habits',
          author: 'James Clear',
          status: 'read'
        })
        result.current.addBook({
          title: 'Deep Work',
          author: 'Cal Newport',
          status: 'read'
        })
        result.current.addBook({
          title: 'Atomic Design',
          author: 'Brad Frost',
          status: 'owned'
        })
      })
      
      act(() => {
        result.current.setSearchTerm('atomic')
        result.current.setStatusFilter('read')
      })
      
      expect(result.current.filteredBooks).toHaveLength(1)
      expect(result.current.filteredBooks[0].title).toBe('Atomic Habits')
    })
  })
})