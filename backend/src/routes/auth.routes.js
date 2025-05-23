import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { validateLogin, validateRegister } from '../middlewares/validators.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, (req, res, next) => {
  console.log("🛠️ Requête POST /api/auth/login reçue !");
  next();
}, loginUser);
export default router;
