import React, { useState, useEffect } from 'react';
import Recommendations from './components/Recommendations';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Vérifie si un user est déjà connecté
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div>
      <h1>TSN - Réseau Social</h1>
      {user ? (
        <>
          <p>👋 Bienvenue, {user.name}</p>
          <Recommendations userId={user.id} />
        </>
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
