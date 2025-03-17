const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const dotenv = require("dotenv")

const authRoutes = require("./routes/authRoutes")
const tweetRoutes = require("./routes/tweetRoutes")

dotenv.config() // Load environment variables from .env file

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)
app.use("/api", tweetRoutes)

// Only start server if not running inside Jest
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`))
}

module.exports = app // Export for Supertest
