import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

export const httpRegisterUser = async (userData: RegisterUserData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/create`, userData);
    return response.data;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};

export const httpSendVerificationEmail = async (email: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/send-verification-email`, { email });
    return response.data;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};

export const httpVerifyEmail = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/verify-email/${token}`);
    return response.data;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};

export const httpResendVerificationEmail = async (token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/resend-verification-email`, { token });
    return response.data;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};

export const httpLoginUser = async (username: string, password: string, rememberMe: boolean) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password, rememberMe });
    return response.data;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};
