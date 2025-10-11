import React from 'react';

const SmallProfile = ({ profilePic, username, bio }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      maxWidth: '300px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff',
      cursor: 'pointer'
    }}>
      <img
        src={profilePic}
        alt={`${username} profile`}
        style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover' }}
      />
      <div style={{ overflow: 'hidden' }}>
        <strong style={{ display: 'block', fontSize: '16px', marginBottom: '4px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {username}
        </strong>
        <span style={{ fontSize: '12px', color: '#666', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>
          {bio}
        </span>
      </div>
    </div>
  );
};

export default SmallProfile;
