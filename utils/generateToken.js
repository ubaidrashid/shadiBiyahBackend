import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET_KEY; // ✅ hardcoded
  console.log(secretKey, 'secret key');

  return jwt.sign({ id: userId }, secretKey, { expiresIn: '30d' });
};
