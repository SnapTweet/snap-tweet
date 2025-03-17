const request = require("supertest")
const app = require("../../server")
const { connectTestDB, closeTestDB } = require("../../config/testDB")

let token

beforeAll(async () => {
  await connectTestDB()

  // 🔥 Get a valid token by signing up & logging in
  await request(app).post("/api/auth/signup").send({
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  })

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "password123",
  })

  token = loginRes.body.token // 🔥 Save token for protected routes
})

afterAll(async () => {
  await closeTestDB()
})

describe("Tweet Routes - Integration Tests", () => {
  let tweetId

  it("should create a tweet with a valid token", async () => {
    const res = await request(app)
      .post("/api/tweets")
      .set("Authorization", `Bearer ${token}`) // 🔥 Attach Token
      .send({ content: "Hello, Twitter!" })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("_id")
    expect(res.body.content).toBe("Hello, Twitter!")
    tweetId = res.body._id
  })

  it("❌ should return 401 if no token is provided", async () => {
    const res = await request(app)
      .post("/api/tweets")
      .send({ content: "Unauthorized Tweet" })

    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty("error", "Unauthorized") // ✅ Fix expected error message
  })
})
