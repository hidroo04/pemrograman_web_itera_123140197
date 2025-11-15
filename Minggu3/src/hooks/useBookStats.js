import { useMemo } from 'react';
import { useBooks } from '../context/BookContext';

export const useBookStats = () => {
  const { books } = useBooks();

  const stats = useMemo(() => {
    const totalBooks = books.length;
    const ownedCount = books.filter(book => book.status === 'owned').length;
    const readCount = books.filter(book => book.status === 'read').length;
    const toBuyCount = books.filter(book => book.status === 'to-buy').length;

    return { totalBooks, ownedCount, readCount, toBuyCount };
  }, [books]);

  return stats;
};