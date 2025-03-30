const request = require("supertest")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const app = require("../../server")
const User = require("../../models/User")

jest.mock("../../models/User")
jest.mock("jsonwebtoken")

describe("Auth Controller - User Authentication", () => {
  let req, res, mockUser

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      },
    }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    mockUser = {
      _id: "67d73e21c093524a8079c3de",
      username: "testuser",
      email: "test@example.com",
      password: bcrypt.hashSync("password123", 10),
      comparePassword: jest.fn(),
    }
  })

  /** ✅ 1. Successful Login */
  it("✅ should return a JWT token on successful login", async () => {
    User.findOne.mockResolvedValue(mockUser)
    mockUser.comparePassword.mockResolvedValue(true)
    jwt.sign.mockReturnValue("mock_token")

    const loginRes = await request(app).post("/api/auth/login").send(req.body)

    expect(loginRes.status).toBe(200)
    expect(loginRes.body).toHaveProperty("token", "mock_token")
  })

  /** ❌ 2. Duplicate Email Error */
  it("❌ should return 400 for duplicate email on signup", async () => {
    User.findOne.mockResolvedValue(mockUser) // Simulate user already exists

    const signupRes = await request(app).post("/api/auth/signup").send(req.body)

    expect(signupRes.status).toBe(400)
    expect(signupRes.body).toHaveProperty("error", "Email already in use")
  })

  /** ❌ 3. Incorrect Password */
  it("❌ should return 401 for incorrect password on login", async () => {
    await request(app).post("/api/auth/signup").send({
      email: "test@example.com",
      username: "testuser",
      password: "password123",
    })

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword", // Invalid password
    })

    expect(loginRes.status).toBe(401)
    expect(loginRes.body).toHaveProperty("error", "Invalid credentials")
  })

  /** ❌ 4. Invalid JWT Token */
  it("❌ should return 401 for invalid JWT token during authentication", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer invalid_token`)
    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty("error", "Unauthorized")
  })
})
