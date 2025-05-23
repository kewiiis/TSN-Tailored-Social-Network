import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

function Layout({ user, onLogout, children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>TSN</h1>
        <nav>
          {user ? (
            <>
              <Link to="/">Accueil</Link>
              <Link to="/profil">Profil</Link>
              <button onClick={onLogout}>Déconnexion</button>
            </>
          ) : null}
        </nav>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        © 2025 TSN - Projet académique réalisé par Joël.
      </footer>
    </div>
  );
}

export default Layout;
