import React, { useState } from 'react';
import Profile from './Profile';

function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative', textAlign: 'right' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: '#1a73e8',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '20px',
          cursor: 'pointer'
        }}
      >
        {user.name} ⌄
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '100%',
          background: '#fff',
          border: '1px solid #ddd',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          borderRadius: '8px',
          width: '260px',
          zIndex: 10,
          marginTop: '10px',
          padding: '12px'
        }}>
          <Profile user={user} />
          <button onClick={onLogout} style={{ marginTop: '10px', width: '100%' }}>
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
