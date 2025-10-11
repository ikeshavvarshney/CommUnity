'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const EditableField = ({ label, value, onEdit, multiline = false }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-xl font-semibold text-gray-800">{label}</h3>
      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        aria-label={`Edit ${label}`}
      >
        Edit
      </button>
    </div>
    {multiline ? (
      <p className="whitespace-pre-wrap text-gray-700 bg-white p-4 rounded border border-gray-200 shadow-sm">{value}</p>
    ) : (
      <p className="text-gray-700 bg-white p-3 rounded border border-gray-200 shadow-sm truncate">{value}</p>
    )}
  </div>
);

const userProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    bio: 'Web developer, tech enthusiast, music lover.',
    about:
      'Passionate about building awesome web experiences. Love exploring new tech and sharing knowledge.',
    profileViews: 1234,
    postViews: 5678,
  });

  const handleEdit = (field) => {
    const newValue = prompt(`Edit your ${field}:`, profile[field]);
    if (newValue !== null && newValue.trim() !== '') {
      setProfile({ ...profile, [field]: newValue.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-10">
        {/* Header */}
        <div className="flex items-center gap-8 mb-12">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80"
            alt={`${profile.name} profile`}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-2">{profile.name}</h1>
            <p className="text-lg text-gray-600 max-w-md">{profile.bio}</p>
          </div>
        </div>

        {/* Editable sections */}
        <EditableField label="Bio" value={profile.bio} onEdit={() => handleEdit('bio')} />
        <EditableField label="About" value={profile.about} onEdit={() => handleEdit('about')} multiline />

        {/* Statistics */}
        <div className="flex flex-col md:flex-row gap-8 mt-10">
          <div className="flex-1 bg-blue-50 rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{profile.profileViews}</h2>
            <p className="text-blue-600 font-semibold">Profile Views</p>
          </div>
          <div className="flex-1 bg-blue-50 rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{profile.postViews}</h2>
            <p className="text-blue-600 font-semibold">Post Views This Month</p>
          </div>
        </div>

        {/* Edit Name Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => handleEdit('name')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold text-lg shadow transition"
          >
            Edit Name
          </button>
        </div>
      </div>
    </div>
  );
};

export default userProfile;
