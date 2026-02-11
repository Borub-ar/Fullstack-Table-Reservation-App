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
    const errorMessage =
      axios.isAxiosError(error) && typeof error.response?.data?.message === 'string'
        ? error.response.data.message
        : error instanceof Error
          ? error.message
          : 'Registration failed';

    return {
      success: false,
      message: errorMessage,
    };
  }
};
