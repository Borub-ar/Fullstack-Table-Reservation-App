export const USER_ALREADY_EXISTS = {
  errorCode: 409,
  message: 'User already exists',
};

export const EMAIL_ALREADY_TAKEN = {
  errorCode: 409,
  message: 'This email is already taken',
};

export const USERNAME_ALREADY_TAKEN = {
  errorCode: 409,
  message: 'This username is already taken',
};

export const INVALID_DATA = {
  errorCode: 400,
  message: 'Invalid data',
};

export const INVALID_TOKEN = {
  errorCode: 400,
  message: 'Something went wrong, please request a new verification email',
};

export const TOKEN_EXPIRED = {
  errorCode: 400,
  message: 'Verification token expired, please request a new verification email',
};

export const INVALID_CREDENTIALS = {
  errorCode: 400,
  message: 'Invalid credentials',
};

export const UNVERIFIED_ACCOUNT = {
  errorCode: 400,
  message: 'Unverified account',
};
