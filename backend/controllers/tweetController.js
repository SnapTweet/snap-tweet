const Tweet = require("../models/Tweet")

// Create a new Tweet (Only logged-in users)
exports.createTweet = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" }) // Ensure it blocks unauthorized requests
    }

    if (!req.body.content || req.body.content.trim() === "") {
      return res.status(400).json({ error: "Content is required" }) // Ensure empty tweets are rejected
    }

    const tweet = await Tweet.create({
      content: req.body.content,
      user: req.user.id,
    })

    res.status(201).json(tweet)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}
// Get all Tweets
exports.getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .populate("user", "username")
      .sort({ createdAt: -1 })
    res.json(tweets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Like a Tweet
exports.likeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
    if (!tweet) return res.status(404).json({ error: "Tweet not found" })

    if (tweet.likes.includes(req.user.id)) {
      tweet.likes = tweet.likes.filter(
        (userId) => userId.toString() !== req.user.id
      )
    } else {
      tweet.likes.push(req.user.id)
    }

    await tweet.save()
    res.json(tweet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete a Tweet (Only owner can delete)
exports.deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
    if (!tweet) return res.status(404).json({ error: "Tweet not found" })

    if (tweet.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You can only delete your own tweets" })
    }

    await tweet.deleteOne()
    res.json({ message: "Tweet deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
