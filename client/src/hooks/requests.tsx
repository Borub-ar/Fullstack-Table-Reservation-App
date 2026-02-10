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
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response.data || 'Registration failed',
    };
  }
};
