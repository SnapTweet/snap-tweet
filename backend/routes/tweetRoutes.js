const express = require("express")
const {
  createTweet,
  getTweets,
  getTweetById,
  deleteTweet,
} = require("../controllers/tweetController")
const router = express.Router()

router.post("/tweets", createTweet)
router.get("/tweets", getTweets)
router.get("/tweets/:id", getTweetById)
router.delete("/tweets/:id", deleteTweet)

module.exports = router
