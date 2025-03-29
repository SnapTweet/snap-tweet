import express, { Router } from 'express';
import {
  createTweet,
  deleteTweet,
  getTweets,
  likeTweet,
} from '../controllers/tweetController';
import { authMiddleware } from '../middleware/authMiddleware';

const router: Router = express.Router();

router.post('/tweets', authMiddleware, createTweet);
router.get('/tweets', getTweets);
router.post(
  '/tweets/:id/like',
  authMiddleware,
  likeTweet as unknown as express.RequestHandler
);
router.delete(
  '/tweets/:id',
  authMiddleware,
  deleteTweet as unknown as express.RequestHandler
);

export default router;
