import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userId) => {
console.log(process.env.JWT_SECRET_KEY , "secret key")
    return jwt.sign({ id: userId }, ubbiqadri97 , { expiresIn: '30d' })

}