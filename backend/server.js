const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const tweetRoutes = require("./routes/tweetRoutes")

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

connectDB() // Ensure this is mocked in tests

app.use("/api/auth", authRoutes)
app.use("/api", tweetRoutes)

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`))
}

module.exports = app // Ensure the app is exported for testing
