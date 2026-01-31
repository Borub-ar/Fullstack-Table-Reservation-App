import { useState } from 'react';

import BasicButton from '../../components/UI/BasicButton';
import Input from '../../components/UI/Input';

interface RegistrationFormProps {
  swapToLogin: () => void;
}

const RegistrationForm = ({ swapToLogin }: RegistrationFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className='flex flex-col gap-4 text-white'>
      <h1 className='text-white font-medium text-2xl text-center mb-5'>register</h1>

      <Input type='text' inputId='username' labelText='Username' onChange={e => setUsername(e.target.value)} />
      <Input type='email' inputId='email' labelText='Email' onChange={e => setEmail(e.target.value)} />
      <Input type='password' inputId='password' labelText='Password' onChange={e => setPassword(e.target.value)} />
      <Input
        type='password'
        inputId='confirmPassword'
        labelText='Confirm Password'
        onChange={e => setConfirmPassword(e.target.value)}
      />

      <BasicButton label='Register' onClick={() => {}} />

      <p className='text-center text-xs'>
        Already have an accout?{' '}
        <button className='underline' type='button' onClick={swapToLogin}>
          Login
        </button>
      </p>
    </div>
  );
};

export default RegistrationForm;
