import React from 'react';
import { Link } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import './Layout.css';

function Layout({ user, onLogout, children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1 style={{ margin: 0 }}>TSN</h1>
        {user && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <NotificationBell userId={user.id} />
            <Link to="/">Accueil</Link>
            <Link to="/profil">Profil</Link>
            <Link to="/messagerie">Messagerie</Link>
            <button onClick={onLogout}>Déconnexion</button>
          </nav>
        )}
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        © 2025 TSN - Projet académique réalisé par kelyan.
      </footer>
    </div>
  );
}

export default Layout;
