"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

// Custom color classes based on your color grading
const customColors = {
  primary: '#1a2d42',      // Dark navy
  secondary: '#2e4156',    // Medium navy  
  tertiary: '#aab7b7',     // Light gray
  quaternary: '#c0c8ca',   // Lighter gray
  quinary: '#d4d8dd'       // Very light gray
};

// Sample Data
const sampleCommunity = {
  id: 5,
  name: "React Developers Hub",
  description: "A community for React developers to share knowledge, discuss best practices, and collaborate on projects. Whether you're a beginner or an expert, everyone is welcome!",
  logoUrl: "https://res.cloudinary.com/dus6ptgkm/image/upload/v1760209304/chxxmc2m4o3fbmuwj1xv.png",
  createdAt: "2025-09-15",
  role: "ADMIN"
};

const samplePosts = [
  {
    id: 1,
    title: "Welcome to React Developers Hub!",
    description: "#welcome #community #react\n\nHi everyone! Welcome to our community. This is a place where we can share React tips, discuss best practices, and help each other grow as developers. Feel free to introduce yourself and share what you're working on!",
    author: "AdminUser",
    votes: 24,
    likes: 24,
    comments: 12,
    createdAt: "2025-10-12 10:30",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Best practices for React Hooks in 2025",
    description: "#react #hooks #bestpractices #development\n\nI've been working with React hooks for a while now, and I wanted to share some best practices I've learned. Here are my top 5 tips for writing cleaner, more maintainable hook code that will save you hours of debugging.",
    author: "ReactMaster",
    votes: 45,
    likes: 45,
    comments: 8,
    createdAt: "2025-10-11 14:20",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Help needed: State management in large apps",
    description: "#help #statemanagement #redux #context\n\nI'm working on a large React application and struggling with state management. The app has grown complex and I'm not sure whether to stick with useState/useContext or move to Redux Toolkit. Any advice from experienced developers?",
    author: "DevNewbie",
    votes: 18,
    likes: 18,
    comments: 23,
    createdAt: "2025-10-11 09:15",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=300&fit=crop",
  },
  {
    id: 4,
    title: "New React 19 features you should know about",
    description: "#react19 #newfeatures #concurrent #performance\n\nReact 19 is coming with some amazing new features! Here's a comprehensive breakdown of what's new and how it will impact your development workflow. The new concurrent features are absolutely game-changing for performance!",
    author: "TechGuru",
    votes: 67,
    likes: 67,
    comments: 15,
    createdAt: "2025-10-10 16:45",
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Sharing my React component library",
    description: "#opensource #components #typescript #library\n\nAfter months of work, I'm excited to share my open-source React component library with the community! It includes 50+ customizable components with TypeScript support and comprehensive documentation. Would love your feedback!",
    author: "OpenSourceDev",
    votes: 89,
    likes: 89,
    comments: 31,
    createdAt: "2025-10-09 11:20",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop",
  }
];

const sampleComments = {
  1: [
    { id: 1, author: "ReactMaster", content: "Great initiative! Looking forward to contributing.", createdAt: "2025-10-12 11:00", likes: 5 },
    { id: 2, author: "DevNewbie", content: "Thanks for creating this space. Excited to learn!", createdAt: "2025-10-12 11:15", likes: 3 },
    { id: 3, author: "TechGuru", content: "Welcome everyone! Let's build amazing things together.", createdAt: "2025-10-12 11:30", likes: 8 },
    { id: 4, author: "CodeMaster", content: "Perfect timing! I have so many React questions.", createdAt: "2025-10-12 11:45", likes: 2 },
    { id: 5, author: "UIDesigner", content: "Love the community vibe already!", createdAt: "2025-10-12 12:00", likes: 4 }
  ],
  2: [
    { id: 6, author: "DevNewbie", content: "This is exactly what I needed! Thank you for sharing.", createdAt: "2025-10-11 15:00", likes: 12 },
    { id: 7, author: "AdminUser", content: "Excellent post! Mind if I pin this?", createdAt: "2025-10-11 15:30", likes: 6 },
    { id: 8, author: "ReactNinja", content: "Point #3 about useCallback is gold!", createdAt: "2025-10-11 16:00", likes: 9 },
    { id: 9, author: "FullStackDev", content: "I've been doing #2 wrong this whole time 😅", createdAt: "2025-10-11 16:15", likes: 4 }
  ],
  3: [
    { id: 10, author: "ReactMaster", content: "For large apps, I'd recommend Redux Toolkit with RTK Query.", createdAt: "2025-10-11 10:00", likes: 15 },
    { id: 11, author: "TechGuru", content: "Context is fine for smaller state, but Redux scales better.", createdAt: "2025-10-11 10:30", likes: 8 },
    { id: 12, author: "AdminUser", content: "Check out Zustand as well - it's a great middle ground!", createdAt: "2025-10-11 11:00", likes: 11 },
    { id: 13, author: "StateManager", content: "I wrote a blog about this exact topic. DM me if interested!", createdAt: "2025-10-11 11:30", likes: 3 },
    { id: 14, author: "CodeCrafter", content: "What's your app's complexity level? That matters a lot.", createdAt: "2025-10-11 12:00", likes: 5 }
  ]
};

const sampleMembers = [
  {
    id: 1,
    username: "AdminUser",
    name: "Alex Johnson",
    role: "ADMIN",
    profilePicture: null,
    joinedAt: "2025-09-15"
  },
  {
    id: 2,
    username: "ReactMaster",
    name: "Sarah Chen",
    role: "MODERATOR",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=150&h=150&fit=crop&crop=face",
    joinedAt: "2025-09-18"
  },
  {
    id: 3,
    username: "TechGuru",
    name: "Michael Rodriguez",
    role: "MEMBER",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    joinedAt: "2025-09-20"
  },
  {
    id: 4,
    username: "DevNewbie",
    name: "Emily Wang",
    role: "MEMBER",
    profilePicture: null,
    joinedAt: "2025-09-22"
  },
  {
    id: 5,
    username: "OpenSourceDev",
    name: "David Kim",
    role: "MEMBER",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    joinedAt: "2025-09-25"
  }
];

// Create Post Modal Component
function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState('');
  const { id } = useParams();
   useEffect(()=>{
    const st=localStorage.getItem("accToken")
    setToken(st)
   })


   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
  
    setIsSubmitting(true);
    let imageUrl = null;
  
    try {
      // Step 1: Upload image to cloud if provided
      if (image && token) {
        const formData = new FormData();
        formData.append('file', image); // Fixed: was using 'photo' instead of 'image'
  
        const uploadResponse = await fetch(`http://localhost:8080/cloud/uploadFile`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error(`Upload failed: ${uploadResponse.status}`);
        }
  
        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.url || uploadResult; // Adjust based on your API response structure
        console.log('Image uploaded:', imageUrl);
      }
  
      // Step 2: Create post with image URL
      if (token) {
        const postResponse = await fetch(`http://localhost:8080/posts/createPost`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: title.trim(),
            description: hashtags.trim() ? `${hashtags.trim()}\n\n${description.trim()}` : description.trim(),
            imageurl: imageUrl, // Use the uploaded image URL
            communityId: id
          })
        });
        const postData = await postResponse.text();

        if (!postResponse.ok) {
          const errorData = postData
          throw new Error(errorData.message || 'Failed to create post');
        }
  
        console.log('Post created:', postData);
        
        // Reset form
        setTitle('');
        setDescription('');
        setHashtags('');
        setImage(null);
        setImagePreview(null);

        
        onClose();
        toast.success('Post created successfully!');
      } else {
        throw new Error('No authentication token found');
      }
  
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div style={{backgroundColor: customColors.primary}} className="px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Create New Post</h2>
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
  {/* Title Input */}
  <div>
    <label className="block text-sm font-medium mb-2" style={{ color: customColors.primary }}>
      Post Title *
    </label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all"
      style={{
        borderColor: customColors.quaternary,
        focusBorderColor: customColors.secondary,
      }}
      placeholder="Enter an engaging title for your post..."
      required
    />
  </div>

  {/* Hashtags Input */}
  <div>
    <label className="block text-sm font-medium mb-2" style={{ color: customColors.primary }}>
      Hashtags
    </label>
    <input
      type="text"
      value={hashtags}
      onChange={(e) => setHashtags(e.target.value)}
      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all"
      style={{
        borderColor: customColors.quaternary,
        focusBorderColor: customColors.secondary,
      }}
      placeholder="#react #javascript #webdev"
    />
  </div>

  {/* Description Textarea */}
  <div>
    <label className="block text-sm font-medium mb-2" style={{ color: customColors.primary }}>
      Description *
    </label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      rows={6}
      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none"
      style={{
        borderColor: customColors.quaternary,
        focusBorderColor: customColors.secondary,
      }}
      placeholder="Share your thoughts, insights, or questions with the community..."
      required
    />
  </div>

  {/* Image Upload */}
  <div>
    <label className="block text-sm font-medium mb-2" style={{ color: customColors.primary }}>
      Post Image
    </label>

    <div
      className="border-2 border-dashed rounded-xl p-6 text-center transition-colors hover:border-gray-400 relative"
      style={{ borderColor: customColors.quaternary }}
    >
      {imagePreview ? (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-64 mx-auto rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setImage(null);
              setImagePreview(null);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <svg
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: customColors.tertiary }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="mb-2" style={{ color: customColors.secondary }}>
            Click below to upload or drag and drop
          </p>
          <p className="text-sm" style={{ color: customColors.tertiary }}>
            PNG, JPG, GIF up to 10MB
          </p>

          {/* ✅ Fixed clickable label */}
          <label
            htmlFor="image-upload"
            className="inline-block mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg cursor-pointer hover:bg-cyan-700 transition"
          >
            Choose Image
          </label>
        </>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="image-upload"
      />
    </div>
  </div>

  {/* Submit Buttons */}
  <div className="flex gap-3 pt-4">
    <button
      type="button"
      onClick={onClose}
      className="flex-1 px-6 py-3 border-2 rounded-xl font-medium transition-colors"
      style={{
        borderColor: customColors.quaternary,
        color: customColors.secondary,
      }}
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex-1 px-6 py-3 rounded-xl font-medium text-white transition-colors disabled:opacity-50"
      style={{ backgroundColor: customColors.primary }}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Creating...
        </div>
      ) : (
        'Create Post'
      )}
    </button>
  </div>
</form>
      </div>
    </div>
  );
}

// Comments Modal Component
function CommentsModal({ isOpen, onClose, post, comments = [] }) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Comment added!');
      setNewComment('');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div style={{backgroundColor: customColors.primary}} className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Comments</h2>
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

        {/* Post Preview */}
        <div className="px-6 py-4" style={{backgroundColor: customColors.quinary}}>
          <h3 className="font-semibold mb-2" style={{color: customColors.primary}}>{post.title}</h3>
          <p className="text-sm" style={{color: customColors.secondary}}>by {post.author}</p>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p style={{color: customColors.tertiary}}>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex space-x-3 p-4 rounded-xl" style={{backgroundColor: customColors.quinary}}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" 
                       style={{backgroundColor: customColors.secondary}}>
                    {comment.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium" style={{color: customColors.primary}}>{comment.author}</span>
                      <span className="text-sm" style={{color: customColors.tertiary}}>{comment.createdAt}</span>
                    </div>
                    <p style={{color: customColors.secondary}}>{comment.content}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <button className="flex items-center space-x-1 text-sm transition-colors hover:opacity-80"
                              style={{color: customColors.tertiary}}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-sm transition-colors hover:opacity-80" style={{color: customColors.tertiary}}>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="px-6 py-4 border-t" style={{borderColor: customColors.quaternary}}>
          <form onSubmit={handleSubmitComment} className="flex space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                 style={{backgroundColor: customColors.secondary}}>
              U
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-2 border rounded-xl resize-none focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: customColors.quaternary,
                  focusBorderColor: customColors.secondary
                }}
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="px-6 py-2 rounded-lg font-medium text-white transition-colors disabled:opacity-50"
                  style={{backgroundColor: customColors.primary}}
                >
                  {isSubmitting ? 'Posting...' : 'Comment'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Enhanced Post Card Component
function PostCard({ post, onVote, onOpenComments }) {
  const [isVoting, setIsVoting] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const comments = sampleComments[post.id] || [];
  const visibleComments = comments.slice(0, 4);
  
  const handleVote = async (delta) => {
    if (isVoting) return;
    setIsVoting(true);
    await onVote(post.id, delta);
    setIsVoting(false);
  };

  // Parse hashtags and description
  const parseContent = (content) => {
    const lines = content.split('\n');
    const hashtagLine = lines.find(line => line.trim().startsWith('#'));
    const descriptionLines = lines.filter(line => !line.trim().startsWith('#') && line.trim() !== '');
    
    return {
      hashtags: hashtagLine || '',
      description: descriptionLines.join(' ')
    };
  };

  const { hashtags, description } = parseContent(post.description);
  const truncatedDescription = description.length > 200 ? 
    description.substring(0, 200) + '...' : description;

  return (
    <article className="bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl"
             style={{borderColor: customColors.quaternary}}>
      {/* Post Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
               style={{backgroundColor: customColors.secondary}}>
            {post.author[0]}
          </div>
          <div>
            <h3 className="font-semibold" style={{color: customColors.primary}}>{post.author}</h3>
            <p className="text-sm" style={{color: customColors.tertiary}}>{post.createdAt}</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" style={{color: customColors.tertiary}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className="px-6">
        {/* Title */}
        <h2 className="text-xl font-bold mb-3" style={{color: customColors.primary}}>
          {post.title}
        </h2>

        {/* Hashtags */}
        {hashtags && (
          <div className="mb-3">
            <p className="text-sm" style={{color: customColors.secondary}}>{hashtags}</p>
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <p className="leading-relaxed" style={{color: customColors.secondary}}>
            {showFullDescription ? description : truncatedDescription}
          </p>
          {description.length > 200 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-sm font-medium mt-2 hover:underline"
              style={{color: customColors.primary}}
            >
              {showFullDescription ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Post Image */}
        {post.imageUrl && (
          <div className="mb-4">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full rounded-xl object-cover max-h-96 border"
              style={{borderColor: customColors.quaternary}}
            />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-6 py-4 border-t" style={{borderColor: customColors.quinary}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Voting */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVote(1)}
                disabled={isVoting}
                className={`p-2 rounded-full transition-all ${isVoting ? 'opacity-50' : 'hover:bg-red-50'}`}
              >
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <span className="font-medium" style={{color: customColors.secondary}}>{post.likes}</span>
            </div>

            {/* Comments */}
            <button
              onClick={() => onOpenComments(post, comments)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" style={{color: customColors.tertiary}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span style={{color: customColors.secondary}}>{post.comments}</span>
            </button>

            {/* Share */}
            <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" style={{color: customColors.tertiary}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Comments Preview */}
      {visibleComments.length > 0 && (
        <div className="px-6 pb-4">
          <div className="space-y-3">
            {visibleComments.map(comment => (
              <div key={comment.id} className="flex space-x-3 p-3 rounded-lg" style={{backgroundColor: customColors.quinary}}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                     style={{backgroundColor: customColors.tertiary}}>
                  {comment.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm" style={{color: customColors.primary}}>{comment.author}</span>
                    <span className="text-xs" style={{color: customColors.tertiary}}>{comment.createdAt}</span>
                  </div>
                  <p className="text-sm mt-1" style={{color: customColors.secondary}}>{comment.content}</p>
                </div>
              </div>
            ))}
            
            {comments.length > 4 && (
              <button
                onClick={() => onOpenComments(post, comments)}
                className="text-sm font-medium hover:underline"
                style={{color: customColors.primary}}
              >
                View all {comments.length} comments
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

// Member Card Component with custom colors
function MemberCard({ member }) {
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'ADMIN':
        return { backgroundColor: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' };
      case 'MODERATOR':
        return { backgroundColor: '#dbeafe', color: '#2563eb', borderColor: '#bfdbfe' };
      case 'MEMBER':
        return { backgroundColor: '#dcfce7', color: '#16a34a', borderColor: '#bbf7d0' };
      default:
        return { backgroundColor: customColors.quinary, color: customColors.secondary, borderColor: customColors.quaternary };
    }
  };

  const badgeStyle = getRoleBadgeStyle(member.role);

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300"
         style={{borderColor: customColors.quaternary}}>
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img
            src={member.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.username || member.name)}&background=${customColors.secondary.slice(1)}&color=ffffff&size=48`}
            alt={`${member.username || member.name} profile`}
            className="w-12 h-12 rounded-full border-2 object-cover"
            style={{borderColor: customColors.quaternary}}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium" style={{color: customColors.primary}}>{member.name}</h3>
                <p className="text-sm" style={{color: customColors.tertiary}}>@{member.username}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                    style={badgeStyle}>
                {member.role}
              </span>
            </div>
            <p className="text-sm mt-2" style={{color: customColors.tertiary}}>
              Joined {member.joinedAt || 'Recently'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Community Detail Component
export default function CommunityDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const communityId = searchParams.get('id') || '5';
  
  const [community, setCommunity] = useState(sampleCommunity);
  const [posts, setPosts] = useState(samplePosts);
  const [members, setMembers] = useState(sampleMembers);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedComments, setSelectedComments] = useState([]);

  // Handle vote
  const handleVote = async (postId, delta) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: Math.max((post.likes || 0) + delta, 0), votes: Math.max((post.votes || 0) + delta, 0) } 
          : post
      ));
    } catch (error) {
      console.error('Voting error:', error);
      toast.error('Failed to vote');
    }
  };

  // Handle create post
  const handleCreatePost = async (postData) => {
    setPosts([postData, ...posts]);
  };

  // Handle open comments
  const handleOpenComments = (post, comments) => {
    setSelectedPost(post);
    setSelectedComments(comments);
    setShowComments(true);
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: customColors.quinary}}>
      {/* Header */}
      <div className="bg-white border-b" style={{borderColor: customColors.quaternary}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="inline-flex items-center mb-6 transition-colors hover:opacity-80"
              style={{color: customColors.secondary}}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Communities
            </button>

            {/* Community Header */}
            <div className="flex items-start space-x-6">
              <img
                src={community.logoUrl}
                alt={`${community.name} logo`}
                className="w-24 h-24 rounded-xl border-2 object-cover"
                style={{borderColor: customColors.quaternary}}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(community.name)}&background=${customColors.secondary.slice(1)}&color=ffffff&size=96`;
                }}
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2" style={{color: customColors.primary}}>{community.name}</h1>
                <p className="text-lg mb-4" style={{color: customColors.secondary}}>{community.description}</p>
                <div className="flex items-center space-x-6 text-sm" style={{color: customColors.tertiary}}>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {members.length} members
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    {posts.length} posts
                  </span>
                  <span>Created {community.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                  community.role === 'ADMIN' ? 'bg-red-50 text-red-700 border-red-200' :
                  community.role === 'MODERATOR' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-green-50 text-green-700 border-green-200'
                }`}>
                  {community.role}
                </span>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="px-6 py-3 rounded-xl font-medium text-white transition-colors hover:opacity-90"
                  style={{backgroundColor: customColors.primary}}
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b" style={{borderColor: customColors.quaternary}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors ${
                activeTab === 'posts'
                  ? `border-[${customColors.primary}] text-[${customColors.primary}]`
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{
                borderBottomColor: activeTab === 'posts' ? customColors.primary : 'transparent',
                color: activeTab === 'posts' ? customColors.primary : customColors.tertiary
              }}
            >
              Posts ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors ${
                activeTab === 'members'
                  ? `border-[${customColors.primary}] text-[${customColors.primary}]`
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{
                borderBottomColor: activeTab === 'members' ? customColors.primary : 'transparent',
                color: activeTab === 'members' ? customColors.primary : customColors.tertiary
              }}
            >
              Members ({members.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-8">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onVote={handleVote}
                onOpenComments={handleOpenComments}
              />
            ))}
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
      />

      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        post={selectedPost}
        comments={selectedComments}
      />
    </div>
  );
}