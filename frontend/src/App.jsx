// ✅ Chemin : frontend/src/App.jsx
import { Auth } from './components/Auth';
import { PostList } from './components/PostList';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div>
      <h1>TSN - Tailored Social Network</h1>
      {!token ? <Auth /> : <PostList />}
    </div>
  );
}

export default App;
