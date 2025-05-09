import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET_KEY; // ✅ hardcoded
  console.log(secretKey, 'secret key');
  console.log(process.env.MONGO_URI, 'mongo in jwt');

  return jwt.sign({ id: userId }, secretKey, { expiresIn: '30d' });
};

