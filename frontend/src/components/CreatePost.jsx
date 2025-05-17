// frontend/src/components/CreatePost.jsx
import { useState } from 'react';
import { api } from '../services/api';

export const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Le contenu ne peut pas être vide');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/posts', { content });
      onPostCreated(response.data);
      setContent('');
    } catch (err) {
      setError('Erreur lors de la création du post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Écris ton post ici..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Publication...' : 'Publier'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};
