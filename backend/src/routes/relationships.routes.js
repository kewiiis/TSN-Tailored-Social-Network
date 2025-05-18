import express from 'express';
import {
  addRelationship,
  getRelationships,
  getRecommendations
} from '../controllers/relationshipController.js';

const router = express.Router();

router.post('/', addRelationship);
router.get('/:user_id', getRelationships);
router.get('/:user_id/recommendations', getRecommendations);
router.delete('/', deleteRelationship);


export default router;
