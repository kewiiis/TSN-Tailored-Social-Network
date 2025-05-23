// ✅ frontend/src/components/PostItem.jsx
import React, { useState } from 'react';

function PostItem({ post, currentUserId, onRefresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    if (!window.confirm('Supprimer ce post ?')) return;
    await fetch(`http://localhost:5000/api/posts/${post.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    onRefresh();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    setIsEditing(false);
    onRefresh();
  };

  return (
    <li>
      <strong>{post.author_name}</strong>{' '}
      {isEditing ? (
        <form onSubmit={handleUpdate} style={{ display: 'inline' }}>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Enregistrer</button>
          <button onClick={() => setIsEditing(false)}>Annuler</button>
        </form>
      ) : (
        <>
          : {post.content}
          {post.user_id === currentUserId && (
            <>
              {' '}
              <button onClick={() => setIsEditing(true)}>Modifier</button>
              <button onClick={handleDelete}>Supprimer</button>
            </>
          )}
        </>
      )}
      <br />
      <small>{new Date(post.created_at).toLocaleString()}</small>
    </li>
  );
}

export default PostItem;
