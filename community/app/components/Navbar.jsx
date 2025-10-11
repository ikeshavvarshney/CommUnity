'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // 🕐 Debounced API search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchResults(query);
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  // 🔍 Fetch users from backend
  const fetchResults = async (searchTerm) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/user/search?query=${query}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResults([]);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="flex gap-2 items-center justify-between px-2 py-2.5 sticky top-0 bg-white shadow-sm border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/assets/logo.svg" alt="CommUnity Logo" width="180" />
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-1 max-w-lg relative" ref={dropdownRef}>
        <input
          name="search"
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <svg
          className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.25 4.5a7.5 7.5 0 015.4 12.15z"
          />
        </svg>


        {query && (
          <div className="absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-full max-h-64 overflow-y-auto">
            {loading ? (
              <p className="px-4 py-2 text-gray-500 text-sm">Searching...</p>
            ) : results.length > 0 ? (
              results.map((user) => (
                <Link
                  key={user.id}
                  href={`/profile/${user.id}`} 
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-all"
                >
                  {/* profilePic fallback */}
                  <img
                    src={user.profilePic || '/assets/default-avatar.png'}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.username}</p>
                    <p className="text-xs text-gray-500">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="px-4 py-2 text-gray-500 text-sm">No users found</p>
            )}
          </div>
        )}
      </div>

      {/* Nav Links */}
      <ul className="flex gap-1 mr-4 items-center">
        <li><Link className="px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100" href="/">Home</Link></li>
        <li><Link className="px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100" href="/communities">Communities</Link></li>
        <li><Link className="px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100" href="/about">About</Link></li>
        <li><Link className="px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100" href="/events">Events</Link></li>
      </ul>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <Link href="/login" className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-50">Login</Link>
        <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;