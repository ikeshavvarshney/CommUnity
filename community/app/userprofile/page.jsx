'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

// Sample data for communities and events (to be replaced with API calls later)
const sampleCommunities = [
  { id: 1, name: 'React Developers', members: 15420, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'Next.js Community', members: 8930, image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'UI/UX Designers', members: 12340, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=100&q=80' }
];

const sampleEvents = [
  { id: 1, title: 'React Conference 2025', date: '2025-11-15', location: 'San Francisco, CA', attendees: 1250 },
  { id: 2, title: 'Web Dev Meetup', date: '2025-10-25', location: 'New York, NY', attendees: 85 },
  { id: 3, title: 'Tech Career Fair', date: '2025-11-05', location: 'Austin, TX', attendees: 450 }
];

// Components
const EditableField = ({ label, value, onEdit, multiline = false }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1"
        aria-label={`Edit ${label}`}
      >
        Edit
      </button>
    </div>
    {multiline ? (
      <p className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-3 rounded border border-gray-200 shadow-sm text-sm min-h-[80px]">
        {value || `Add your ${label.toLowerCase()}...`}
      </p>
    ) : (
      <p className="text-gray-700 bg-gray-50 p-3 rounded border border-gray-200 shadow-sm truncate text-sm">
        {value || `Add your ${label.toLowerCase()}...`}
      </p>
    )}
  </div>
);

const Post = ({ post, onBack }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Back to Posts
      </button>
    </div>
    {post.imageUrl && (
      <img src={post.imageUrl} alt={post.title} className="w-full h-80 object-cover" />
    )}
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-3">{post.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{post.likes || 0} likes</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  </div>
);

const PostsGrid = ({ posts, onPostClick }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No posts yet</h3>
          <p className="text-gray-500">Start sharing your thoughts and experiences!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onPostClick(post)}
        >
          {post.imageUrl ? (
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center p-4">
                <h4 className="text-sm font-medium text-gray-800 mb-1">{post.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-3">{post.description}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const CommunitiesList = ({ communities }) => {
  if (communities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No communities yet</h3>
          <p className="text-gray-500">Join communities to connect with like-minded people!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {communities.map((community) => (
        <div key={community.id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
          <img 
            src={community.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(community.name)}&background=3B82F6&color=ffffff&size=48`} 
            alt={community.name} 
            className="w-12 h-12 rounded-full object-cover" 
          />
          <div>
            <h3 className="font-semibold text-gray-800">{community.name}</h3>
            <p className="text-sm text-gray-500">{community.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const EventsList = ({ events }) => (
  <div className="space-y-4">
    {events.map((event) => (
      <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>📅 {event.date}</p>
          <p>📍 {event.location}</p>
          <p>👥 {event.attendees} attendees</p>
        </div>
      </div>
    ))}
  </div>
);

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedPost, setSelectedPost] = useState(null);
  const [token, setToken] = useState('');

  // Get token from localStorage
  useEffect(() => {
    const st = localStorage.getItem("accToken");
    setToken(st);
  }, []);

  // API call to get profile
  const fetchProfile = async () => {
    if (!token) return;
  
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/user/getProfile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      const text = await response.text();
  
      try {
        const userData = JSON.parse(text);
        if (response.ok) {
          console.log('Profile data:', userData);
          setProfile(userData);
        } else {
          console.error('Failed to fetch profile:', response.status, userData);
          toast.error('Failed to load profile data (server error)');
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        console.error('Response text:', text);
        toast.error('Received invalid profile data from server');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };
  

  // Update profile field
  const updateProfile = async (field, value) => {
    if (!token) return false;
    
    try {
      const response = await fetch('http://localhost:8080/users/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [field]: value })
      });
      
      if (response.ok) {
        toast.success('Profile updated successfully!');
        return true;
      } else {
        const errorText = await response.text();
        console.error('Failed to update profile:', errorText);
        toast.error('Failed to update profile');
        return false;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
      return false;
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const handleEdit = async (field) => {
    let currentValue = '';
    let fieldName = field;
    
    // Handle different field mappings
    switch (field) {
      case 'fullName':
        currentValue = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
        fieldName = 'Full Name';
        break;
      case 'firstName':
        currentValue = profile.firstName || '';
        fieldName = 'First Name';
        break;
      case 'lastName':
        currentValue = profile.lastName || '';
        fieldName = 'Last Name';
        break;
      case 'username':
        currentValue = profile.username || '';
        fieldName = 'Username';
        break;
      case 'bio':
        currentValue = profile.bio || '';
        fieldName = 'Bio';
        break;
      default:
        currentValue = profile[field] || '';
    }

    const newValue = prompt(`Edit your ${fieldName}:`, currentValue);
    
    if (newValue !== null && newValue.trim() !== '' && newValue.trim() !== currentValue) {
      // Handle full name specially
      if (field === 'fullName') {
        const names = newValue.trim().split(' ');
        const firstName = names[0] || '';
        const lastName = names.slice(1).join(' ') || '';
        
        const firstNameSuccess = await updateProfile('firstName', firstName);
        const lastNameSuccess = await updateProfile('lastName', lastName);
        
        if (firstNameSuccess || lastNameSuccess) {
          setProfile(prev => ({ 
            ...prev, 
            firstName: firstName,
            lastName: lastName
          }));
        }
      } else {
        const success = await updateProfile(field, newValue.trim());
        if (success) {
          setProfile(prev => ({ ...prev, [field]: newValue.trim() }));
        }
      }
    }
  };

  const getFullName = () => {
    if (!profile) return 'User';
    const firstName = profile.firstName || '';
    const lastName = profile.lastName || '';
    return `${firstName} ${lastName}`.trim() || profile.username || 'User';
  };

  const getProfileImage = () => {
    if (profile?.profilePic) {
      return profile.profilePic;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(getFullName())}&background=3B82F6&color=ffffff&size=200`;
  };

  const renderRightContent = () => {
    if (selectedPost) {
      return <Post post={selectedPost} onBack={() => setSelectedPost(null)} />;
    }

    switch (activeTab) {
      case 'posts':
        return <PostsGrid posts={profile?.posts || []} onPostClick={setSelectedPost} />;
      case 'communities':
        return <CommunitiesList communities={profile?.communities || []} />;
      case 'events':
        return <EventsList events={sampleEvents} />;
      default:
        return <PostsGrid posts={profile?.posts || []} onPostClick={setSelectedPost} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-800 text-xl">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-800 text-xl mb-4">Failed to load profile</div>
          <button 
            onClick={fetchProfile}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Left Panel (35%) */}
          <div className="w-full md:w-2/5 lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <img
                  src={getProfileImage()}
                  alt={`${getFullName()} profile`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-600 mx-auto mb-4 shadow-lg"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getFullName())}&background=3B82F6&color=ffffff&size=200`;
                  }}
                />
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  {getFullName()}
                </h1>
                <p className="text-gray-600 mb-2">@{profile.username}</p>
                <p className="text-sm text-gray-500">{profile.email}</p>
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {profile.role || 'USER'}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-800">{profile.posts?.length || 0}</div>
                  <div className="text-xs text-gray-600">Posts</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-800">{profile.followers?.length || 0}</div>
                  <div className="text-xs text-gray-600">Followers</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-800">{profile.following?.length || 0}</div>
                  <div className="text-xs text-gray-600">Following</div>
                </div>
              </div>

              {/* Editable Fields */}
              <EditableField 
                label="Full Name" 
                value={getFullName()}
                onEdit={() => handleEdit('fullName')} 
              />
              <EditableField 
                label="Username" 
                value={profile.username} 
                onEdit={() => handleEdit('username')} 
              />
              <EditableField 
                label="Bio" 
                value={profile.bio} 
                onEdit={() => handleEdit('bio')} 
                multiline
              />

              {/* Account Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Account Statistics</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Communities:</span>
                    <span className="font-medium">{profile.communities?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liked Posts:</span>
                    <span className="font-medium">{profile.likedPosts?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sent Requests:</span>
                    <span className="font-medium">{profile.sentRequest?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Received Requests:</span>
                    <span className="font-medium">{profile.recievedRequest?.length || 0}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span>User ID:</span>
                    <span className="font-medium">#{profile.id}</span>
                  </div>
                </div>
              </div>

              {/* Refresh Button */}
              <button 
                onClick={fetchProfile}
                className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
              >
                Refresh Profile
              </button>
            </div>
          </div>

          {/* Right Panel (65%) */}
          <div className="w-full md:w-3/5 lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => {
                      setActiveTab('posts');
                      setSelectedPost(null);
                    }}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                      activeTab === 'posts'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    Posts ({profile.posts?.length || 0})
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('communities');
                      setSelectedPost(null);
                    }}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                      activeTab === 'communities'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    Communities ({profile.communities?.length || 0})
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('events');
                      setSelectedPost(null);
                    }}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                      activeTab === 'events'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    Events
                  </button>
                </nav>
              </div>

              {/* Content Area */}
              <div className="p-6">
                {renderRightContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
