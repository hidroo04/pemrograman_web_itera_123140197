import React from 'react';
import { useBooks } from '../context/BookContext';

export default function BookFilter() {
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter } = useBooks();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-grow">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Cari Buku (Judul/Penulis)
        </label>
        <input
          type="text"
          id="search"
          placeholder="Mis: Atomic Habits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex-shrink-0 sm:w-48">
        <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter Status
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">Semua Status</option>
          <option value="owned">Milik</option>
          <option value="read">Dibaca</option>
          <option value="to-buy">Akan Dibeli</option>
        </select>
      </div>
    </div>
  );
}