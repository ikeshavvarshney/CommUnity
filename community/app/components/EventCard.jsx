import React from 'react';

const EventCard = ({ title, description, hostedBy, location, communityName, createdAt }) => {
  // Split hashtags from the rest of the text
  const hashtags = description?.match(/#[\w]+/g) || [];
  const cleanDescription = description
    ?.replace(/#[\w]+/g, '') // remove hashtags
    .trim();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden p-6">
      <div className="flex flex-col space-y-3">
        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
          {title}
        </h3>

        {/* Organizer */}
        <p className="text-cyan-600 font-medium">
          Hosted by <span className="text-gray-800">{hostedBy || 'N/A'}</span>
        </p>

        {/* Meta Info */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-semibold text-gray-700">Community:</span>{' '}
            {communityName}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Date:</span>{' '}
            {new Date(createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Location:</span>{' '}
            {location}
          </p>
        </div>

        {/* Description */}
        <div className="text-gray-700 leading-relaxed mt-2">
          {/* Hashtags Line */}
          {hashtags.length > 0 && (
            <p className="text-cyan-500 font-medium mb-1">
              {hashtags.join(' ')}
            </p>
          )}
          {/* Description Text */}
          <p>
            {cleanDescription?.length > 150
              ? cleanDescription.slice(0, 150) + '...'
              : cleanDescription}
          </p>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-4">
          <button className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-cyan-500/30">
            RSVP / Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;