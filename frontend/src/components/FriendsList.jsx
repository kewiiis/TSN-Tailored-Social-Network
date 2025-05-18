// ✅ Chemin : frontend/src/components/FriendsList.jsx

import React, { useEffect, useState } from 'react';

function FriendsList({ userId }) {
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/relationships/${userId}`)
      .then((res) => res.json())
      .then((data) => setFriends(data))
      .catch((err) => console.error('❌ Erreur chargement amis :', err));
  }, [userId]);

  const handleRemoveFriend = (friendId) => {
    fetch(`http://localhost:5000/api/relationships`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        friend_id: friendId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur suppression');
        setFriends((prev) => prev.filter((f) => f.id !== friendId));
        setMessage("❌ Ami supprimé.");
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((err) => console.error('Erreur suppression ami :', err));
  };

  return (
    <div>
      <h2>Mes amis</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <ul>
        {friends.length === 0 ? (
          <li>Aucun ami.</li>
        ) : (
          friends.map((user) => (
            <li key={user.id}>
              👤 {user.name} — {user.email}
              <button style={{ marginLeft: '10px' }} onClick={() => handleRemoveFriend(user.id)}>
                Supprimer
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default FriendsList;
