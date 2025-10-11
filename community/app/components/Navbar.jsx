
'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true); // Toggle this to test both states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Sample user data
  const currentUser = {
    id: 1,
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    profilePic: "/assets/profile-avatar.jpg",
    email: "john.doe@example.com"
  };

  // Sample notification data
  const sampleNotifications = [
    {
      id: 1,
      type: "like",
      message: "Sarah liked your post",
      time: "2 minutes ago",
      read: false,
      avatar: "/assets/sarah-avatar.jpg"
    },
    {
      id: 2,
      type: "comment",
      message: "Mike commented on your post",
      time: "1 hour ago",
      read: false,
      avatar: "/assets/mike-avatar.jpg"
    },
    {
      id: 3,
      type: "follow",
      message: "Emma started following you",
      time: "3 hours ago",
      read: true,
      avatar: "/assets/emma-avatar.jpg"
    },
    {
      id: 4,
      type: "event",
      message: "New event in Tech Community",
      time: "1 day ago",
      read: true,
      avatar: "/assets/tech-community.jpg"
    }
  ];

  useEffect(() => {
    setNotifications(sampleNotifications);
  }, []);

  // Debounced API search
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

  // Fetch users from backend
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

  // Handle create post
  const handleCreatePost = () => {
    // This would trigger the create post section in main body
    const event = new CustomEvent('openCreatePost');
    window.dispatchEvent(event);
  };

  // Handle notification click
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  };

  // Handle profile click
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false);
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Hide dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResults([]);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <nav className="flex gap-2 items-center justify-between px-4 py-3 sticky top-0 bg-white shadow-sm border-b border-gray-200 z-40">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/assets/logo.svg" alt="CommUnity Logo" width="180" />
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 max-w-lg relative" ref={dropdownRef}>
          <input
            name="search"
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50"
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
            <div className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 w-full max-h-64 overflow-y-auto">
              {loading ? (
                <p className="px-4 py-3 text-gray-500 text-sm">Searching...</p>
              ) : results.length > 0 ? (
                results.map((user) => (
                  <Link
                    key={user.id}
                    href={`/profile/${user.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
                  >
                    <img
                      src={user.profilePic || '/assets/default-avatar.png'}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                      <p className="text-xs text-gray-500">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-gray-500 text-sm">No users found</p>
              )}
            </div>
          )}
        </div>

        {/* Nav Links */}
        <ul className="flex gap-1 items-center">
          <li><Link className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors" href="/">Home</Link></li>
          <li><Link className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors" href="/communities">Communities</Link></li>
          <li><Link className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors" href="/about">About</Link></li>
          <li><Link className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors" href="/events">Events</Link></li>
        </ul>

        {/* Conditional Rendering Based on Auth State */}
        {!isSignedIn ? (
          /* Auth Buttons - Only shown when not signed in */
          <div className="flex gap-3">
            <Link 
              href="/login" 
              className="px-6 py-2.5 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          /* User Actions - Only shown when signed in */
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={toggleNotifications}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-3.403-3.403A2.2 2.2 0 0116 12.5V10c0-3.314-2.686-6-6-6s-6 2.686-6 6v2.5a2.2 2.2 0 01-.597 1.097L0 17h5m10 0v1a3 3 0 01-6 0v-1m6 0H9"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors $${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={notification.avatar || '/assets/default-avatar.png'}
                              alt="Avatar"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <svg
                          className="w-12 h-12 text-gray-300 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-3.403-3.403A2.2 2.2 0 0116 12.5V10c0-3.314-2.686-6-6-6s-6 2.686-6 6v2.5a2.2 2.2 0 01-.597 1.097L0 17h5m10 0v1a3 3 0 01-6 0v-1m6 0H9"
                          />
                        </svg>
                        <p className="text-gray-500 text-sm">No notifications yet</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <Link
                      href="/notifications"
                      className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Create Post */}
            <button
              onClick={handleCreatePost}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Create Post"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors"
              >
                <img
                  src={currentUser.profilePic || '/assets/default-avatar.png'}
                  alt={currentUser.username}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Profile Sidebar */}
      {showProfile && (
        <div className="fixed inset-0 z-50">
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              showProfile ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setShowProfile(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <img
                  src={currentUser.profilePic || '/assets/default-avatar.png'}
                  alt={currentUser.username}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {currentUser.firstName} {currentUser.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">@{currentUser.username}</p>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                </div>
              </div>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`/profile/${currentUser.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Your Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/messages"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Messages</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/saved"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Saved Posts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Settings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 font-medium">Contact Us</span>
                  </Link>
                </li>
              </ul>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsSignedIn(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 w-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
