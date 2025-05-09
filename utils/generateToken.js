import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

export const generateToken = (userId) => {
console.log(process.env.JWT_SECRET_KEY , "secret key")
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })

}