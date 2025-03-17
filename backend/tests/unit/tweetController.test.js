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
    token = jwt.sign(
      { id: "67d73e21c093524a8079c3de", username: "testuser" },
      "mock_secret"
    )

    req = {
      headers: { authorization: `Bearer ${token}` },
      user: { id: "67d73e21c093524a8079c3de", username: "testuser" },
      body: { content: "Hello world!" },
      params: { id: "67d757be43cf1e57be3d6b73" }, // Mock tweet ID
    }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: "67d73e21c093524a8079c3de", username: "testuser" })
    })
  })

  it("✅ should create a tweet successfully", async () => {
    const mockTweet = {
      _id: req.params.id,
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
    req.headers.authorization = null
    req.user = null

    await createTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" })
  })

  it("❌ should return 400 if tweet content is empty", async () => {
    req.body.content = ""

    await createTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: "Content is required" })
  })

  it("❌ should return 500 if database fails while creating a tweet", async () => {
    Tweet.create.mockRejectedValue(new Error("Database Error"))

    await createTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" })
  })

  it("❌ should return 404 if tweet does not exist when liking", async () => {
    Tweet.findById.mockResolvedValue(null)

    await likeTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: "Tweet not found" })
  })

  it("❌ should return 403 if user is not the owner when deleting", async () => {
    const mockTweet = { _id: req.params.id, user: "DIFFERENT_USER_ID" }
    Tweet.findById.mockResolvedValue(mockTweet)

    await deleteTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      error: "Unauthorized: You can only delete your own tweets",
    })
  })

  it("❌ should return 400 if no content provided in tweet", async () => {
    req.body.content = ""
    await createTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: "Content is required" })
  })

  it("❌ should return 500 if database error occurs during tweet creation", async () => {
    Tweet.create.mockRejectedValue(new Error("DB error"))
    await createTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" })
  })

  it("❌ should return 404 if tweet does not exist when liking", async () => {
    Tweet.findById.mockResolvedValue(null) // Simulate tweet not found
    await likeTweet(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: "Tweet not found" })
  })

  it("❌ should return 404 when trying to delete a non-existent tweet", async () => {
    Tweet.findById.mockResolvedValue(null) // Simulate tweet not found

    await deleteTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: "Tweet not found" })
  })

  it("❌ should return 500 if database error occurs during tweet deletion", async () => {
    Tweet.findById.mockResolvedValue({ _id: req.params.id, user: req.user.id })
    Tweet.prototype.deleteOne = jest
      .fn()
      .mockRejectedValue(new Error("DB error"))

    await deleteTweet(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      error: "tweet.deleteOne is not a function",
    })
  })

  it("✅ should unlike a tweet if already liked", async () => {
    const mockTweet = {
      _id: req.params.id,
      likes: [req.user.id],
      save: jest.fn().mockResolvedValue(true),
    }

    Tweet.findById.mockResolvedValue(mockTweet)

    await likeTweet(req, res)

    expect(mockTweet.likes).toHaveLength(0) // User should be removed from likes
    expect(res.json).toHaveBeenCalledWith(mockTweet)
  })
})
