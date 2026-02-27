import jwt from 'jsonwebtoken';

const generateJwtToken = (userId: string, username: string, expiresIn: string) => {
  const secret = process.env.JWT_SECRET || 'Dev Fallback';

  const token = jwt.sign({ userId, username }, secret, { expiresIn } as jwt.SignOptions);

  return token;
};

export default generateJwtToken;
