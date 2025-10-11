import React from 'react';

const EventCard = ({ eventImage, eventTitle, organizer, dateTime, location, description, attendeesCount }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      maxWidth: '500px',
      margin: '20px auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff',
      overflow: 'hidden'
    }}>
      {eventImage && (
        <img src={eventImage} alt={eventTitle} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      )}
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '1.4rem', color: '#222' }}>{eventTitle}</h3>
        <p style={{ margin: '0 0 5px', fontWeight: '600', color: '#555' }}>Organized by {organizer}</p>
        <p style={{ margin: '0 0 10px', color: '#666', fontSize: '0.9rem' }}>
          <strong>Date & Time:</strong> {dateTime}
          <br />
          <strong>Location:</strong> {location}
        </p>
        <p style={{ color: '#444', fontSize: '1rem', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
          {description.length > 150 ? description.slice(0, 150) + '...' : description}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.9rem',
          color: '#555'
        }}>
          <span>{attendeesCount} attending</span>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#0073b1',
            border: 'none',
            borderRadius: '20px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            RSVP / Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
