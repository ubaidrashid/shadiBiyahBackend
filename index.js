import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
// import nodemon from 'nodemon';
import authRoutes from './routes/authroutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

