import bcrypt from 'bcrypt';

import User from './users.mongo.js';
import AppError from '../../AppError.js';

import type { CreateUserDto } from '../../types/user.js';
import { registrationSchema } from '../../../../shared/validation/registrationSchema.js';

import { generateVerificationToken } from '../../utils/generateVerificationToken.js';
import { sendVerificationEmailService } from '../../services/email.service.js';

import {
  EMAIL_ALREADY_TAKEN,
  INVALID_DATA,
  USERNAME_ALREADY_TAKEN,
  INVALID_TOKEN,
  TOKEN_EXPIRED,
} from '../../constants/errorCodes.js';

const SALT_ROUNDS = 10;
const VERIFICATION_TOKEN_EXPIRES_IN = 1000 * 60 * 60 * 24;

const createUser = async (userData: CreateUserDto) => {
  try {
    validateRegistrationData(userData);
    await checkIfUserExists(userData);
    await checkIfEmailExists(userData);

    const usernameNormalized = userData.username.trim();
    const emailNormalized = userData.email.trim().toLowerCase();

    const passwordHash = await bcrypt.hash(userData.password, SALT_ROUNDS);
    const verificationToken = generateVerificationToken();

    const userToCreate = {
      username: usernameNormalized,
      email: emailNormalized,
      passwordHash,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + VERIFICATION_TOKEN_EXPIRES_IN),
      userId: crypto.randomUUID(),
    };

    const newUser = new User(userToCreate);
    await newUser.save();

    await sendVerificationEmailService(verificationToken, userData.email);

    return { success: true, message: 'User created successfully' };
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof AppError) throw error;
    throw new Error('Something went wrong while creating user');
  }
};

const validateRegistrationData = (userData: CreateUserDto) => {
  const validationResult = registrationSchema.safeParse(userData);
  if (!validationResult.success) {
    throw new AppError(INVALID_DATA.errorCode, INVALID_DATA.message, 400);
  }
};

const checkIfUserExists = async (userData: CreateUserDto) => {
  const usernameNormalized = userData.username.trim();
  const existingUser = await User.findOne({ username: usernameNormalized });
  if (existingUser) {
    throw new AppError(USERNAME_ALREADY_TAKEN.errorCode, USERNAME_ALREADY_TAKEN.message, 400, ['username']);
  }
};

const checkIfEmailExists = async (userData: CreateUserDto) => {
  const emailNormalized = userData.email.trim().toLowerCase();
  const existingEmail = await User.findOne({ email: emailNormalized });
  if (existingEmail) {
    throw new AppError(EMAIL_ALREADY_TAKEN.errorCode, EMAIL_ALREADY_TAKEN.message, 400, ['email']);
  }
};

const sendVerificationEmail = async (email: string) => {
  try {
    const emailNormalized = email.trim().toLowerCase();
    const user = await User.findOne({ email: emailNormalized });
    const successMessage = 'If email exists, we have sent you a verification email';

    if (!user) {
      return { success: true, message: successMessage };
    }

    const verificationToken = generateVerificationToken();
    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRES_IN);

    await user.save();
    await sendVerificationEmailService(verificationToken, email);

    return { success: true, message: successMessage };
  } catch (error) {
    console.error('Error sending verification email:', error);
    if (error instanceof AppError) throw error;
    throw new Error('Something went wrong while sending verification email');
  }
};

const resendVerificationEmail = async (token: string) => {
  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      throw new AppError(INVALID_TOKEN.errorCode, INVALID_TOKEN.message, 400);
    }

    const verificationToken = generateVerificationToken();

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRES_IN);
    await user.save();

    await sendVerificationEmailService(verificationToken, user.email);

    return { success: true, message: 'New verification email sent successfully' };
  } catch (error) {
    console.error('Error resending verification email:', error);
    if (error instanceof AppError) throw error;
    throw new Error('Something went wrong while resending verification email');
  }
};

const verifyEmail = async (token?: string) => {
  try {
    const user = await getVerifiableUserByToken(token);

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;
    await user.save();

    return { success: true, message: 'Email verified successfully!' };
  } catch (error) {
    console.error('Error verifying email:', error);
    if (error instanceof AppError) throw error;
    throw new Error('Something went wrong while verifying email');
  }
};

const getVerifiableUserByToken = async (token: string | undefined) => {
  if (!token) {
    throw new AppError(INVALID_TOKEN.errorCode, INVALID_TOKEN.message, 400);
  }

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw new AppError(INVALID_TOKEN.errorCode, INVALID_TOKEN.message, 400);
  }

  if (user.verificationTokenExpiresAt && user.verificationTokenExpiresAt < new Date()) {
    throw new AppError(TOKEN_EXPIRED.errorCode, TOKEN_EXPIRED.message, 400);
  }

  return user;
};

export { createUser, sendVerificationEmail, verifyEmail, resendVerificationEmail };
