// ✅ Chemin : backend/src/server.js

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/posts.routes.js';
import relationshipRoutes from './routes/relationships.routes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Serveur backend en écoute sur http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API backend TSN fonctionne !');
});

app.use('/api/relationships', relationshipRoutes);
