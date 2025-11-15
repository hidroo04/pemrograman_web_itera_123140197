import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { BookProvider } from '../context/BookContext'

// Custom render function with providers
export function renderWithProviders(ui, options = {}) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <BookProvider>
          {children}
        </BookProvider>
      </BrowserRouter>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

// Mock books data
export const mockBooks = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'read',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Deep Work',
    author: 'Cal Newport',
    status: 'owned',
    createdAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    status: 'to-buy',
    createdAt: '2024-01-03T00:00:00.000Z'
  }
]

// Re-export everything
export * from '@testing-library/react'