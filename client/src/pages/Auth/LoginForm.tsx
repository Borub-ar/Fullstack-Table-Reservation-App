import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import BasicButton from '../../components/UI/BasicButton';
import Checkbox from '../../components/UI/Checkbox';
import Input from '../../components/UI/Input';
import LoadingOverlay from '../../components/UI/LoadingOverlay';

import useUser from '../../hooks/useUser';
import type { AuthOutletContext } from './AuthWrapper';

const LoginForm = () => {
  const navigate = useNavigate();
  const { loginUser, isLoading } = useUser();
  const { showToast } = useOutletContext<AuthOutletContext>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    const response = await loginUser(username, password, rememberMe);

    if (!response.success) {
      showToast(response.message, 'error');
      return;
    }

    showToast(response.message, 'success');
    // navigate('/');
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className='flex flex-col gap-4 text-white'>
        <h1 className='text-white font-medium text-2xl text-center mb-5'>Login</h1>

        <Input type='text' inputId='username' labelText='Username' onChange={e => setUsername(e.target.value)} />
        <Input type='password' inputId='password' labelText='Password' onChange={e => setPassword(e.target.value)} />

        <div className='flex justify-between text-xs'>
          <Checkbox id='rememberMe' label='Remember me' onChange={e => setRememberMe(e.target.checked)} />
          <button className='text-sm decoration-solid underline' type='button'>
            Forgot Password?
          </button>
        </div>

        <BasicButton label='Login' onClick={handleLogin} />

        <p className='text-center text-xs'>
          Don't have an account?{' '}
          <button className='underline' type='button' onClick={() => navigate('/auth/register')}>
            Register
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
