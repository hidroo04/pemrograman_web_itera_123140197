import React from 'react';
import { useBooks } from '../context/BookContext';

// BookItem Component
function BookItem({ book, onEdit, onDelete }) {
  const statusMap = {
    'owned': { text: 'Milik', color: 'bg-blue-100 text-blue-800' },
    'read': { text: 'Dibaca', color: 'bg-green-100 text-green-800' },
    'to-buy': { text: 'Akan Dibeli', color: 'bg-yellow-100 text-yellow-800' },
  };
  const statusInfo = statusMap[book.status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };

  return (
    <li className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-shrink-0">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
        >
          {statusInfo.text}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="py-1 px-3 rounded-md text-sm text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-colors duration-150"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="py-1 px-3 rounded-md text-sm text-red-600 hover:bg-red-50 focus:outline-none transition-colors duration-150"
          >
            Hapus
          </button>
        </div>
      </div>
    </li>
  );
}

// BookList Component
export default function BookList({ setSelectedBook }) {
  const { filteredBooks, deleteBook } = useBooks();

  const handleEdit = (book) => {
    setSelectedBook(book);
    // Scroll to top untuk melihat form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      deleteBook(id);
    }
  };

  if (filteredBooks.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada buku</h3>
        <p className="mt-1 text-sm text-gray-500">
          Mulai dengan menambahkan buku pertama Anda.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {filteredBooks.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}