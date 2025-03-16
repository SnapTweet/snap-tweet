const User = require("../models/User")
const jwt = require("jsonwebtoken")

// Signup
exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )
  res.json({ token })
}

// Get Current Logged-in User (Protected)
exports.getCurrentUser = async (req, res) => {
  try {
    res.json({ id: req.user.id, username: req.user.username })
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}
