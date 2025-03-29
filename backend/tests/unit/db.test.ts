import connectDB from "../../src/config/db";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables (useful for local tests)
dotenv.config();

// Mock mongoose.connect method to avoid using a real DB in tests
jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("Database Connection", () => {
  beforeAll(() => {
    process.env.MONGO_URI = "mongodb://mocked-uri";  // Use a mock URI for testing
  });

  it("✅ should connect to MongoDB successfully", async () => {
    // Mock the resolved value of mongoose.connect (success scenario)
    (mongoose.connect as jest.Mock).mockResolvedValueOnce("Connected");

    // Call the connectDB function
    await connectDB();

    // Ensure mongoose.connect is called with the correct URI
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
  });

  it("❌ should handle MongoDB connection error", async () => {
    // Mock the rejection of mongoose.connect (error scenario)
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(
      new Error("DB connection failed")
    );

    // Ensure that the function throws the correct error
    await expect(connectDB()).rejects.toThrow("DB connection failed");
  });

  it("❌ should throw an error if MONGO_URI is not defined", async () => {
    // Remove the MONGO_URI environment variable
    delete process.env.MONGO_URI;

    // Expect connectDB to throw an error because MONGO_URI is missing
    await expect(connectDB()).rejects.toThrow("MONGO_URI is not defined in the environment variables");
  });
});
