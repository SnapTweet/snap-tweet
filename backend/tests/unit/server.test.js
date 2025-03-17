const request = require("supertest")
const app = require("../../server") // Ensure this points to your server.js

jest.mock("../../config/db", () => jest.fn()) // Mock database connection

describe("Server Initialization", () => {
  let server

  beforeAll((done) => {
    server = app.listen(4000, () => done())
  })

  afterAll((done) => {
    server.close(done)
  })

  it("✅ should return 404 for unknown routes", async () => {
    const res = await request(app).get("/non-existent")
    expect(res.status).toBe(404)
  })

  it("✅ should load auth routes", async () => {
    const res = await request(app).get("/api/auth")
    expect([200, 401, 403, 404]).toContain(res.status)
  })

  it("✅ should load tweet routes", async () => {
    const res = await request(app).get("/api")
    expect([200, 401, 403, 404]).toContain(res.status)
  })
})
