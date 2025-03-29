import connectDB from "../../src/config/db";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("Database Connection", () => {
  it(`✅ should connect to MongoDB successfully ${process.env.MONGO_URI}`, async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce("Connected");
    await connectDB();
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
  });

  it("❌ should handle MongoDB connection error", async () => {
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(
      new Error("DB connection failed")
    );
    await expect(connectDB()).rejects.toThrow("DB connection failed");
  });
});
