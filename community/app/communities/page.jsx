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
    
    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPost = {
        id: Date.now(), // Better ID generation
        title: title.trim(),
        content: content.trim(),
        author: 'Anonymous', // Replace with actual user
        votes: 0,
        comments: 0,
        createdAt: new Date().toLocaleString(),
        photoUrl: photoPreview,
      };

      setPosts(prev => [newPost, ...prev]);
      
      // Reset form
      setTitle('');
      setContent('');
      setPhoto(null);
      setPhotoPreview(null);
      setShowForm(false);
      setSuccessMessage('Post created successfully!');

      // Backend integration would go here
      
    } catch (error) {
      setErrors({ submit: 'Failed to create post. Please try again.' });
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
            {showForm ? '✕ Cancel' : '✏️ Share'}
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
              aria-label="Create a new post form"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Create a New Post</h2>
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
                    placeholder="Enter an engaging title..."
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
                    placeholder="Share your thoughts with the community..."
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

                <div>
                  <label className="block mb-3 font-semibold text-gray-700" htmlFor="photo-upload">
                    📷 Add a Photo (Optional)
                  </label>
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3 hover:border-indigo-400 transition-colors"
                  />
                  {errors.photo && (
                    <p className="mt-2 text-sm text-red-600">{errors.photo}</p>
                  )}
                  {photoPreview && (
                    <div className="mt-4 relative inline-block">
                      <img
                        src={photoPreview}
                        alt="Photo preview"
                        className="max-h-64 rounded-xl object-contain border-2 border-gray-200 shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPhoto(null);
                          setPhotoPreview(null);
                        }}
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
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
                      Publishing...
                    </span>
                  ) : (
                    '🚀 Publish Post'
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
