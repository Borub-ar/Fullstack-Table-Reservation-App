import { useState } from 'react';

import { httpRegisterUser } from './requests';

import type { CreateUserData } from '../types/user';

const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (userData: CreateUserData) => {
    if (isLoading) return;
    setIsLoading(true);

    const result = await httpRegisterUser(userData);
    setIsLoading(false);
    return result;
  };

  return { registerUser, isLoading };
};

export default useUser;
