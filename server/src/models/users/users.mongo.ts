import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  userId: { type: String, required: true, unique: true },
  verificationToken: { type: String, default: null },
  verificationTokenExpiresAt: { type: Date, default: null },
});

const User = mongoose.model('User', userSchema);

export default User;
