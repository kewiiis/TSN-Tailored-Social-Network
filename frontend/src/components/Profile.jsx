import React, { useState } from 'react';
import Recommendations from './Recommendations';


function Profile({ user }) {
    const [reloadFlag, setReloadFlag] = useState(false);

  return (
    <div>
      <h2>👤 Mon profil</h2>
      <p><strong>Nom :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>ID utilisateur :</strong> {user.id}</p>
      <Recommendations userId={user.id} onFriendAdded={() => setReloadFlag(!reloadFlag)} />

    </div>
  );
}

export default Profile;
