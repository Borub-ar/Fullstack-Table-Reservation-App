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

export const EMAIL_SENT_IF_EXISTS = {
  errorCode: 200,
  message: 'If email exists, we have sent you a verification email',
};

export const INVALID_TOKEN = {
  errorCode: 400,
  message: 'Invalid token',
};

export const TOKEN_EXPIRED = {
  errorCode: 400,
  message: 'Token expired, please request a new verification email',
};
