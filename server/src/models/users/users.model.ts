import User from './users.mongo.js';

type CreateUserData = {
  username: string;
  password: string;
  email: string;
};

const createNewUser = async (userData: CreateUserData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

export { createNewUser };
