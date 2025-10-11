"use client";
import { useState, useMemo, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';

const samplePosts = [
  {
    id: 1,
    title: 'Welcome to the Community!',
    content: 'This is a sample post content. Connect, share, and discuss here.',
    author: 'User123',
    votes: 12,
    comments: 4,
    createdAt: '2025-10-10 14:20',
    photoUrl: null,
  },
  {
    id: 2,
    title: 'How to use Next.js with Tailwind CSS?',
    content: 'Looking for best practices for integrating Tailwind CSS in Next.js projects.',
    author: 'DevGuru',
    votes: 18,
    comments: 7,
    createdAt: '2025-10-11 09:42',
    photoUrl: 'https://via.placeholder.com/400x250?text=Tailwind+CSS',
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(samplePosts);
  const [title, setTitle] = useState('');
  const [token, setToken] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [votingStates, setVotingStates] = useState({});

  const formRef = useRef(null);
  const titleInputRef = useRef(null);

  // Auto-focus title input when form opens
  useEffect(() => {
    if (showForm && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [showForm]);

  // Scroll to form when it opens
  useEffect(() => {
    if (showForm && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [showForm]);

  useEffect(() => {
    const storedToken = localStorage.getItem("accToken");
    setToken(storedToken);
  }, []);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'File size must be less than 5MB' }));
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, photo: 'Please select a valid image file' }));
        return;
      }

      setErrors(prev => ({ ...prev, photo: null }));
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  const handleVote = async (id, delta) => {
    if (votingStates[id]) return; // Prevent double voting

    setVotingStates(prev => ({ ...prev, [id]: true }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setPosts(posts.map(post => 
        post.id === id 
          ? { ...post, votes: Math.max(post.votes + delta, 0) } 
          : post
      ));
    } catch (error) {
      console.error('Voting error:', error);
    } finally {
      setVotingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!token) {
      setErrors({ submit: 'Authentication token not found. Please login again.' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Create FormData for multipart/form-data request
      const formData = new FormData();
      // formData.append('name', title.trim());
      // formData.append('description', content.trim());
      
      // Append photo file if exists
      if (photo) {
        formData.append('file', photo);
      }

      const response = await fetch("http://localhost:8080/cloud/uploadFile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type header when using FormData
          // Browser will set it automatically with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Community created:', result);

      const newPost = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        author: 'Anonymous', // Replace with actual user
        votes: 0,
        comments: 0,
        createdAt: new Date().toLocaleString(),
        photoUrl: photoPreview,
      };
      try{
        const response1=await fetch("http://localhost:8080/communities/create",{
          method:"POST",
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name:title,
            description:content,
            logoUrl:result.url
          })
        })
        const data=await response1.json()
        if(!response.ok){
          const errData=data;
          throw Error(errData)
        }
        console.log(data)
      }
      catch(e){
        console.log(e);
        
      }

      setPosts(prev => [newPost, ...prev]);
      
      // Reset form
      setTitle('');
      setContent('');
      setPhoto(null);
      setPhotoPreview(null);
      setShowForm(false);
      setSuccessMessage('Community created successfully!');
      
    } catch (error) {
      console.error('Error creating community:', error);
      setErrors({ submit: 'Failed to create community. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = useMemo(() =>
    posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    ), [posts, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-down">
          {successMessage}
        </div>
      )}

      <main className="flex-1 p-4 sm:p-6 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Community Posts
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg
              ${showForm 
                ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl transform hover:-translate-y-0.5'
              }
            `}
            aria-expanded={showForm}
            aria-controls="create-post-form"
          >
            {showForm ? '✕ Cancel' : '✏️ Create'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="search"
              placeholder="Search posts, authors, or content..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
              aria-label="Search community posts"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Create Post Form */}
        <div className={`transition-all duration-500 ease-in-out ${showForm ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0 overflow-hidden'}`}>
          {showForm && (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              id="create-post-form"
              className="mb-12 bg-white p-8 rounded-2xl shadow-2xl border-2 border-indigo-200 max-w-4xl mx-auto animate-fade-in-up"
              aria-label="Create a new community form"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Create a New Community</h2>
              </div>

              {errors.submit && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {errors.submit}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <input
                    ref={titleInputRef}
                    type="text"
                    placeholder="Enter Community Name..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className={`w-full p-4 text-lg border-2 rounded-xl focus:outline-none transition-all ${
                      errors.title 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-indigo-500'
                    }`}
                    maxLength={100}
                    required
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">{title.length}/100 characters</p>
                </div>

                <div>
                  <textarea
                    placeholder="Share description of the community..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={6}
                    className={`w-full p-4 text-lg border-2 rounded-xl resize-none focus:outline-none transition-all ${
                      errors.content 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-indigo-500'
                    }`}
                    required
                  />
                  {errors.content && (
                    <p className="mt-2 text-sm text-red-600">{errors.content}</p>
                  )}
                </div>

                {/* Photo Upload Section */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Community Logo (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-400 transition-colors">
                    <div className="space-y-1 text-center">
                      {photoPreview ? (
                        <div className="relative">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="mx-auto h-32 w-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPhoto(null);
                              setPhotoPreview(null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="photo-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a photo</span>
                              <input
                                id="photo-upload"
                                name="photo-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handlePhotoChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  {errors.photo && (
                    <p className="mt-2 text-sm text-red-600">{errors.photo}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all transform ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Community...
                    </span>
                  ) : (
                    '🚀 Create Community'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Posts List */}
        <div className="space-y-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 mb-4">
                {searchTerm ? 'No posts found matching your search' : 'No posts yet'}
              </p>
              <p className="text-gray-500">
                {searchTerm ? 'Try a different search term' : 'Be the first to share something!'}
              </p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <article
                key={post.id}
                className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                tabIndex={0}
                aria-label={`Post titled ${post.title} by ${post.author}`}
              >
                {/* Vote Section */}
                <div className="flex md:flex-col items-center justify-center bg-gray-50 w-full md:w-20 py-4 md:py-6 text-gray-600 select-none">
                  <button
                    onClick={() => handleVote(post.id, 1)}
                    disabled={votingStates[post.id]}
                    className={`text-2xl transition-all hover:scale-110 ${
                      votingStates[post.id] 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:text-indigo-600 focus:outline-none'
                    }`}
                    aria-label="Upvote"
                    type="button"
                  >
                    ▲
                  </button>
                  <span className="font-bold mt-2 md:mt-3 text-xl mx-4 md:mx-0">{post.votes}</span>
                  <button
                    onClick={() => handleVote(post.id, -1)}
                    disabled={votingStates[post.id]}
                    className={`text-2xl transition-all hover:scale-110 ${
                      votingStates[post.id] 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:text-red-500 focus:outline-none'
                    }`}
                    aria-label="Downvote"
                    type="button"
                  >
                    ▼
                  </button>
                </div>

                {/* Post Content */}
                <div className="flex-1 p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 cursor-pointer transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                  {post.photoUrl && (
                    <div className="mt-6">
                      <img
                        src={post.photoUrl}
                        alt={`Post titled ${post.title}`}
                        className="rounded-xl border border-gray-300 max-h-96 w-full object-contain bg-gray-50"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                        {post.author[0]}
                      </span>
                      <strong>{post.author}</strong>
                    </span>
                    <span>{post.createdAt}</span>
                    <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                      💬 {post.comments} comment{post.comments !== 1 && 's'}
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="mt-16 flex justify-center">
            <button
              className="bg-indigo-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => alert('Load more posts - backend integration needed')}
              type="button"
              aria-label="Load more posts"
            >
              Load More Posts
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
