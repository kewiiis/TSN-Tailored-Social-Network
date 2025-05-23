// ✅ Chemin : frontend/src/components/PostForm.jsx

import React, { useState } from 'react';

function PostForm({ userId, onPostCreated }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ content })
    })
      .then((res) => res.json())
      .then(() => {
        setContent('');
        onPostCreated();
      })
      .catch((err) => console.error('Erreur création post :', err));
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <h2>Créer un post</h2>
      <textarea
        placeholder="Exprime-toi..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="3"
      />
      <button type="submit">Publier</button>
    </form>
  );
}

export default PostForm;
