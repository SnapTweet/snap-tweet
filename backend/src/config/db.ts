import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
  }

  try {
    await mongoose.connect(mongoURI);

    if (process.env.NODE_ENV !== 'test') {
      console.log('✅ MongoDB Connected');
    }
  } catch (error) {
    console.error('MongoDB Connection Error:', error);

    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);  // Exit the process if not a test environment
    } else {
      throw new Error('DB connection failed');
    }
  }
};

export default connectDB;
