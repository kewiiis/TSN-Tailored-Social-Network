import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import Profile from './components/Profile';
import FriendsList from './components/FriendsList';
import Chat from './components/Chat';
import AuthBox from './components/AuthBox';


function App() {
  const [user, setUser] = useState(null);
  const [friendUpdateFlag, setFriendUpdateFlag] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

    if (!user) {
      return <AuthBox onLogin={setUser} />;
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
                <FriendsList userId={user.id} refreshFlag={friendUpdateFlag} />
              </>
            }
          />
          <Route
            path="/messagerie"
            element={
              <Chat currentUserId={user.id} />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
