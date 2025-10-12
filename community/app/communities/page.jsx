"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
// Community Card Component
function CommunityCard({ community, onClick }) {
  const router = useRouter();
  
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
    >
      <div className="p-6">
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

// Create Community Modal Component
function CreateCommunityModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("accToken");
    setToken(storedToken || '');
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setLogoUrl(''); // Reset logo URL when new file is selected
    }
  };

  const uploadImageToCloud = async () => {
    if (!image || !token) {
      return null;
    }

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', image);

      const response = await fetch(`http://localhost:8080/cloud/uploadFile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Community logo uploaded:', result);
      
      // Assuming the API returns the image URL directly or in a specific field
      const uploadedImageUrl = result.url
      setLogoUrl(uploadedImageUrl);
      
      return uploadedImageUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload community logo');
      return null;
    } finally {
      setIsUploadingImage(false);
    }
  };

  const createCommunityWithData = async (communityLogoUrl) => {
    if (!token) {
      toast.error('Authentication token not found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/communities/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          logoUrl: communityLogoUrl || ''
        })
      });

      const data = await response.text();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create community');
      }

      console.log('Community created:', data);
      toast.success('Community created successfully!');
      
      // Create local community data for immediate UI update
      const localCommunityData = {
        id: data.id || Date.now(),
        name: name.trim(),
        description: description.trim(),
        logoUrl: communityLogoUrl || '',
        role: 'ADMIN', // Creator becomes admin
        createdAt: new Date().toISOString(),
      };
      
      // Call the parent's onSubmit to update the UI
      await onSubmit(localCommunityData);
      
      return data;
    } catch (error) {
      console.error('Community creation error:', error);
      toast.error(error.message || 'Failed to create community');
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let finalLogoUrl = '';
      
      // Step 1: Upload image if one is selected
      if (image) {
        finalLogoUrl = await uploadImageToCloud();
        if (image && !finalLogoUrl) {
          // Image upload failed, don't proceed
          toast.error('Please try uploading the logo again');
          return;
        }
      }

      // Step 2: Create community with the logo URL (or empty string if no logo)
      await createCommunityWithData(finalLogoUrl);

      // Reset form on success
      setName('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
      setLogoUrl('');
      onClose();
      
    } catch (error) {
      // Error handling is done in the individual functions
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setLogoUrl('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-indigo-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Create New Community</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Community Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Community Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Enter a name for your community..."
              required
            />
          </div>

          {/* Community Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
              placeholder="Describe what your community is about..."
              required
            />
          </div>

          {/* Community Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Community Logo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-colors hover:border-gray-400 relative">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Logo Preview"
                    className="max-h-32 mx-auto rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    disabled={isUploadingImage}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {isUploadingImage && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p>Uploading...</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="mb-2 text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploadingImage}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploadingImage || !name.trim() || !description.trim()}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating...
                </div>
              ) : (
                'Create Community'
              )}
            </button>
          </div>
        </form>
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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  function handleClick(id) {
    router.push(`/communityPost/${id}`);
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
        console.log(communitiesArray);
        setCommunities(communitiesArray);
        


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

  // Handle create community
  const handleCreateCommunity = async (communityData) => {
    setCommunities([communityData, ...communities]);
    // Optionally refetch communities to get the complete data
    // You can call the fetch function here if needed
  };

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
      <Navbar></Navbar>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Communities</h1>
                <p className="mt-2 text-gray-600">Manage and view all your communities in one place</p>
              </div>
              <div className="mt-4 sm:mt-0 flex gap-3">
              <button 
                  onClick={() => router.push("/allCommunities")}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Join Community
                </button>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
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
                <p className="text-gray-600 mb-6">You haven't joined any communities yet. Join your first community to get started!</p>
                <button 
                  onClick={() =>router.push("/allCommunities") }
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Join Your First Community
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Communities Grid */}
        {!loading && !error && filteredCommunities.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map(community => (
                <CommunityCard 
                  onClick={() => handleClick(community.id)} 
                  key={community.id} 
                  community={community} 
                />
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

      {/* Create Community Modal */}
      <CreateCommunityModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCommunity}
      />
    </div>
  );
}
