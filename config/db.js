import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("url" , process.env.MONGO_URI);
        console.log("MongoDB connected ✅");
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export default connectDB;
