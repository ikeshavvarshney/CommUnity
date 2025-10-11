import React from 'react';

const SmallProfile = ({ profilePic, username, bio, about, profileViews, postViews }) => {
  return (
    <div className="max-w-sm p-4 bg-white rounded-lg border border-gray-300 shadow-sm cursor-pointer font-sans">
      <div className="flex items-center mb-4">
        <img
          src={profilePic}
          alt={`${username} profile`}
          className="w-14 h-14 rounded-full object-cover mr-4"
        />
        <div className="overflow-hidden">
          <strong className="block text-xl font-semibold text-gray-900 truncate">{username}</strong>
          <span className="block text-gray-600 text-sm truncate max-w-xs">{bio}</span>
        </div>
      </div>
      <div className="mb-4 text-gray-700 text-sm leading-relaxed whitespace-normal max-h-20 overflow-hidden">
        {about}
      </div>
      <div className="border-t border-gray-200 pt-4 flex justify-between text-gray-600 text-sm">
        <div className="flex flex-col items-center flex-1 border-r border-gray-200 pr-4">
          <span className="font-semibold text-gray-900">{profileViews}</span>
          <span>Profile Views</span>
        </div>
        <div className="flex flex-col items-center flex-1 pl-4">
          <span className="font-semibold text-gray-900">{postViews}</span>
          <span>Post Views This Month</span>
        </div>
      </div>
    </div>
  );
};

export default SmallProfile;
