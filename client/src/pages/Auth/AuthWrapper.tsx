import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthWrapper = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const swapAuthMode = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: 'dark',
    });
  };

  return (
    <>
      <ToastContainer />

      <form className='flex-1 max-w-100 border-2 border-white rounded-md py-12 px-8 mx-5 backdrop-blur-xs'>
        {isLoginMode && <LoginForm swapToRegister={swapAuthMode} showToast={showToast} />}
        {!isLoginMode && <RegistrationForm swapToLogin={swapAuthMode} showToast={showToast} />}
      </form>
    </>
  );
};

export default AuthWrapper;
