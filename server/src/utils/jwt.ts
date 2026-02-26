import jwt from 'jsonwebtoken';

interface tokenConfig {
  userId: string;
  username: string;
  expiresIn: '15m' | '1h' | '24h' | '7d';
}

const generateJwtToken = ({ userId, username, expiresIn }: tokenConfig) => {
  const secret = process.env.JWT_SECRET || 'Dev Fallback';

  const token = jwt.sign(
    {
      userId,
      username,
    },
    secret,
    { expiresIn },
  );

  return token;
};

export default generateJwtToken;
