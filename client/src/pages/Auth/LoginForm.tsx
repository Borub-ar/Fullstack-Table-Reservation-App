import { useState } from 'react';

import BasicButton from '../../components/UI/BasicButton';
import Checkbox from '../../components/UI/Checkbox';
import Input from '../../components/UI/Input';

interface LoginFormProps {
  swapToRegister: () => void;
}

const LoginForm = ({ swapToRegister }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remeberMe, setRemeberMe] = useState(false);

  const validateForm = () => {
    console.log(username, password, remeberMe);

    loginHandler();
  };

  const loginHandler = () => {
    console.log('LOGIN');
  };

  return (
    <div className='flex flex-col gap-4 text-white'>
      <h1 className='text-white font-medium text-2xl text-center mb-5'>login</h1>

      <Input type='text' inputId='username' labelText='Username' onChange={e => setUsername(e.target.value)} />
      <Input type='password' inputId='password' labelText='Password' onChange={e => setPassword(e.target.value)} />

      <div className='flex justify-between text-xs'>
        <Checkbox id='rememberMe' label='Remember me' onChange={e => setRemeberMe(e.target.checked)} />
        <button className='text-sm decoration-sol underline' type='button'>
          Forgott Password?
        </button>
      </div>

      <BasicButton label='Login' type='button' onClick={validateForm} />

      <p className='text-center text-xs'>
        Don't have account?{' '}
        <button className='underline' type='button' onClick={swapToRegister}>
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
