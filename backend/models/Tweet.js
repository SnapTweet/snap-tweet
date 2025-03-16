const mongoose = require("mongoose")

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Tweet cannot be empty"],
    maxlength: [280, "Tweet cannot exceed 280 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Tweet", tweetSchema)
