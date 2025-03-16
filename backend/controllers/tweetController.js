const Tweet = require("../models/Tweet")

// Create a new Tweet
exports.createTweet = async (req, res) => {
  try {
    const tweet = await Tweet.create(req.body)
    res.status(201).json(tweet)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get all Tweets
exports.getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 })
    res.json(tweets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a single Tweet by ID
exports.getTweetById = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
    if (!tweet) return res.status(404).json({ error: "Tweet not found" })
    res.json(tweet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete a Tweet
exports.deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findByIdAndDelete(req.params.id)
    if (!tweet) return res.status(404).json({ error: "Tweet not found" })
    res.json({ message: "Tweet deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
