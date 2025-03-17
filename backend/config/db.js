const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    // 🔥 Suppress logs in test mode
    if (process.env.NODE_ENV !== "test") {
      console.log("✅ MongoDB Connected")
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error)
    process.exit(1)
  }
}

module.exports = connectDB
