import { useState } from 'react';

import {
  httpLoginUser,
  httpRegisterUser,
  httpResendVerificationEmail,
  httpSendVerificationEmail,
  httpVerifyEmail,
} from './requests';

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

  const sendVerificationEmail = async (email: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const result = await httpSendVerificationEmail(email);
    setIsLoading(false);
    return result;
  };

  const verifyEmail = async (token: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const result = await httpVerifyEmail(token);
    setIsLoading(false);
    return result;
  };

  const resendVerificationEmail = async (token: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const result = await httpResendVerificationEmail(token);
    setIsLoading(false);
    return result;
  };

  const loginUser = async (username: string, password: string, rememberMe: boolean) => {
    if (isLoading) return;
    setIsLoading(true);

    const result = await httpLoginUser(username, password, rememberMe);
    setIsLoading(false);
    return result;
  };

  return { registerUser, sendVerificationEmail, verifyEmail, resendVerificationEmail, loginUser, isLoading };
};

export default useUser;
