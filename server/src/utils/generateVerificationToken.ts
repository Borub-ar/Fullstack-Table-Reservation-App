import crypto from 'crypto';

export const generateVerificationToken = () => {
  const token = crypto.randomBytes(64).toString('hex');
  return token;
};
