const express = require("express")
const {
  signup,
  login,
  getCurrentUser,
} = require("../controllers/authController")
const { authMiddleware } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/me", authMiddleware, getCurrentUser) // Protected Route

module.exports = router
