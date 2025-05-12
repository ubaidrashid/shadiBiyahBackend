import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
// import nodemon from 'nodemon';
import authRoutes from './routes/authroutes.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "*", // Development ke liye, ya specific origin: "http://localhost:3000"
}));


connectDB();

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

