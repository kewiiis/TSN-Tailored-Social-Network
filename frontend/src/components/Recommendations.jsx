// ✅ Chemin : frontend/src/components/Recommendations.jsx

import React, { useEffect, useState } from 'react';

function Recommendations({ userId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/relationships/${userId}/recommendations`)
      .then((res) => res.json())
      .then((data) => setRecommendations(data))
      .catch((err) => console.error('Erreur de chargement des recommandations :', err));
  }, [userId]);

  const handleAddFriend = (friendId) => {
    fetch('http://localhost:5000/api/relationships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        friend_id: friendId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Échec de l’ajout');
        setRecommendations((prev) =>
          prev.filter((user) => user.id !== friendId)
        );
        setMessage("✅ Ami ajouté !");
        setTimeout(() => setMessage(''), 3000); // efface le message au bout de 3 sec
      })
      .catch((err) => console.error('❌ Erreur ajout ami :', err));
  };

  return (
    <div>
      <h2>Suggestions d'amis</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {recommendations.length === 0 ? (
        <p>Aucune suggestion pour le moment.</p>
      ) : (
        <ul>
          {recommendations.map((user) => (
            <li key={user.id}>
              👤 {user.name} — {user.email} ({user.mutual_count} ami{user.mutual_count > 1 ? 's' : ''} en commun)
              <button
                style={{ marginLeft: '10px' }}
                onClick={() => handleAddFriend(user.id)}
              >
                Ajouter
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recommendations;
