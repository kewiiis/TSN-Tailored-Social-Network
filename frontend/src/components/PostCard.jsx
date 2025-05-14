// frontend/src/components/PostCard.jsx
export const PostCard = ({ post }) => (
  <div>
    <h3>{post.author.name}</h3>
    <p>{post.content}</p>
  </div>
);