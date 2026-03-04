import jwt from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_for_development_only';
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_for_development_only';
  return jwt.verify(token, secret);
};
