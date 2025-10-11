import React from 'react';

const EventsSection = ({ events }) => (
  <div
    style={{
      maxWidth: 400,
      minWidth: 300,
      margin: '20px auto',
      fontFamily: 'Arial',
      border: '1px solid #ddd',
      borderRadius: '6px',
      padding: '10px',
      backgroundColor: '#fff',
    }}
  >
    {events.map(({ eventTitle, dateTime, location }, i) => (
      <div
        key={i}
        style={{
          borderBottom: '1px solid #ddd',
          padding: '8px 0',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
        }}
      >
        <span
          style={{
            flex: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {eventTitle}
        </span>
        <span style={{ flex: 1, textAlign: 'right', marginLeft: 10 }}>
          {dateTime}
        </span>
        <span
          style={{
            flex: 1,
            textAlign: 'right',
            marginLeft: 10,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {location}
        </span>
      </div>
    ))}
  </div>
);

export default EventsSection;
