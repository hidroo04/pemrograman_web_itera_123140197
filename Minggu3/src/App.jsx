import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Stats from './pages/Stats';

export default function App() {
  return (
    <BookProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </BookProvider>
  );
}