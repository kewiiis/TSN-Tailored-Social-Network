import React, { useState } from 'react';

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erreur lors de l’inscription');

      setMessage('✅ Compte créé avec succès !');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (onRegister) onRegister(data.user);

    } catch (err) {
      console.error('❌ Erreur inscription :', err);
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Nom :</label><br />
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email :</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mot de passe :</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">S’inscrire</button>
      </form>
    </div>
  );
}

export default Register;
