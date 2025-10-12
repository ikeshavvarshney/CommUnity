"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Custom color classes based on your color grading
const customColors = {
  primary: '#1a2d42',      // Dark navy
  secondary: '#2e4156',    // Medium navy  
  tertiary: '#aab7b7',     // Light gray
  quaternary: '#c0c8ca',   // Lighter gray
  quinary: '#d4d8dd'       // Very light gray
};

// Community Card Component
function CommunityCard({ community, onJoin, onVisit, isJoining }) {
  const getCategoryColor = (category) => {
    const colors = {
      'Technology': { bg: '#dbeafe', text: '#1d4ed8', border: '#bfdbfe' },
      'Design': { bg: '#f3e8ff', text: '#7c3aed', border: '#d8b4fe' },
      'Marketing': { bg: '#fef3c7', text: '#d97706', border: '#fde68a' },
      'Business': { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' },
      'default': { bg: customColors.quinary, text: customColors.secondary, border: customColors.quaternary }
    };
    return colors[category] || colors.default;
  };
  const [token,setToken]=useState("")
  useEffect(()=>{
    const st=localStorage.getItem("accToken")
    console.log(token)
    setToken(st)
  },[])
  
  const joinCommunity = async (id) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8080/communities/join/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("Join failed:", err);
        return;
      }

      const data = await response.text();
      console.log("Joined:", data);
    } catch (err) {
      console.error(err);
    }
  };
  const categoryStyle = getCategoryColor(community.category || 'General');

  return (
    <div className="bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
         style={{borderColor: customColors.quaternary}}>
      
      {/* Community Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start space-x-4">
          <img
            src={community.logoUrl}
            alt={`${community.name} logo`}
            className="w-16 h-16 rounded-xl border-2 object-cover flex-shrink-0"
            style={{borderColor: customColors.quaternary}}
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(community.name)}&background=${customColors.secondary.slice(1)}&color=ffffff&size=64`;
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1 truncate" style={{color: customColors.primary}}>
                  {community.name}
                </h3>
                <span 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                  style={categoryStyle}
                >
                  {community.category || 'General'}
                </span>
              </div>
              {community.isJoined && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    ✓ Joined
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Community Description */}
      <div className="px-6 pb-4">
        <p className="text-sm leading-relaxed line-clamp-3" style={{color: customColors.secondary}}>
          {community.description}
        </p>
      </div>

      {/* Tags - Only show if community has tags */}
      {community.tags && community.tags.length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {community.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: customColors.quinary,
                  color: customColors.secondary,
                  border: `1px solid ${customColors.quaternary}`
                }}
              >
                #{tag}
              </span>
            ))}
            {community.tags.length > 3 && (
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: customColors.quinary,
                  color: customColors.tertiary
                }}
              >
                +{community.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-sm" style={{color: customColors.tertiary}}>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {community.memberCount?.toLocaleString() || '0'}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              {community.postCount || 0} posts
            </span>
          </div>
          {community.createdAt && (
            <span>
              Created {new Date(community.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 pt-2 border-t" style={{borderColor: customColors.quaternary}}>
        <div className="flex gap-3">
          <button
            onClick={() => onVisit(community)}
            className="flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors border-2"
            style={{
              borderColor: customColors.primary,
              color: customColors.primary,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = customColors.primary;
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = customColors.primary;
            }}
          >
            View Community
          </button>
          
          {!community.isJoined && (
            <button
              onClick={() => joinCommunity(community.id)}
              disabled={isJoining === community.id}
              className="flex-1 px-4 py-2.5 rounded-xl font-medium text-white transition-colors disabled:opacity-50"
              style={{backgroundColor: customColors.primary}}
            >
              {isJoining === community.id ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Joining...
                </div>
              ) : (
                'Join Community'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Public Communities Page
export default function PublicCommunitiesPage() {
  const router = useRouter();
  const [communities, setCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('alphabetical'); // Changed default since we don't have member counts
  const [joiningCommunity, setJoiningCommunity] = useState(null);
  const [token, setToken] = useState('');

  const categories = ['All', 'Technology', 'Design', 'Marketing', 'Business', 'General'];
  const sortOptions = [
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'members', label: 'Most Members' }
  ];

  useEffect(() => {
    const st = localStorage.getItem("accToken");
    setToken(st);
  }, []);

  // Fetch communities from API
  const fetchCommunities = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/communities/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Communities fetched:", data);
      
      // Transform API data to match our component structure
      const transformedCommunities = data.map(community => ({
        ...community,
        memberCount: community.memberCount || 0,
        postCount: community.postCount || 0,
        category: community.category || 'General',
        isPublic: community.isPublic !== false, // Assume public unless explicitly false
        tags: community.tags || [],
        isJoined: community.isJoined || false,
        createdAt: community.createdAt || new Date().toISOString()
      }));
      
      setCommunities(transformedCommunities);
    } catch (error) {
      console.error('Error fetching communities:', error);
      toast.error('Failed to load communities');
    } finally {
      setLoading(false);
    }
  };

  // Fetch communities when token is available
  useEffect(() => {
    if (token) {
      fetchCommunities();
    }
  }, [token]);

  // Filter and sort communities
  useEffect(() => {
    let filtered = communities;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(community =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (community.tags && community.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(community => 
        (community.category || 'General') === selectedCategory
      );
    }

    // Sort communities
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.memberCount || 0) - (a.memberCount || 0);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'members':
          return (b.memberCount || 0) - (a.memberCount || 0);
        default:
          return 0;
      }
    });

    setFilteredCommunities(filtered);
  }, [communities, searchTerm, selectedCategory, sortBy]);

  const handleJoinCommunity = async (community) => {
    if (!token) {
      toast.error('Please log in to join communities');
      return;
    }

    setJoiningCommunity(community.id);
    try {
      const res = await fetch(`http://localhost:8080/communities/${community.id}/join`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (res.ok) {
        // Update local state
        setCommunities(prev => 
          prev.map(c => 
            c.id === community.id 
              ? { ...c, isJoined: true, memberCount: (c.memberCount || 0) + 1 }
              : c
          )
        );
        
        toast.success(`Successfully joined ${community.name}!`);
      } else {
        const errorData = await res.text();
        throw new Error(errorData || 'Failed to join community');
      }
    } catch (error) {
      console.error('Error joining community:', error);
      toast.error(error.message || 'Failed to join community');
    } finally {
      setJoiningCommunity(null);
    }
  };

  const handleVisitCommunity = (community) => {
    router.push(`/communities/${community.id}`);
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: customColors.quinary}}>
      {/* Header */}
      <div className="bg-white border-b" style={{borderColor: customColors.quaternary}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-3" style={{color: customColors.primary}}>
                Discover Communities
              </h1>
              <p className="text-xl max-w-3xl mx-auto" style={{color: customColors.secondary}}>
                Join thousands of professionals, creators, and enthusiasts in communities that match your interests
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <svg className="absolute left-3 top-3.5 h-5 w-5" style={{color: customColors.tertiary}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search communities, topics, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: customColors.quaternary,
                      focusBorderColor: customColors.secondary
                    }}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3 items-center">
                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium" style={{color: customColors.secondary}}>
                    Category:
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: customColors.quaternary,
                      focusBorderColor: customColors.secondary
                    }}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium" style={{color: customColors.secondary}}>
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: customColors.quaternary,
                      focusBorderColor: customColors.secondary
                    }}
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-6 text-center">
              <p className="text-sm" style={{color: customColors.tertiary}}>
                Showing {filteredCommunities.length} of {communities.length} communities
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: customColors.primary}}></div>
          </div>
        ) : filteredCommunities.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-sm mx-auto">
              <svg className="mx-auto h-12 w-12 mb-4" style={{color: customColors.tertiary}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium mb-2" style={{color: customColors.secondary}}>
                {communities.length === 0 ? 'No communities available' : 'No communities found'}
              </h3>
              <p className="text-sm" style={{color: customColors.tertiary}}>
                {communities.length === 0 
                  ? 'Check back later for new communities.' 
                  : 'Try adjusting your search terms or filters to find communities that match your interests.'
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCommunities.map(community => (
              <CommunityCard
                key={community.id}
                community={community}
                onJoin={handleJoinCommunity}
                onVisit={handleVisitCommunity}
                isJoining={joiningCommunity}
              />
            ))}
          </div>
        )}
      </div>

      {/* Refresh Button */}
      {!loading && (
        <div className="text-center pb-12">
          <button
            onClick={fetchCommunities}
            className="px-8 py-3 rounded-xl font-medium text-white transition-colors hover:opacity-90"
            style={{backgroundColor: customColors.secondary}}
          >
            Refresh Communities
          </button>
        </div>
      )}
    </div>
  );
}
