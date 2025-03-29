import express, { Router } from 'express';
import { getCurrentUser, login, signup } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router: Router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser); // Protected Route

export default router;
