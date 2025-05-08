import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://ubaidqadri97:ubaid1234rty@ubaidcluster.zmbximk.mongodb.net/shadibiyah?retryWrites=true&w=majority&appName=ubaidcluster'; // Default URI for local MongoDB

    // Log the URI being used to connect
    console.log("Connecting to MongoDB using URI:", mongoURI);

    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
    }
};

export default connectDB;
