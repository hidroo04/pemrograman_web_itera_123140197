import React, { useState, createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLokalStorage';

const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const addBook = (book) => {
    const newBook = { ...book, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  const updateBook = (updatedBook) => {
    setBooks(prevBooks =>
      prevBooks.map(book => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  const getBookById = useCallback(
    (id) => {
      return books.find(book => book.id === id);
    },
    [books]
  );

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const statusMatch = statusFilter === 'all' || book.status === statusFilter;
      const searchMatch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      return statusMatch && searchMatch;
    });
  }, [books, searchTerm, statusFilter]);

  const value = {
    books,
    filteredBooks,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
};