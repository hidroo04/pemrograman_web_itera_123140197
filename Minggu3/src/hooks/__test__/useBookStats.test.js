import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useBookStats } from '../useBookStats'
import { BookProvider, useBooks } from '../../context/BookContext'

describe('useBookStats Hook', () => {
  const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>

  beforeEach(() => {
    localStorage.clear()
  })

  describe('Initial State', () => {
    it('returns zero for all stats when no books', () => {
      const { result } = renderHook(() => useBookStats(), { wrapper })
      
      expect(result.current.totalBooks).toBe(0)
      expect(result.current.ownedCount).toBe(0)
      expect(result.current.readCount).toBe(0)
      expect(result.current.toBuyCount).toBe(0)
    })
  })

  describe('Total Books Count', () => {
    it('calculates total books correctly', () => {
      const { result: booksResult } = renderHook(() => useBooks(), { wrapper })
      const { result: statsResult } = renderHook(() => useBookStats(), { wrapper })
      
      act(() => {
        booksResult.current.addBook({
          title: 'Book 1',
          author: 'Author 1',
          status: 'owned'
        })
        booksResult.current.addBook({
          title: 'Book 2',
          author: 'Author 2',
          status: 'read'
        })
        booksResult.current.addBook({
          title: 'Book 3',
          author: 'Author 3',
          status: 'to-buy'
        })
      })
      
      expect(statsResult.current.totalBooks).toBe(3)
    })
  })

  describe('Status Counts', () => {
    it('counts owned books correctly', () => {
      const { result: booksResult } = renderHook(() => useBooks(), { wrapper })
      const { result: statsResult } = renderHook(() => useBookStats(), { wrapper })
      
      act(() => {
        booksResult.current.addBook({
          title: 'Book 1',
          author: 'Author 1',
          status: 'owned'
        })
        booksResult.current.addBook({
          title: 'Book 2',
          author: 'Author 2',
          status: 'owned'
        })
        booksResult.current.addBook({
          title: 'Book 3',
          author: 'Author 3',
          status: 'read'
        })
      })
      
      expect(statsResult.current.ownedCount).toBe(2)
    })

    it('counts read books correctly', () => {
      const { result: booksResult } = renderHook(() => useBooks(), { wrapper })
      const { result: statsResult } = renderHook(() => useBookStats(), { wrapper })
      
      act(() => {
        booksResult.current.addBook({
          title: 'Book 1',
          author: 'Author 1',
          status: 'read'
        })
        booksResult.current.addBook({
          title: 'Book 2',
          author: 'Author 2',
          status: 'read'
        })
        booksResult.current.addBook({
          title: 'Book 3',
          author: 'Author 3',
          status: 'read'
        })
      })
      
      expect(statsResult.current.readCount).toBe(3)
    })

    it('counts to-buy books correctly', () => {
      const { result: booksResult } = renderHook(() => useBooks(), { wrapper })
      const { result: statsResult } = renderHook(() => useBookStats(), { wrapper })
      
      act(() => {
        booksResult.current.addBook({
          title: 'Book 1',
          author: 'Author 1',
          status: 'to-buy'
        })
        booksResult.current.addBook({
          title: 'Book 2',
          author: 'Author 2',
          status: 'owned'
        })
      })
      
      expect(statsResult.current.toBuyCount).toBe(1)
    })
  })

  describe('Mixed Status Counts', () => {
    it('calculates all stats correctly with mixed statuses', () => {
      const { result: booksResult } = renderHook(() => useBooks(), { wrapper })
      const { result: statsResult } = renderHook(() => useBookStats(), { wrapper })
      
      act(() => {
        booksResult.current.addBook({
          title: 'Book 1',
          author: 'Author 1',
          status: 'owned'
        })
        booksResult.current.addBook({
          title: 'Book 2',
          author: 'Author 2',
          status: 'owned'
        })
        booksResult.current.addBook({
          title: 'Book 3',
          author: 'Author 3',
          status: 'read'
        })
        booksResult.current.addBook({
          title: 'Book 4',
          author: 'Author 4',
          status: 'to-buy'
        })
        booksResult.current.addBook({
          title: 'Book 5',
          author: 'Author 5',
          status: 'to-buy'
        })
      })
      
      expect(statsResult.current.totalBooks).toBe(5)
      expect(statsResult.current.ownedCount).toBe(2)
      expect(statsResult.current.readCount).toBe(1)
      expect(statsResult.current.toBuyCount).toBe(2)
    })
  })

  describe('Dynamic Updates', () => {
    it('updates stats when book is added', () => {
      const { result: booksResult } = renderHook(() => useBooks(), { wrapper })
      const { result: statsResult } = renderHook(() => useBookStats(), { wrapper })
      
      expect(statsResult.current.totalBooks).toBe(0)
      
      act(() => {
        booksResult.current.addBook({
          title: 'New Book',
          author: 'New Author',
          status: 'owned'
        })
      })
      
      expect(statsResult.current.totalBooks).toBe(1)
      expect(statsResult.current.ownedCount).toBe(1)
    })

    it('updates stats when book is deleted', () => {
      const { result: booksResult } = renderHook(() => useBooks(), { wrapper })
      const { result: statsResult } = renderHook(() => useBookStats(), { wrapper })
      
      let bookId
      
      act(() => {
        booksResult.current.addBook({
          title: 'Book to Delete',
          author: 'Author',
          status: 'owned'
        })
        bookId = booksResult.current.books[0].id
      })
      
      expect(statsResult.current.totalBooks).toBe(1)
      
      act(() => {
        booksResult.current.deleteBook(bookId)
      })
      
      expect(statsResult.current.totalBooks).toBe(0)
      expect(statsResult.current.ownedCount).toBe(0)
    })

    it('updates stats when book status is changed', () => {
      const { result: booksResult } = renderHook(() => useBooks(), { wrapper })
      const { result: statsResult } = renderHook(() => useBookStats(), { wrapper })
      
      let bookId
      
      act(() => {
        booksResult.current.addBook({
          title: 'Test Book',
          author: 'Test Author',
          status: 'owned'
        })
        bookId = booksResult.current.books[0].id
      })
      
      expect(statsResult.current.ownedCount).toBe(1)
      expect(statsResult.current.readCount).toBe(0)
      
      act(() => {
        booksResult.current.updateBook({
          id: bookId,
          title: 'Test Book',
          author: 'Test Author',
          status: 'read'
        })
      })
      
      expect(statsResult.current.ownedCount).toBe(0)
      expect(statsResult.current.readCount).toBe(1)
    })
  })

  describe('Memoization', () => {
    it('only recalculates when books change', () => {
      const { result: statsResult } = renderHook(() => useBookStats(), { wrapper })
      
      const firstRender = statsResult.current
      
      // Re-render without changing books
      statsResult.rerender()
      
      const secondRender = statsResult.current
      
      // Should be the same object due to memoization
      expect(firstRender).toBe(secondRender)
    })
  })
})