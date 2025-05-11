import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI?.trim();

    console.log("🌐 Trying to connect to MongoDB...");

    try {
        const conn = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 10000 // 10 second timeout
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection FAILED");
        console.error("Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
