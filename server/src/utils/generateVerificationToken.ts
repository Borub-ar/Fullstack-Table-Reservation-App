import bcrypt from 'bcrypt';
import crypto from 'crypto';

const SALT_ROUNDS = 10;

export const generateVerificationToken = async () => {
  const token = crypto.randomBytes(64).toString('hex');
  const hashedToken = await bcrypt.hash(token, SALT_ROUNDS);

  return {
    token,
    hashedToken,
  };
};
