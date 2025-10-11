import Link from 'next/link';
import React from 'react';

const Navbar = () => (
  <nav className="flex items-center justify-between px-4 py-2.5 bg-white shadow-sm border-b border-gray-200">
    <div className="flex items-center gap-3">
      <img src="/assets/logo.svg" alt="CommUnity Logo" width="180" />
    </div>

    <ul className="flex gap-6 items-center">
      <li>
        <Link className="px-4 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E4156]" href="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="px-4 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E4156]" href="/about">
          About
        </Link>
      </li>
      <li>
        <Link className="px-4 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E4156]" href="/contact">
          Contact
        </Link>
      </li>
    </ul>

    <div className="flex gap-3">
      <Link href="/login" className="px-5 py-2 border border-gray-400 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300">Login</Link>
      <Link href="/signup" className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300">Sign Up</Link>
    </div>
  </nav>
);

export default Navbar;