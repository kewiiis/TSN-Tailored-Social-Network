// ✅ Chemin : frontend/src/components/PostList.jsx
import { useEffect, useState } from 'react';
import { getPosts, createPost } from '../services/posts';
import { PostCard } from './PostCard';

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await getPosts();
      setPosts(data);
    } catch (err) {
      setError('Erreur lors du chargement des posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newContent.trim()) return alert("Le contenu ne peut pas être vide.");
    try {
      await createPost(newContent);
      setNewContent('');
      fetchPosts();
    } catch (err) {
      alert("Erreur lors de la création du post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>

      <div>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Écrivez un nouveau post"
        />
        <button onClick={handleCreate}>Publier</button>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {posts.map(post => (
        <PostCard key={post.id} post={post} onUpdate={fetchPosts} />
      ))}
    </div>
  );
};
