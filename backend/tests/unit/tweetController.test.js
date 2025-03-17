const { createTweet } = require("../../controllers/tweetController")
const Tweet = require("../../models/Tweet")

jest.mock("../../models/Tweet")

describe("Tweet Controller - Create Tweet (Protected Route)", () => {
  let req, res

  beforeEach(() => {
    req = {
      headers: { authorization: "Bearer VALID_MOCKED_TOKEN" }, // Mock Token
      user: { id: "67d73e21c093524a8079c3de", username: "testuser" }, // Mock Authenticated User
      body: { content: "Hello world!" }, // Mock Request Body
    }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
  })

  it("✅ should create a tweet successfully", async () => {
    const mockTweet = {
      _id: "67d757be43cf1e57be3d6b73",
      content: req.body.content,
      user: { _id: req.user.id, username: req.user.username },
      createdAt: new Date().toISOString(),
      likes: [],
      populate: jest.fn().mockResolvedValue({
        // 👈 Mock populate()
        _id: "67d757be43cf1e57be3d6b73",
        content: req.body.content,
        user: { _id: req.user.id, username: req.user.username },
        createdAt: new Date().toISOString(),
        likes: [],
      }),
    }

    Tweet.create.mockResolvedValue(mockTweet)

    await createTweet(req, res)

    console.log("🚀 TEST: res.status Called With:", res.status.mock.calls)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: expect.any(String),
        content: req.body.content,
        user: expect.objectContaining({
          _id: expect.any(String),
          username: expect.any(String),
        }),
        createdAt: expect.any(String),
        likes: expect.any(Array),
      })
    )
  })
})
