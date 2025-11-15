import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import BookFilter from '../components/BookFilter';
import BookList from '../components/BookList';

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="sticky top-24"> 
          <BookForm selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
        </div>
      </div>

      <div className="lg:col-span-2">
        <BookFilter />
        <BookList setSelectedBook={setSelectedBook} />
      </div>
    </div>
  );
}