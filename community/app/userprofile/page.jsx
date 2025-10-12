'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

// Sample data
const samplePosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80',
    caption: 'Beautiful sunset from my recent trip!',
    likes: 245,
    comments: 12,
    date: '2025-10-10'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
    caption: 'Working on some exciting new projects',
    likes: 189,
    comments: 8,
    date: '2025-10-09'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80',
    caption: 'Code, coffee, repeat ☕',
    likes: 367,
    comments: 24,
    date: '2025-10-08'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    caption: 'Team meeting discussions',
    likes: 156,
    comments: 6,
    date: '2025-10-07'
  }
];

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
      <h3 className="text-lg font-semibold text-custom-dark">{label}</h3>
      <button
        onClick={onEdit}
        className="text-custom-dark-2 hover:text-custom-dark text-sm font-medium focus:outline-none focus:ring-2 focus:ring-custom-accent rounded px-2 py-1"
        aria-label={`Edit ${label}`}
      >
        Edit
      </button>
    </div>
    {multiline ? (
      <p className="whitespace-pre-wrap text-gray-700 bg-white p-3 rounded border border-custom-light-2 shadow-sm text-sm">{value}</p>
    ) : (
      <p className="text-gray-700 bg-white p-3 rounded border border-custom-light-2 shadow-sm truncate text-sm">{value}</p>
    )}
  </div>
);

const Post = ({ post, onBack }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b border-custom-light">
      <button
        onClick={onBack}
        className="text-custom-dark-2 hover:text-custom-dark font-medium"
      >
        ← Back to Posts
      </button>
    </div>
    <img src={post.image} alt={post.caption} className="w-full h-80 object-cover" />
    <div className="p-4">
      <p className="text-gray-800 mb-3">{post.caption}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{post.likes} likes • {post.comments} comments</span>
        <span>{post.date}</span>
      </div>
    </div>
  </div>
);

const PostsGrid = ({ posts, onPostClick }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {posts.map((post) => (
      <div
        key={post.id}
        className="aspect-square bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onPostClick(post)}
      >
        <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
      </div>
    ))}
  </div>
);

const CommunitiesList = ({ communities }) => (
  <div className="space-y-4">
    {communities.map((community) => (
      <div key={community.id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
        <img src={community.image} alt={community.name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h3 className="font-semibold text-custom-dark">{community.name}</h3>
          <p className="text-sm text-gray-500">{community.members.toLocaleString()} members</p>
        </div>
      </div>
    ))}
  </div>
);

const EventsList = ({ events }) => (
  <div className="space-y-4">
    {events.map((event) => (
      <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-custom-dark mb-2">{event.title}</h3>
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

  // API call to get profile
  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/getProfile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        setProfile(userData);
      } else {
        console.error('Failed to fetch profile');
        // Fallback to sample data
        setProfile({
          id: 1,
          email: 'jane.doe@example.com',
          username: 'jane_doe',
          firstName: 'Jane',
          lastName: 'Doe',
          profilePic: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
          role: 'USER',
          followers: ['user1', 'user2', 'user3'],
          following: ['dev1', 'dev2'],
          communities: [1, 2, 3],
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback to sample data
      setProfile({
        id: 1,
        email: 'jane.doe@example.com',
        username: 'jane_doe',
        firstName: 'Jane',
        lastName: 'Doe',
        profilePic: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
        role: 'USER',
        followers: ['user1', 'user2', 'user3'],
        following: ['dev1', 'dev2'],
        communities: [1, 2, 3],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEdit = (field) => {
    const newValue = prompt(`Edit your ${field}:`, profile[field]);
    if (newValue !== null && newValue.trim() !== '') {
      setProfile({ ...profile, [field]: newValue.trim() });
    }
  };

  const renderRightContent = () => {
    if (selectedPost) {
      return <Post post={selectedPost} onBack={() => setSelectedPost(null)} />;
    }

    switch (activeTab) {
      case 'posts':
        return <PostsGrid posts={samplePosts} onPostClick={setSelectedPost} />;
      case 'communities':
        return <CommunitiesList communities={sampleCommunities} />;
      case 'events':
        return <EventsList events={sampleEvents} />;
      default:
        return <PostsGrid posts={samplePosts} onPostClick={setSelectedPost} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-custom-light flex items-center justify-center">
        <div className="text-custom-dark text-xl">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-custom-light flex items-center justify-center">
        <div className="text-custom-dark text-xl">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-light font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Left Panel (35%) */}
          <div className="w-full md:w-2/5 lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <img
                  src={profile.profilePic || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80'}
                  alt={`${profile.firstName} ${profile.lastName} profile`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-custom-dark mx-auto mb-4 shadow-lg"
                />
                <h1 className="text-2xl font-bold text-custom-dark mb-1">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-custom-dark-2 mb-2">@{profile.username}</p>
                <p className="text-sm text-gray-600">{profile.email}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-custom-light rounded-lg p-3">
                  <div className="text-lg font-bold text-custom-dark">{samplePosts.length}</div>
                  <div className="text-xs text-custom-dark-2">Posts</div>
                </div>
                <div className="bg-custom-light rounded-lg p-3">
                  <div className="text-lg font-bold text-custom-dark">{profile.followers?.length || 0}</div>
                  <div className="text-xs text-custom-dark-2">Followers</div>
                </div>
                <div className="bg-custom-light rounded-lg p-3">
                  <div className="text-lg font-bold text-custom-dark">{profile.following?.length || 0}</div>
                  <div className="text-xs text-custom-dark-2">Following</div>
                </div>
              </div>

              {/* Editable Fields */}
              <EditableField 
                label="Full Name" 
                value={`${profile.firstName} ${profile.lastName}`} 
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
              />
              <EditableField 
                label="About" 
                value={profile.about} 
                onEdit={() => handleEdit('about')} 
              />
            </div>
          </div>

          {/* Right Panel (65%) */}
          <div className="w-full md:w-3/5 lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-custom-light">
                <nav className="flex">
                  <button
                    onClick={() => {
                      setActiveTab('posts');
                      setSelectedPost(null);
                    }}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                      activeTab === 'posts'
                        ? 'text-custom-dark border-b-2 border-custom-dark bg-custom-light'
                        : 'text-custom-dark-2 hover:text-custom-dark hover:bg-custom-light'
                    }`}
                  >
                    Posts
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('communities');
                      setSelectedPost(null);
                    }}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                      activeTab === 'communities'
                        ? 'text-custom-dark border-b-2 border-custom-dark bg-custom-light'
                        : 'text-custom-dark-2 hover:text-custom-dark hover:bg-custom-light'
                    }`}
                  >
                    Communities
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('events');
                      setSelectedPost(null);
                    }}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                      activeTab === 'events'
                        ? 'text-custom-dark border-b-2 border-custom-dark bg-custom-light'
                        : 'text-custom-dark-2 hover:text-custom-dark hover:bg-custom-light'
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
