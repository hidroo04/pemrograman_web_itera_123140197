import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  
  const navLinkClass = ({ isActive }) => 
    `py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive 
        ? 'bg-indigo-100 text-indigo-700 shadow-md' 
        : 'text-white hover:bg-indigo-700 hover:shadow-md'
    }`;

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
            />
          </svg>
          <span>Personal<span className="font-light">Books</span></span>
        </h1>
        <div className="flex space-x-2">
          <NavLink to="/" className={navLinkClass}>
            Beranda
          </NavLink>
          <NavLink to="/stats" className={navLinkClass}>
            Statistik
          </NavLink>
        </div>
      </nav>
    </header>
  );
}