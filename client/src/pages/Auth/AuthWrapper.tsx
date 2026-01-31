import { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthWrapper = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const swapAuthMode = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <form className='flex-1 max-w-85 border-2 border-white rounded-md py-12 px-8 mx-5 backdrop-blur-xs'>
      {isLoginMode && <LoginForm swapToRegister={swapAuthMode} />}
      {!isLoginMode && <RegistrationForm swapToLogin={swapAuthMode} />}
    </form>
  );
};

export default AuthWrapper;
