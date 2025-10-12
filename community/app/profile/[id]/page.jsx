'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
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

// Helper function to get initials from name
const getInitials = (firstName, lastName) => {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
  return firstInitial + lastInitial;
};

// Subcomponents
const Post = ({ post, onBack }) => (
  <div className="bg-[#c0c8ca] rounded-lg shadow-md overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b border-[#aab7b7]">
      <button
        onClick={onBack}
        className="text-[#2e4156] hover:text-[#1a2d42] font-medium"
      >
        ← Back to Posts
      </button>
    </div>
    <img src={post.image} alt={post.caption} className="w-full h-80 object-cover" />
    <div className="p-4">
      <p className="text-[#1a2d42] mb-3">{post.caption}</p>
      <div className="flex items-center justify-between text-sm text-[#aab7b7]">
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
        className="aspect-square bg-[#c0c8ca] rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onPostClick(post)}
      >
        <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
      </div>
    ))}
  </div>
);

const MemberCard = ({ member }) => {
  const nameLetters = member.name ? member.name.substring(0, 2) : "";

  return (
    <div className="member-card">
      {member.profilePicture ? (
        <img
          src={member.profilePicture}
          alt={member.name}
          className="profile-pic"
        />
      ) : (
        <div className="name-letters">
          {nameLetters.toUpperCase()}
        </div>
      )}
      <h3>{member.name}</h3>
    </div>
  );
};

const CommunitiesList = ({ communities }) => (
  <div className="space-y-4">
    {communities.map((community) => (
      <div key={community.id} className="bg-[#c0c8ca] rounded-lg shadow-md p-4 flex items-center space-x-4">
        <img src={community.image} alt={community.name} className="w-12 h-12 rounded-full object-cover border border-[#aab7b7]" />
        <div>
          <h3 className="font-semibold text-[#2e4156]">{community.name}</h3>
          <p className="text-sm text-[#aab7b7]">{community.members.toLocaleString()} members</p>
        </div>
      </div>
    ))}
  </div>
);

const EventsList = ({ events }) => (
  <div className="space-y-4">
    {events.map((event) => (
      <div key={event.id} className="bg-[#c0c8ca] rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-[#2e4156] mb-2">{event.title}</h3>
        <div className="text-sm text-[#aab7b7] space-y-1">
          <p>📅 {event.date}</p>
          <p>📍 {event.location}</p>
          <p>👥 {event.attendees} attendees</p>
        </div>
      </div>
    ))}
  </div>
);

const ReadOnlyField = ({ label, value, multiline = false }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-[#2e4156] mb-2">{label}</h3>
    {multiline ? (
      <p className="whitespace-pre-wrap text-[#1a2d42] bg-[#d4d8dd] p-3 rounded border border-[#c0c8ca] shadow-sm text-sm">{value || 'Not provided'}</p>
    ) : (
      <p className="text-[#1a2d42] bg-[#d4d8dd] p-3 rounded border border-[#c0c8ca] shadow-sm truncate text-sm">{value || 'Not provided'}</p>
    )}
  </div>
);

const OtherUserProfile = () => {
  const handleClick=async(name)=>{
    const response=await fetch(`http://localhost:8080/follow/send`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username:name
      })
    })
    const data=await response.text()
    if(!response.ok){
      console.log(data)
      return
    }
    toast.success(data)
    console.log(data)
  }
  const [token, setToken] = useState('');
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const st = localStorage.getItem("accToken");
    if (st) setToken(st);
  }, []);

  useEffect(() => {
    if (!id || !token) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/othersProfile/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Error fetching profile:", data);
          // Optionally show a message or fallback
          return;
        }

        // Set the profile data to state
        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          bio: data.bio,
          about: data.about,
          profilePic: data.profilePic,
          postsCount: data.posts?.length || 0,
          followersCount: data.followers?.length || 0,
          followingCount: data.following?.length || 0,
          // Add other fields as necessary
        });

      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };

    fetchProfile();
  }, [id, token]);

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
        return <EventsList events={profile?.events || []} />;
      default:
        return <PostsGrid posts={profile?.posts || []} onPostClick={setSelectedPost} />;
    }
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  // Get initials for fallback
  const initials = getInitials(profile.firstName, profile.lastName);

  return (
    <div className="min-h-screen bg-[#d4d8dd] font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Panel (35%) */}
          <div className="w-full md:w-2/5 lg:w-1/3">
            <div className="bg-[#c0c8ca] rounded-lg shadow-md p-6 sticky top-6">
              {/* Profile Header */}
              <div className="text-center mb-6">
                {/* Profile Picture with Fallback to Initials */}
                {profile.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#1a2d42] mx-auto mb-4 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#2e4156] border-4 border-[#1a2d42] mx-auto mb-4 shadow-md flex items-center justify-center text-white text-2xl font-bold">
                    {initials}
                  </div>
                )}
<button onClick={()=>handleClick(profile.username)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300">
  Follow
</button>
<br />
<br />
                <h1 className="text-2xl font-bold text-[#2e4156] mb-1">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-[#aab7b7] mb-2">@{profile.username}</p>
                <p className="text-sm text-[#2e4156]">{profile.email}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-[#d4d8dd] rounded-lg p-3">
                  <div className="text-lg font-bold text-[#2e4156]">{profile.postsCount}</div>
                  <div className="text-xs text-[#aab7b7]">Posts</div>
                </div>
                <div className="bg-[#d4d8dd] rounded-lg p-3">
                  <div className="text-lg font-bold text-[#2e4156]">{profile.followersCount.toLocaleString()}</div>
                  <div className="text-xs text-[#aab7b7]">Followers</div>
                </div>
                <div className="bg-[#d4d8dd] rounded-lg p-3">
                  <div className="text-lg font-bold text-[#2e4156]">{profile.followingCount}</div>
                  <div className="text-xs text-[#aab7b7]">Following</div>
                </div>
              </div>

              {/* Read-only Fields */}
              <ReadOnlyField label="Full Name" value={`${profile.firstName} ${profile.lastName}`} />
              <ReadOnlyField label="Username" value={profile.username} />
              <ReadOnlyField label="Bio" value={profile.bio} multiline />
              <ReadOnlyField label="About" value={profile.about} multiline />
            </div>
          </div>

          {/* Right Panel (65%) */}
          <div className="w-full md:w-3/5 lg:w-2/3">
            <div className="bg-[#c0c8ca] rounded-lg shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-[#aab7b7]">
                <nav className="flex">
                  {['posts', 'communities', 'events'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                        activeTab === tab
                          ? 'text-[#1a2d42] border-b-2 border-[#1a2d42] bg-[#d4d8dd]'
                          : 'text-[#2e4156] hover:text-[#1a2d42] hover:bg-[#d4d8dd]'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="p-6 bg-[#d4d8dd]">{renderRightContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;