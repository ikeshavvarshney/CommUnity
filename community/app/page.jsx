"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import EventsSection from "./components/EventsSection";
import SmallProfile from "./components/SmallProfile";
import LoadingPage from "./components/LoadingPage";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // Get token from localStorage
  useEffect(() => {
    const st = localStorage.getItem("accToken");
    setToken(st);
  }, []);

  // Fetch top 10 posts
  useEffect(() => {
    const fetchFeed = async () => {
      if (!token) return;
      
      setPostsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/posts/getTop10Posts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Posts data:', data);
          setPosts(data);
        } else {
          console.error('Failed to fetch posts:', response.status);
          toast.error('Failed to load posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Error connecting to server');
      } finally {
        setPostsLoading(false);
      }
    };

    if (token) {
      fetchFeed();
    }
  }, [token]);

  // Fetch profile data
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
      
      if (response.ok) {
        const userData = await response.json();
        console.log('Profile data:', userData);
        setProfile(userData);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch profile:', response.status, errorText);
        toast.error('Failed to load profile data');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile when token is available
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  // Helper functions
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

  // Format date for posts
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const exampleEvents = [
    {
      eventTitle: 'Tech Innovators Meetup 2025',
      dateTime: 'Oct 25, 2025, 6:00 PM',
      location: '123 Innovation Drive, Silicon Valley, CA',
    },
    {
      eventTitle: 'AI & Machine Learning Conference',
      dateTime: 'Nov 10, 2025, 9:00 AM',
      location: 'Online Webinar',
    },
    {
      eventTitle: 'Startup Pitch Night',
      dateTime: 'Dec 5, 2025, 7:00 PM',
      location: 'Downtown Co-working Space',
    },
    {
      eventTitle: 'React Native Workshop',
      dateTime: 'Oct 20, 2025, 2:00 PM',
      location: 'Tech Hub Community Center',
    },
    {
      eventTitle: 'Blockchain Developer Bootcamp',
      dateTime: 'Nov 15, 2025, 10:00 AM',
      location: 'Virtual Reality Center',
    },
  ];

  if (!profile) return <LoadingPage />;

  return (
    <div>
      <Navbar profilePic={getProfileImage()} follow_req={profile?.follow_req || []} />
      <main className="flex px-8 justify-between gap-5 mt-6">
        <div className="flex-col max-w-80">
          <h2 className="px-1 text-lg font-bold">Profile</h2>
          <Link href="../userprofile">
            {loading ? (
              
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            ) : profile ? (
              <SmallProfile
                profilePic={getProfileImage()}
                username={getFullName()}
                bio={profile.bio || `${profile.role || 'User'} • ${profile.communities?.length || 0} communities`}
                about={profile.about || `Hi! I'm ${getFullName()}. Welcome to my profile. I'm part of ${profile.communities?.length || 0} communities and love connecting with fellow members!`}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="text-center">
                  <div className="text-gray-500 mb-2">Unable to load profile</div>
                  <button 
                    onClick={fetchProfile}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </Link>
        </div>
        
        <div className="flex-col max-w-2xl">
          <h2 className="px-1 text-lg font-bold mb-4">Feed</h2>
          <div className="space-y-6">
            {postsLoading ? (
              // Loading skeleton for posts
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 animate-pulse">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-32 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <Post 
                  key={post.id}
                  title={post.title}
                  author={post.createdByUser}
                  date={formatDate(post.createdAt)}
                  imageUrl={post.imageUrl}
                  content={post.description}
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="text-lg font-medium text-gray-900">No posts yet</p>
                  <p className="text-sm">Be the first to share something with the community!</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-col max-w-80">
          <h2 className="px-1 text-lg font-bold">Upcoming Events</h2>
          <EventsSection events={exampleEvents} />
        </div>
      </main>
    </div>
  );
}