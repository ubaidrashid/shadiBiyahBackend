import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();
export const generateToken = (userId) => {
  const secretKey = "ubbiqadri97"; // ✅ hardcoded
  console.log(process.env.JWT_SECRET_KEY?.trim(), 'secret key');
  console.log(process.env.MONGO_URI?.trim(), 'mongo in jwt');

  return jwt.sign({ id: userId }, secretKey, { expiresIn: '30d' });
};

