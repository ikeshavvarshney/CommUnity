import React from 'react';

const EventsSection = ({ events }) => (
  <div className="max-w-xs min-w-[300px] mx-auto my-2 font-sans border border-gray-300 rounded-md p-4 bg-white">
    {events.map(({ title, description, location }, i) => (
      <div key={i} className="border-b border-gray-300 py-3 flex flex-col gap-1">
        <span className="font-semibold text-md text-gray-800 truncate">
          {title}
        </span>
        <div className="flex justify-between text-gray-600 text-xs font-medium">
          <span className="truncate">{description}</span>
          <span className="truncate">{location}</span>
        </div>
      </div>
    ))}
  </div>
);

export default EventsSection;
