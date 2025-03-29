import mongoose from "mongoose";

export const connectTestDB = async (): Promise<void> => {
  try {
    // Set mongoose options
    mongoose.set("strictQuery", false);

    const mongoUri = process.env.MONGO_URI || '';

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

export const closeTestDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      console.log("Disconnected from MongoDB");
    }
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
};
