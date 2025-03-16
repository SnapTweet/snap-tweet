const jwt = require("jsonwebtoken")

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization")
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" })

  const token = authHeader.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Unauthorized" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Attach user data to request
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}
