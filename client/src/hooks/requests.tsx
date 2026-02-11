import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

export const httpRegisterUser = async (userData: RegisterUserData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    return (error as AxiosError).response?.data;
  }
};
