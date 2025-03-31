import request from "supertest";
import app from "../../src/server"; // Ensure `app` is exported as default from server.ts

let token: string;

beforeAll(async () => {
  // 🔥 Get a valid token by signing up & logging in
  await request(app).post("/api/auth/signup").send({
    username: "xtestuser",
    email: "xtest@example.com",
    password: "password123",
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "xtest@example.com",
    password: "password123",
  });

  token = loginRes.body.token as string; // 🔥 Save token for protected routes
  console.log("Token:", token); // 🔥 Log the token for debugging
});

describe("Tweet Routes - Integration Tests", () => {
  let tweetId: string;

  it("should create a tweet with a valid token", async () => {
    const res = await request(app)
      .post("/api/tweets")
      .set("Authorization", `Bearer ${token}`) // 🔥 Attach Token
      .send({ content: "Hello, Twitter!" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.content).toBe("Hello, Twitter!");
    tweetId = res.body._id as string;
  });

  it("❌ should return 401 if no token is provided", async () => {
    const res = await request(app)
      .post("/api/tweets")
      .send({ content: "Unauthorized Tweet" });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Unauthorized"); // ✅ Fix expected error message
  });
});
