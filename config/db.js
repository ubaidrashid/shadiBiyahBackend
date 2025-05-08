import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://ubaidqadri97:ubaid1234rty@ubaidcluster.zmbximk.mongodb.net/shadibiyah?retryWrites=true&w=majority&appName=ubaidcluster'; // Default URI for local MongoDB
    console.log("Connecting to MongoDB..." , process.env.MONGO_URI);
    try {
        await mongoose.connect(mongoURI);
        console.log("Connecting to MongoDB..." , process.env.MONGO_URI);
        console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

export default connectDB;
