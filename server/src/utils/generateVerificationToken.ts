import crypto from 'crypto';

const generateVerificationToken = () => {
  const token = crypto.randomBytes(64).toString('hex');
  return token;
};

export default  generateVerificationToken