import React, { useEffect, useState } from 'react';

function PostList({ currentUserId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('❌ Erreur chargement posts :', err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(() => setPosts(posts.filter(p => p.id !== id)))
      .catch(err => console.error('Erreur suppression post :', err));
  };

  const handleEdit = (id) => {
    const content = prompt("Modifier le contenu :");
    if (!content) return;

    fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ content })
    })
      .then(() => window.location.reload())
      .catch(err => console.error('Erreur modification :', err));
  };

  return (
    <div>
      <h2>Fil d’actualité</h2>
      {posts.map(post => (
        <div key={post.id} className="box">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p><strong>{post.author_name}</strong> : {post.content}</p>
            {post.author_id === currentUserId && (
              <details>
                <summary style={{ cursor: 'pointer' }}>⋮</summary>
                <div>
                  <button onClick={() => handleEdit(post.id)}>✏️ Modifier</button>
                  <button onClick={() => handleDelete(post.id)}>🗑️ Supprimer</button>
                </div>
              </details>
            )}
          </div>
          <p style={{ fontSize: '0.8em', color: '#666' }}>{new Date(post.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
