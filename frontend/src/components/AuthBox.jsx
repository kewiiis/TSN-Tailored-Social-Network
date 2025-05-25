import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './AuthBox.css';

function AuthBox({ onLogin }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="auth-box-container">
      <h2>{flipped ? 'Bienvenue sur notre réseau social!! Prêt à poster?' : 'Nouvelle journée, nouveau post'}</h2>

      <div className={`auth-box ${flipped ? 'flipped' : ''}`}>
        <div className="auth-box-inner">
          <div className="auth-front">
            <Login onLogin={onLogin} />
            <button className="switch-btn" onClick={() => setFlipped(true)}>
              Je n'ai pas encore de compte
            </button>
          </div>
          <div className="auth-back">
            <Register onRegister={onLogin} />
            <button className="switch-btn" onClick={() => setFlipped(false)}>
              J'ai déjà un compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthBox;
