import { Request, Response } from 'express';
import Tweet from '../models/Tweet';

interface CreateTweetRequest {
  content: string;
}

interface TweetParams {
  id: string;
}

// Create a new Tweet (Only logged-in users)
export const createTweet = async (
  req: Request<{}, {}, CreateTweetRequest>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' }); // Ensure it blocks unauthorized requests
      return;
    }

    if (!req.body.content || req.body.content.trim() === '') {
      res.status(400).json({ error: 'Content is required' }); // Ensure empty tweets are rejected
      return;
    }

    const tweet = await Tweet.create({
      content: req.body.content,
      user: req.user.id,
    });

    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all Tweets
export const getTweets = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const tweets = await Tweet.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json(tweets);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
};

export const likeTweet = async (
  req: Request<TweetParams>,
  res: Response
): Promise<void> => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      res.status(404).json({ error: 'Tweet not found' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (tweet.likes.includes(req.user.id)) {
      tweet.likes = tweet.likes.filter(
        (userId) => userId.toString() !== req.user?.id
      );
    } else {
      tweet.likes.push(req.user.id);
    }

    await tweet.save();
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTweet = async (
  req: Request<TweetParams>,
  res: Response
): Promise<void> => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      res.status(404).json({ error: 'Tweet not found' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (tweet.user.toString() !== req.user.id) {
      res.status(403).json({ error: 'Not authorized to delete this tweet' });
      return;
    }

    await tweet.deleteOne();
    res.json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
