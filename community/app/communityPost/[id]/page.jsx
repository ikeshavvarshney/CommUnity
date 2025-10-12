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

// Members Sidebar Component
function MembersSidebar({ members, communityName }) {
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

  // Group members by role
  const groupedMembers = {
    MODERATOR: members.filter(m => m.role === 'CREATOR' || m.role === 'ADMIN'),
    MEMBER: members.filter(m => m.role === 'MEMBER'),
  };
  

  return (
    <div className="bg-white rounded-xl shadow-md border sticky top-6" style={{borderColor: customColors.quaternary}}>
      {/* Header */}
      <div className="p-4 border-b" style={{borderColor: customColors.quaternary}}>
        <h3 className="text-lg font-bold" style={{color: customColors.primary}}>
          Community Members
        </h3>
        <p className="text-sm" style={{color: customColors.tertiary}}>
          {members.length} total members
        </p>
      </div>

      {/* Members List */}
      <div className="max-h-96 overflow-y-auto">
        {/* Admins */}
        

        {/* Moderators */}
        {groupedMembers.MODERATOR.length > 0 && (
          <div className="p-4 border-t" style={{borderColor: customColors.quaternary}}>
            <h4 className="text-sm font-semibold mb-3 flex items-center" style={{color: customColors.secondary}}>
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              Moderators ({groupedMembers.MODERATOR.length})
            </h4>
            <div className="space-y-2">
              {groupedMembers.MODERATOR.map(member => {
                const badgeStyle = getRoleBadgeStyle(member.role);
                return (
                  <div key={`mod-${member.username}`} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={member.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.username || member.firstName || 'User')}&background=2563eb&color=ffffff&size=24`}
                      alt={`${member.username} profile`}
                      className="w-6 h-6 rounded-full border object-cover"
                      style={{borderColor: customColors.quaternary}}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{color: customColors.primary}}>
                        {member.firstName && member.lastName ? `${member.firstName} ${member.lastName}` : member.username}
                      </p>
                      <p className="text-xs truncate" style={{color: customColors.tertiary}}>
                        @{member.username}
                      </p>
                    </div>
                    <span 
                      className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border flex-shrink-0"
                      style={badgeStyle}
                    >
                      Mod
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Members */}
        {groupedMembers.MEMBER.length > 0 && (
          <div className="p-4 border-t" style={{borderColor: customColors.quaternary}}>
            <h4 className="text-sm font-semibold mb-3 flex items-center" style={{color: customColors.secondary}}>
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Members ({groupedMembers.MEMBER.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {groupedMembers.MEMBER.map(member => {
                const badgeStyle = getRoleBadgeStyle(member.role);
                return (
                  <div key={`member-${member.username}`} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={member.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.username || member.firstName || 'User')}&background=16a34a&color=ffffff&size=24`}
                      alt={`${member.username} profile`}
                      className="w-6 h-6 rounded-full border object-cover"
                      style={{borderColor: customColors.quaternary}}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{color: customColors.primary}}>
                        {member.firstName && member.lastName ? `${member.firstName} ${member.lastName}` : member.username}
                      </p>
                      <p className="text-xs truncate" style={{color: customColors.tertiary}}>
                        @{member.username}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {members.length === 0 && (
          <div className="p-4 text-center">
            <p className="text-sm" style={{color: customColors.tertiary}}>
              No members found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Members Modal Component (keeping the original modal)
function MembersModal({ isOpen, onClose, members, communityName }) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div style={{backgroundColor: customColors.primary}} className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {communityName} Members ({members.length})
            </h2>
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

        {/* Members List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {members.length === 0 ? (
            <div className="text-center py-8">
              <p style={{color: customColors.tertiary}}>No members found.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {members.map(member => {
                const badgeStyle = getRoleBadgeStyle(member.role);
                return (
                  <div 
                    key={member.username} 
                    className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 p-4"
                    style={{borderColor: customColors.quaternary}}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.username || member.firstName || 'User')}&background=${customColors.secondary.slice(1)}&color=ffffff&size=48`}
                        alt={`${member.username} profile`}
                        className="w-8 h-8 rounded-full border-2 object-cover"
                        style={{borderColor: customColors.quaternary}}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium truncate" style={{color: customColors.primary}}>
                            {member.firstName && member.lastName ? `${member.firstName} ${member.lastName}` : member.username}
                          </h3>
                          <span 
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border"
                            style={badgeStyle}
                          >
                            {member.role}
                          </span>
                        </div>
                        <p className="text-xs truncate" style={{color: customColors.tertiary}}>
                          @{member.username}
                        </p>
                        {member.joinedAt && (
                          <p className="text-xs mt-1" style={{color: customColors.tertiary}}>
                            Joined {new Date(member.joinedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t" style={{borderColor: customColors.quaternary}}>
          <div className="flex justify-between items-center text-sm" style={{color: customColors.tertiary}}>
            <span>Total: {members.length} members</span>
            <span>
              {members.filter(m => m.role === 'ADMIN').length} Admin{members.filter(m => m.role === 'ADMIN').length !== 1 ? 's' : ''} • 
              {members.filter(m => m.role === 'MODERATOR').length} Moderator{members.filter(m => m.role === 'MODERATOR').length !== 1 ? 's' : ''} • 
              {members.filter(m => m.role === 'MEMBER').length} Member{members.filter(m => m.role === 'MEMBER').length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Comments Modal Component
function CommentsModal({ isOpen, onClose, post, onRefresh }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const st = localStorage.getItem("accToken");
    setToken(st);
  }, []);

  // Fetch comments when modal opens
  useEffect(() => {
    if (isOpen && post && token) {
      fetchComments();
    }
  }, [isOpen, post, token]);

  const fetchComments = async () => {
    if (!post) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/posts/getPostWithComments/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data=await res.json()
      console.log(data)
      if (!res.ok) {
        console.log(data)
      }
      setComments(data.comments);

    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:8080/posts/createComment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reply: newComment.trim(),
          postId: post.id
        }),
      });
      const data=await res.text()
      if (res.ok) {
        toast.success('Comment added successfully!');
        console.log(data)
        setNewComment('');
        await fetchComments(); // Refresh comments
        onRefresh(); // Refresh posts to update comment count
      } else {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
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
          <h3 className="font-semibold mb-2" style={{color: customColors.primary}}>{post?.title}</h3>
          <p className="text-sm" style={{color: customColors.secondary}}>by {post?.createdByUser}</p>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="text-center py-8">
              <p style={{color: customColors.tertiary}}>Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <p style={{color: customColors.tertiary}}>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex space-x-3 p-4 rounded-xl" style={{backgroundColor: customColors.quinary}}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" 
                       style={{backgroundColor: customColors.secondary}}>
                    {comment.username?.[0] || 'U'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium" style={{color: customColors.primary}}>{comment.username}</span>
                      <span className="text-sm" style={{color: customColors.tertiary}}>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{color: customColors.secondary}}>{comment.reply}</p>
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

  // Fixed: Added dependency array to prevent infinite re-renders
  useEffect(() => {
    const st = localStorage.getItem("accToken");
    setToken(st);
  }, []); // Added empty dependency array

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
        formData.append('file', image);
  
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
        imageUrl = uploadResult.url || uploadResult;
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
            imageurl: imageUrl,
            communityId: id
          })
        });
        const postData = await postResponse.text();

        if (!postResponse.ok) {
          throw new Error(postData || 'Failed to create post');
        }
  
        // Reset form
        setTitle('');
        setDescription('');
        setHashtags('');
        setImage(null);
        setImagePreview(null);
        
        onClose();
        onSubmit(); // Call refresh function
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

                  <label
                    htmlFor="image-upload"
                    className="inline-block mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg cursor-pointer hover:bg-cyan-700 transition"
                  >
                    Choose Image
                  </label>
                </>
              )}

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
                'Create Event'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Fixed: Simple PostCard component (display only, no data fetching)
function PostCard({ post, onVote, onOpenComments }) {
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [votingPostId, setVotingPostId] = useState(null);

  const parseContent = (content) => {
    if (!content) return { hashtags: "", description: "" };
    const lines = content.split("\n");
    const hashtags = lines.filter(line => line.trim().startsWith("#")).join(" ");
    const description = lines
      .filter(line => !line.trim().startsWith("#") && line.trim() !== "")
      .join(" ");
    return { hashtags, description };
  };

  const { hashtags, description } = parseContent(post.description);
  const isExpanded = expandedPostId === post.id;
  const truncatedDescription =
    description.length > 150 ? description.substring(0, 150) + "..." : description;

  const handleVoteClick = async () => {
    setVotingPostId(post.id);
    try {
      await onVote(post.id);
    } finally {
      setVotingPostId(null);
    }
  };

  return (
    <article
      className="bg-white rounded-xl shadow-md border transition-all duration-300 hover:shadow-lg"
      style={{ borderColor: "#e5e7eb" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-gray-400">
            {post.createdByUser?.[0] || "?"}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{post.createdByUser || "Unknown User"}</h3>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="px-4">
        <h2 className="text-lg font-bold mb-2">{post.title}</h2>
        {hashtags && <p className="text-xs text-blue-500 mb-2">{hashtags}</p>}
        <p className="text-gray-700 leading-relaxed mb-3 text-sm">
          {isExpanded ? description : truncatedDescription}
        </p>
        {description.length > 150 && (
          <button
            onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
            className="text-xs font-medium text-blue-600 hover:underline mb-3"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full rounded-lg object-cover max-h-48 border mt-2"
          />
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleVoteClick}
            disabled={votingPostId === post.id}
            className={`flex items-center space-x-1 p-1 rounded-full transition-all ${
              votingPostId === post.id ? "opacity-50" : "hover:bg-red-50"
            }`}
          >
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-xs text-gray-600">{post.likes || 0}</span>
          </button>
          <button
            onClick={() => onOpenComments(post)}
            className="flex items-center space-x-1 p-1 rounded-full hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-xs text-gray-600">{post.comments?.length ?? 0}</span>
          </button>
        </div>
      </div>

      {/* Comments Preview */}
      {post.comments?.length > 0 && (
        <div className="px-4 py-3 border-t space-y-2">
          {post.comments.slice(0, 2).map((comment) => (
            <div key={comment.id} className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-semibold">
                {comment.commentedByUser?.[0] || "?"}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-800">{comment.commentedByUser || "Unknown User"}</p>
                <p className="text-xs text-gray-600 line-clamp-2">{comment.text}</p>
              </div>
            </div>
          ))}
          {post.comments.length > 2 && (
            <button
              onClick={() => onOpenComments(post)}
              className="text-xs font-medium text-blue-600 hover:underline mt-2"
            >
              View all {post.comments.length} comments
            </button>
          )}
        </div>
      )}
    </article>
  );
}

// Main Community Detail Component
export default function CommunityDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  
  const [community, setCommunity] = useState({});
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [token, setToken] = useState('');

  // Fixed: Single useEffect for token
  useEffect(() => {
    const st = localStorage.getItem("accToken");
    setToken(st);
  }, []);

  // Fetch community details
  useEffect(() => {
    if (!id || !token) return;
    fetchCommunity();
  }, [id, token]);

  // Fixed: Single useEffect for fetching posts
  useEffect(() => {
    if (!id || !token) return;
    fetchPosts();
  }, [id, token]);

  const fetchCommunity = async () => {
    try {
      const res = await fetch(`http://localhost:8080/communities/${id}/communityDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data)
        setCommunity(data);
      }
    } catch (err) {
      console.error('Error fetching community:', err);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/communities/${id}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      let data = await res.json();

      // Deduplicate posts by their ID
      const uniquePosts = [];
      const seen = new Set();
      data.forEach((post) => {
        if (!seen.has(post.id)) {
          uniquePosts.push(post);
          seen.add(post.id);
        }
      });
      setPosts(uniquePosts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle vote using your backend API
  const handleVote = async (postId) => {
    try {
      const res = await fetch(`http://localhost:8080/posts/likeAndDislike/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        const result = await res.text();
        console.log('Vote result:', result);
        // Refresh posts to get updated like count
        await fetchPosts();
        toast.success('Vote recorded!');
      } else {
        throw new Error("Vote failed");
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to vote');
    }
  };

  // Handle create post
  const handleCreatePost = async () => {
    await fetchPosts(); // Refresh posts after creating
  };

  // Handle open comments
  const handleOpenComments = (post) => {
    setSelectedPost(post);
    setShowComments(true);
  };

  const handleCloseComments = () => {
    setShowComments(false);
    setSelectedPost(null);
  };

  // Handle open members modal
  const handleOpenMembers = () => {
    setShowMembers(true);
  };

  const handleCloseMembers = () => {
    setShowMembers(false);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: customColors.quinary}}>
        <p className="text-lg" style={{color: customColors.secondary}}>Loading community...</p>
      </div>
    );
  }

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
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(community.name || 'Community')}&background=${customColors.secondary.slice(1)}&color=ffffff&size=96`;
                }}
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2" style={{color: customColors.primary}}>{community.name}</h1>
                <p className="text-lg mb-4" style={{color: customColors.secondary}}>{community.description}</p>
                <div className="flex items-center space-x-6 text-sm" style={{color: customColors.tertiary}}>
                  {/* Clickable Members Count */}
                  <button
                    onClick={handleOpenMembers}
                    className="flex items-center hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {community.members?.length || 0} members
                  </button>
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
                {community.role && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                    community.role === 'ADMIN' ? 'bg-red-50 text-red-700 border-red-200' :
                    community.role === 'MODERATOR' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-green-50 text-green-700 border-green-200'
                  }`}>
                    {community.role}
                  </span>
                )}
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

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Members */}
          <div className="w-80 flex-shrink-0">
            <MembersSidebar 
              members={community.members || []} 
              communityName={community.name || 'Community'} 
            />
          </div>

          {/* Main Content - Posts */}
          <div className="flex-1">
            <div className="space-y-6">
              {loading && posts.length === 0 ? (
                <p className="text-center text-gray-500">Loading posts...</p>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No posts yet</h3>
                  <p className="text-gray-500 mb-4">Be the first to share something with this community!</p>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="px-6 py-3 rounded-xl font-medium text-white transition-colors hover:opacity-90"
                    style={{backgroundColor: customColors.primary}}
                  >
                    Create First Post
                  </button>
                </div>
              ) : (
                posts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onVote={handleVote}
                    onOpenComments={handleOpenComments}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
      />

      {/* Comments Modal */}
      <CommentsModal
        isOpen={showComments}
        onClose={handleCloseComments}
        post={selectedPost}
        onRefresh={fetchPosts}
      />

      {/* Members Modal */}
      <MembersModal
        isOpen={showMembers}
        onClose={handleCloseMembers}
        members={community.members || []}
        communityName={community.name || 'Community'}
      />
    </div>
  );
}
