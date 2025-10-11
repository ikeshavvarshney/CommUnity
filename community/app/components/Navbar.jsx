import Link from 'next/link';
import React from 'react';

const Navbar = () => (
  <nav className="flex gap-2 items-center justify-between px-2 py-2.5 sticky top-0 bg-white shadow-sm border-b border-gray-200">
    <div className="flex items-center gap-3">
      <img src="/assets/logo.svg" alt="CommUnity Logo" width="180" />
    </div>

    <form 
  className="flex-1 mx-1 max-w-lg relative"
>
  <input
    name="search"
    type="text"
    placeholder="Search..."
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
</form>


    <ul className="flex gap-1 mr-4 items-center">
      <li>
        <Link
          className="px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E4156]"
          href="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E4156]"
          href="/communities"
        >
          Communities
        </Link>
      </li>
      <li>
        <Link
          className="px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E4156]"
          href="/about"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          className="px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E4156]"
          href="/events"
        >
          Events
        </Link>
      </li>
    </ul>

    <div className="flex gap-3">
      <Link
        href="/login"
        className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Sign Up
      </Link>
    </div>
  </nav>
);

export default Navbar;
