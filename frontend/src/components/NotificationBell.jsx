import React, { useEffect, useState } from 'react';

function NotificationBell({ userId }) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = () => {
      fetch(`http://localhost:5000/api/messages/unread/${userId}`)
        .then(res => res.json())
        .then(data => setUnreadCount(data.unreadCount))
        .catch(err => console.error("❌ Erreur notif :", err));
    };

    fetchUnread(); // première récupération

    const interval = setInterval(fetchUnread, 5000); // puis toutes les 5s
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div style={{ position: 'relative', fontSize: '1.5rem' }}>
      <span role="img" aria-label="Notifications">🔔</span>
      {unreadCount > 0 && (
        <span style={{
          position: 'absolute',
          top: -8,
          right: -8,
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '2px 6px',
          fontSize: '0.75rem'
        }}>
          {unreadCount}
        </span>
      )}
    </div>
  );
}

export default NotificationBell;
