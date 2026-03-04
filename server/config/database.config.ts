import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer | null = null;

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    // If no URI or if it's the default example one, use memory server
    if (!mongoURI || mongoURI.includes('<username>')) {
      console.log('Using in-memory MongoDB for development...');
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('In-memory MongoDB connected successfully');
      return;
    }
    
    // Try to connect to the provided URI
    console.log('Attempting to connect to MongoDB Atlas...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });
    console.log('MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Falling back to in-memory MongoDB...');
    
    // Fallback to memory server if Atlas connection fails
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('In-memory MongoDB connected successfully (Fallback)');
    } catch (fallbackError) {
      console.error('Fallback database also failed:', fallbackError);
    }
  }
};

