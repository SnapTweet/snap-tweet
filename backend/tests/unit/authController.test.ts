import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import app from "../../src/server";
import User, { IUser } from "../../src/models/User";
import { getCurrentUser } from "../../src/controllers/authController";

jest.mock("../../src/models/User");
jest.mock("jsonwebtoken");

describe("Auth Controller - User Authentication", () => {
  let mockUser: IUser & { comparePassword: jest.Mock };

  beforeEach(() => {
    mockUser = {
      _id: "67d73e21c093524a8079c3de",
      username: "testuser",
      email: "test@example.com",
      password: bcrypt.hashSync("password123", 10),
      comparePassword: jest.fn(),
    } as IUser & { comparePassword: jest.Mock };

    jest.clearAllMocks();
  });

  /** ✅ Successful Signup */
  it("✅ should return 201 and token on successful signup", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue(mockUser);
    (jwt.sign as jest.Mock).mockReturnValue("mock_token");

    const res = await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token", "mock_token");
  });

  /** ❌ Duplicate Email Error on Signup */
  it("❌ should return 400 for duplicate email on signup", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Email already in use");
  });

  /** ❌ Internal error on Signup */
  it("❌ should return 500 if signup throws an error", async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error", "Internal server error");
  });

  /** ✅ Successful Login */
  it("✅ should return a JWT token on successful login", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    mockUser.comparePassword.mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mock_token");

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token", "mock_token");
  });

  /** ❌ Invalid email on login */
  it("❌ should return 401 if user not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app).post("/api/auth/login").send({
      email: "notfound@example.com",
      password: "password123",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });

  /** ❌ Incorrect password */
  it("❌ should return 401 for incorrect password", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    mockUser.comparePassword.mockResolvedValue(false);

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpass",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });

  /** ❌ Internal error on login */
  it("❌ should return 500 if login throws an error", async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error", "Internal server error");
  });
});

describe("Auth Controller - getCurrentUser", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("✅ should return user if found", async () => {
    const req = { user: { id: "123" } } as any;
    (User.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ email: "test@example.com" }),
    });

    await getCurrentUser(req, res as any);

    expect(res.json).toHaveBeenCalledWith({ email: "test@example.com" });
  });

  it("❌ should return 404 if user not found", async () => {
    const req = { user: { id: "123" } } as any;
    (User.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    await getCurrentUser(req, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("❌ should return 500 on error", async () => {
    const req = { user: { id: "123" } } as any;
    (User.findById as jest.Mock).mockImplementation(() => {
      throw new Error("DB fail");
    });

    await getCurrentUser(req, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });
});
