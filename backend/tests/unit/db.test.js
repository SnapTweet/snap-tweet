const connectDB = require("../../config/db")
const mongoose = require("mongoose")

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}))

describe("Database Connection", () => {
  it("✅ should connect to MongoDB successfully", async () => {
    mongoose.connect.mockResolvedValueOnce("Connected")
    await connectDB()
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI)
  })

  it("❌ should handle MongoDB connection error", async () => {
    mongoose.connect.mockRejectedValueOnce(new Error("DB connection failed"))
    await expect(connectDB()).rejects.toThrow("DB connection failed")
  })
})
