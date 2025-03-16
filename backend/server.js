require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const tweetRoutes = require("./routes/tweetRoutes")

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.use("/api", tweetRoutes)

app.get("/api/hello", (req, res) => {
  res.json({ message: "Snap-tweet says from Express API!" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`))
