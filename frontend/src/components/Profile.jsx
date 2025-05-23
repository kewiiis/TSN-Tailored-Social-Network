import React from 'react';

function Profile({ user }) {
  return (
    <div>
      <h2>👤 Mon profil</h2>
      <p><strong>Nom :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>ID utilisateur :</strong> {user.id}</p>
    </div>
  );
}

export default Profile;
