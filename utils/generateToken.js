import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  const secretKey = 'ubbiqadri97'; // ✅ hardcoded
  console.log(secretKey, 'secret key');

  return jwt.sign({ id: userId }, secretKey, { expiresIn: '30d' });
};
