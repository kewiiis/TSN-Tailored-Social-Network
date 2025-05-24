import React, { useEffect, useState } from 'react';

function PostList({ currentUserId }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/posts', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Échec du chargement des posts (403 ? token manquant ?)');
        }
        return res.json();
      })
      .then(data => setPosts(data))
      .catch(err => {
        console.error('❌ Erreur chargement posts :', err);
        setError('Impossible de charger les posts. Veuillez vous reconnecter.');
        setPosts([]); // pour éviter crash
      });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => setPosts(posts.filter(p => p.id !== id)))
      .catch(err => console.error('Erreur suppression post :', err));
  };

  const handleEdit = (id) => {
    const content = prompt("Modifier le contenu :");
    if (!content) return;

    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    })
      .then(() => window.location.reload())
      .catch(err => console.error('Erreur modification :', err));
  };

  return (
    <div>
      <h2>Fil d’actualité</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="box">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p><strong>{post.author_name}</strong> : {post.content}</p>
                <p style={{ fontSize: '0.8em', color: '#666' }}>
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>

              {post.author_id === currentUserId && (
                <details style={{ position: 'relative' }}>
                  <summary style={{ cursor: 'pointer', fontSize: '1.2em' }}>⋮</summary>
                  <div style={{ position: 'absolute', right: 0, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                    <button onClick={() => handleEdit(post.id)} style={{ display: 'block', width: '100%' }}>✏️ Modifier</button>
                    <button onClick={() => handleDelete(post.id)} style={{ display: 'block', width: '100%', color: 'red' }}>🗑️ Supprimer</button>
                  </div>
                </details>
              )}
            </div>
          </div>
        ))
      ) : (
        !error && <p>Aucun post disponible.</p>
      )}
    </div>
  );
}

export default PostList;
