import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import Profile from './components/Profile';
import FriendsList from './components/FriendsList';
import Recommendations from './components/Recommendations';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (!user) {
    return (
      <div className="auth-wrapper">
        <h2>Bienvenue sur TSN</h2>
        <Login onLogin={setUser} />
        <Register onRegister={setUser} />
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PostForm userId={user.id} onPostCreated={() => window.location.reload()} />
                <PostList currentUserId={user.id} />
              </>
            }
          />
          <Route
            path="/profil"
            element={
              <>
                <Profile user={user} />
                <FriendsList userId={user.id} />
                <Recommendations userId={user.id} />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
