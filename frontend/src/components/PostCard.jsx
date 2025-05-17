// ✅ Chemin : frontend/src/components/PostCard.jsx
import { useState } from 'react';
import { updatePost, deletePost } from '../services/posts';

export const PostCard = ({ post, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);

  const handleUpdate = async () => {
    try {
      await updatePost(post.id, content);
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await deletePost(post.id);
      onUpdate();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: 10, marginBottom: 10 }}>
      {isEditing ? (
        <>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={handleUpdate}>💾 Enregistrer</button>
          <button onClick={() => setIsEditing(false)}>❌ Annuler</button>
        </>
      ) : (
        <>
          <p>{post.content}</p>
          <button onClick={() => setIsEditing(true)}>✏️ Modifier</button>
          <button onClick={handleDelete}>🗑️ Supprimer</button>
        </>
      )}
    </div>
  );
};
