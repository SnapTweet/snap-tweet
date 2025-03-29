import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import app from "../../src/server";
import User, { IUser } from "../../src/models/User";

jest.mock("../../src/models/User");
jest.mock("jsonwebtoken");

describe("Auth Controller - User Authentication", () => {
  let req: { body: { username: string; email: string; password: string } };
  let res: { status: jest.Mock; json: jest.Mock };
  let mockUser: IUser & { comparePassword: jest.Mock };

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    mockUser = {
      _id: "67d73e21c093524a8079c3de",
      username: "testuser",
      email: "test@example.com",
      password: bcrypt.hashSync("password123", 10),
      comparePassword: jest.fn(),
    } as IUser & { comparePassword: jest.Mock };
  });

  /** ✅ 1. Successful Login */
  it("✅ should return a JWT token on successful login", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    mockUser.comparePassword.mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mock_token");

    const loginRes = await request(app).post("/api/auth/login").send(req.body);

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty("token", "mock_token");
  });

  /** ❌ 2. Duplicate Email Error */
  it("❌ should return 400 for duplicate email on signup", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser); // Simulate user already exists

    const signupRes = await request(app)
      .post("/api/auth/signup")
      .send(req.body);

    expect(signupRes.status).toBe(400);
    expect(signupRes.body).toHaveProperty("error", "Email already in use");
  });

  /** ❌ 3. Incorrect Password */
  it("❌ should return 401 for incorrect password on login", async () => {
    await request(app).post("/api/auth/signup").send({
      email: "test@example.com",
      username: "testuser",
      password: "password123",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword", // Invalid password
    });

    expect(loginRes.status).toBe(401);
    expect(loginRes.body).toHaveProperty("error", "Invalid credentials");
  });
});
