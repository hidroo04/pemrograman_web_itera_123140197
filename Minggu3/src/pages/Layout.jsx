import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <main className="p-4 md:p-8">
        <Outlet />
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm mt-8">
        
      </footer>
    </div>
  );
}