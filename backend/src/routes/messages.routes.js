import express from 'express';
import {
  getMessagesBetweenUsers,
  sendMessage,
  getUnreadMessages,
  markMessagesAsRead 
} from '../controllers/messageController.js';

const router = express.Router();

// ⚠️ Mettre les routes spécifiques AVANT les routes dynamiques
router.get('/unread/:userId', getUnreadMessages);
router.get('/:userId1/:userId2', getMessagesBetweenUsers);
router.post('/', sendMessage);
router.put('/read/:userId1/:userId2', markMessagesAsRead);


export default router;
