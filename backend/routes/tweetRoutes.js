const express = require("express")
const {
  createTweet,
  getTweets,
  likeTweet,
  deleteTweet,
} = require("../controllers/tweetController")
const { authMiddleware } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/tweets", authMiddleware, createTweet)
router.get("/tweets", getTweets)
router.post("/tweets/:id/like", authMiddleware, likeTweet)
router.delete("/tweets/:id", authMiddleware, deleteTweet)

module.exports = router
