import React from 'react';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';

const events = [
  {
    eventImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    eventTitle: 'Tech Innovators Meetup 2025',
    organizer: 'NextGen Tech Community',
    dateTime: 'October 25, 2025, 6:00 PM - 9:00 PM',
    location: '123 Innovation Drive, Silicon Valley, CA',
    description: 'Join industry leaders and tech enthusiasts for an inspiring evening of talks, networking, and innovation showcases. Refreshments and swag included!',
    attendeesCount: 132,
  },
  {
    eventImage: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=800&q=80',
    eventTitle: 'AI & Machine Learning Conference',
    organizer: 'AI World Association',
    dateTime: 'November 10, 2025, 9:00 AM - 5:00 PM',
    location: 'Virtual Online Conference',
    description: 'A full-day event dedicated to advances in AI research, applications, and ethical issues. Network with experts worldwide.',
    attendeesCount: 276,
  },
  {
    eventImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    eventTitle: 'Startup Pitch Night',
    organizer: 'VentureHub',
    dateTime: 'December 5, 2025, 7:00 PM - 10:00 PM',
    location: 'Downtown Co-working Space',
    description: 'Pitch your startup idea to an audience of investors and mentors. Win prizes and gain valuable exposure.',
    attendeesCount: 89,
  },
];

const EventsPage = () => {
  return (
    <div>
    <Navbar />
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-10 font-sans">
        Upcoming Events
      </h1>
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, idx) => (
          <EventCard key={idx} {...event} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default EventsPage;
