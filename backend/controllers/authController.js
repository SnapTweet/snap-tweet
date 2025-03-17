const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )
}

// Signup
exports.signup = async (req, res) => {
  try {
    const { email, username, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" })
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    })

    const token = generateToken(newUser)
    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = generateToken(user)

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

// Get Current Logged-in User (Protected)
exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    res.json({ id: req.user.id, username: req.user.username })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}
