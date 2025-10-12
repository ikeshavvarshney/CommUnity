"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Community Card Component
function CommunityCard({ community , onClick}) {
  const router=useRouter()
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'MODERATOR':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'MEMBER':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
<div
  onClick={onClick}
  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
>      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Community Logo */}
          <div className="flex-shrink-0">
            <img
              src={community.logoUrl}
              alt={`${community.name} logo`}
              className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100 group-hover:border-gray-200 transition-colors"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(community.name)}&background=f3f4f6&color=374151&size=64`;
              }}
            />
          </div>
          
          {/* Community Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                {community.name}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeStyle(community.role)}`}>
                {community.role}
              </span>
            </div>
            
            {/* Additional Info Row */}
            <div className="flex items-center text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                ID: {community.id}
              </span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-50">
          <div className="flex space-x-2">
            <button className="flex-1 bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
              View Details
            </button>
            <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton Component
function CommunityCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="h-5 bg-gray-200 rounded w-32"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-50">
          <div className="flex space-x-2">
            <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Community Dashboard Component
export default function CommunityDashboard() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router=useRouter()
  function handleClick(id){
    router.push(`/communityPost/${id}`)
  }

  // Initialize token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("accToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError('Authentication token not found. Please login again.');
      setLoading(false);
    }
  }, []);

  // Fetch communities when token is available
  useEffect(() => {
    if (!token) return;

    const fetchCommunities = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`http://localhost:8080/communities/getAllByUser`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        // Handle both array and single object responses
        const communitiesArray = Array.isArray(data) ? data : [data];
        console.log(communitiesArray)
        setCommunities(communitiesArray);
        
        if (communitiesArray.length > 0) {
          toast.success(`Fetched ${communitiesArray.length} communities successfully!`);
        }

      } catch (error) {
        console.error('Error fetching communities:', error);
        setError(error.message || 'Failed to fetch communities. Please try again.');
        toast.error(error.message || 'Failed to fetch communities');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [token]);

  // Filter communities based on search term
  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Retry function
  const handleRetry = () => {
    const storedToken = localStorage.getItem("accToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError('Authentication token not found. Please login again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Communities</h1>
                <p className="mt-2 text-gray-600">Manage and view all your communities in one place</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        {!loading && !error && communities.length > 0 && (
          <div className="mb-8">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <CommunityCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Communities</h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button 
                  onClick={handleRetry}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && communities.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-100 rounded-full mb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Communities Found</h3>
                <p className="text-gray-600 mb-6">You haven't joined any communities yet. Create your first community to get started!</p>
                <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Your First Community
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Communities Grid */}
        {!loading && !error && filteredCommunities.length > 0 && (
          <>
            <div    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map(community => (
                <CommunityCard onClick={()=> handleClick(community.id)} key={community.id} community={community} />
              ))}
            </div>
            
            {/* Results Summary */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Showing {filteredCommunities.length} of {communities.length} communities
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          </>
        )}

        {/* No Search Results */}
        {!loading && !error && communities.length > 0 && filteredCommunities.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-100 rounded-full mb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600 mb-4">
                  No communities match your search for "{searchTerm}". Try a different search term.
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
