import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err))

// Simple API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Rishi says from Express API!" })
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`))
