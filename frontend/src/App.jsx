// ✅ Chemin : frontend/src/App.jsx

import React from 'react';
import Recommendations from './components/Recommendations';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <div>
      <h1>TSN - Réseau Social</h1>
      <Recommendations userId={1} />
      <hr />
      <FriendsList userId={1} />
    </div>
  );
}

export default App;
