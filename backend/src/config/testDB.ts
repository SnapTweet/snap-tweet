import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

export const connectTestDB = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);

    if (!mongoServer) {
      mongoServer = await MongoMemoryServer.create();
    }

    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions);
      console.log("Connected to MongoDB Memory Server");
    }
  } catch (error) {
    console.error("MongoDB Memory Server Error:", error);
    throw error;
  }
};

export const closeTestDB = async (): Promise<void> => {
  try {
    if (mongoServer) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongoServer.stop();
      console.log("Disconnected from MongoDB Memory Server");
    }
  } catch (error) {
    console.error("Error closing MongoDB Memory Server:", error);
    throw error;
  }
};
