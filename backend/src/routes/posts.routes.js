import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from '../controllers/postController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validatePost } from '../middlewares/validators.js';

const router = express.Router();

router.get('/', authenticateToken, getAllPosts);
router.post('/', authenticateToken, validatePost, createPost);
router.put('/:id', authenticateToken, validatePost, updatePost);
router.delete('/:id', authenticateToken, deletePost);

export default router;
