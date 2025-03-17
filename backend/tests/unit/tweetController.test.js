const jwt = require("jsonwebtoken")
const {
  createTweet,
  likeTweet,
  deleteTweet,
} = require("../../controllers/tweetController")
const Tweet = require("../../models/Tweet")

jest.mock("../../models/Tweet")
jest.mock("jsonwebtoken") // Mock JWT

describe("Tweet Controller - Create Tweet (Protected Route)", () => {
  let req, res, token

  beforeEach(() => {
    // 🔥 Generate Dynamic Token Before Each Test
    token = jwt.sign(
      { id: "67d73e21c093524a8079c3de", username: "testuser" },
      "mock_secret"
    )

    req = {
      headers: { authorization: `Bearer ${token}` }, // Use Dynamic Token
      user: { id: "67d73e21c093524a8079c3de", username: "testuser" },
      body: { content: "Hello world!" },
    }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    // ✅ Mock JWT Verification
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: "67d73e21c093524a8079c3de", username: "testuser" })
    })
  })

  it("✅ should create a tweet successfully", async () => {
    const mockTweet = {
      _id: "67d757be43cf1e57be3d6b73",
      content: req.body.content,
      user: { _id: req.user.id, username: req.user.username },
      createdAt: new Date().toISOString(),
      likes: [],
    }

    Tweet.create.mockResolvedValue(mockTweet)

    await createTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ _id: expect.any(String) })
    )
  })

  it("❌ should return 401 if no token is provided", async () => {
    req.headers.authorization = null // Remove authorization header
    req.user = null // Simulate unauthenticated request

    await createTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" }) // ✅ Fix expected error message
  })

  it("❌ should return 400 if tweet content is empty", async () => {
    req.body.content = "" // Empty content
    await createTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: "Content is required" }) // ✅ Fix expected error message
  })
})
