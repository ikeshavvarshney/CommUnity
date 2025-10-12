"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import EventsSection from "./components/EventsSection";
import SmallProfile from "./components/SmallProfile";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  // Get token from localStorage
  useEffect(() => {
    const st = localStorage.getItem("accToken");
    setToken(st);
  }, []);

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

  const samplePosts = [
    {
      title: "Introducing Our New Feature",
      author: "Jane Doe",
      date: "2025-10-11",
      imageUrl: "/images/feature.png",
      content: "We're excited to announce our latest feature that will revolutionize how you connect with your community. This new tool allows for seamless collaboration and enhanced user experience."
    },
    {
      title: "10 Tips for Better Code Reviews",
      author: "Alex Johnson",
      date: "2025-10-10",
      imageUrl: "https://via.placeholder.com/400x250?text=Code+Review",
      content: "Code reviews are essential for maintaining code quality. Here are my top 10 tips: 1) Be constructive, not destructive 2) Focus on the code, not the person 3) Explain the 'why' behind your suggestions 4) Use automated tools when possible 5) Keep reviews small and focused..."
    },
    {
      title: "My Journey Learning Machine Learning",
      author: "Sarah Chen",
      date: "2025-10-09",
      imageUrl: "https://via.placeholder.com/400x250?text=ML+Journey",
      content: "Six months ago, I decided to dive into machine learning. It's been an incredible journey filled with challenges and breakthroughs. From understanding basic algorithms to building my first neural network, here's what I've learned along the way."
    },
    {
      title: "Remote Work Best Practices",
      author: "Mike Rodriguez",
      date: "2025-10-08",
      imageUrl: null,
      content: "Working remotely has become the new normal for many of us. After 3 years of remote work, I've discovered some practices that have significantly improved my productivity and work-life balance. Communication is key, setting boundaries is crucial, and having a dedicated workspace makes all the difference."
    },
    {
      title: "Building Scalable APIs with Node.js",
      author: "Emily Thompson",
      date: "2025-10-07",
      imageUrl: "https://via.placeholder.com/400x250?text=Node.js+API",
      content: "Scalability is crucial when building modern applications. In this post, I'll share my experience building APIs that can handle millions of requests. We'll cover caching strategies, database optimization, and microservices architecture."
    },
    {
      title: "CSS Grid vs Flexbox: When to Use What",
      author: "David Park",
      date: "2025-10-06",
      imageUrl: "https://via.placeholder.com/400x250?text=CSS+Layout",
      content: "Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Grid is perfect for two-dimensional layouts, while Flexbox excels in one-dimensional arrangements. Let me break down when to use each one with practical examples."
    },
    {
      title: "My First Open Source Contribution",
      author: "Lisa Wang",
      date: "2025-10-05",
      imageUrl: null,
      content: "Contributing to open source seemed intimidating at first, but it turned out to be one of the most rewarding experiences in my development journey. Here's how I found my first project, overcame imposter syndrome, and made my first meaningful contribution to the community."
    },
    {
      title: "Database Design Principles for Beginners",
      author: "Robert Kim",
      date: "2025-10-04",
      imageUrl: "https://via.placeholder.com/400x250?text=Database+Design",
      content: "Good database design is the foundation of any successful application. Whether you're working with SQL or NoSQL databases, these fundamental principles will help you create efficient, maintainable, and scalable data structures."
    }
  ];

  return (
    <div>
      <Navbar />
      <main className="flex px-8 justify-between gap-5 mt-6">
        <div className="flex-col max-w-80">
          <h2 className="px-1 text-lg font-bold">Profile</h2>
          <Link href="../profile">
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
            {samplePosts.map((post, index) => (
              <Post 
                key={index}
                title={post.title}
                author={post.author}
                date={post.date}
                imageUrl={post.imageUrl}
                content={post.content}
              />
            ))}
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
