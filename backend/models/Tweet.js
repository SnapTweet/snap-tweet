const mongoose = require("mongoose")

const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 280 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the tweet
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Tweet", tweetSchema)
