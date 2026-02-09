import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

export const httpRegisterUser = async (userData: RegisterUserData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed',
    };
  }
};
