import { useState } from 'react';
import useUser from '../../hooks/useUser';

import { z } from 'zod';

import { PASSWORD_VALIDATION } from '../../constants/constants';

import BasicButton from '../../components/UI/BasicButton';
import Input from '../../components/UI/Input';
import LoadingOverlay from '../../components/UI/LoadingOverlay';

interface RegistrationFormProps {
  swapToLogin: () => void;
}

interface ValidationErrors {
  [key: string]: string[];
}

const registrationSchema = z
  .object({
    username: z.string().min(3, 'Minimum 3 znaki'),
    email: z.email('Nieprawidłowy email'),
    password: z
      .string()
      .regex(PASSWORD_VALIDATION, 'Hasło musi mieć min. 8 znaków, dużą i małą literę, cyfrę oraz znak specjalny'),
    confirmPassword: z.string().min(1, 'Potwierdź hasło'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Hasła nie są identyczne',
    path: ['confirmPassword'],
  });

const RegistrationForm = ({ swapToLogin }: RegistrationFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const { registerUser, isLoading, error, success, reset } = useUser();

  const saveInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = e.target;

    switch (dataset.type) {
      case 'username':
        setValidationErrors(prev => ({ ...prev, username: [] }));
        setUsername(value);
        break;
      case 'email':
        setValidationErrors(prev => ({ ...prev, email: [] }));
        setEmail(value);
        break;
      case 'password':
        setValidationErrors(prev => ({ ...prev, password: [] }));
        setPassword(value);
        break;
      case 'confirmPassword':
        setValidationErrors(prev => ({ ...prev, confirmPassword: [] }));
        setConfirmPassword(value);
        break;
    }
  };

  const handleRegistration = async () => {
    const result = validateForm();

    if (!result) return;

    const registrationResult = await registerUser({ username, email, password });
    console.log(registrationResult);
  };

  const validateForm = () => {
    const result = registrationSchema.safeParse({ username, email, password, confirmPassword });

    if (!result.success) {
      const parsedErrors = z.flattenError(result.error).fieldErrors;
      setValidationErrors(parsedErrors);
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className='flex flex-col gap-4 text-white'>
        <h1 className='text-white font-medium text-2xl text-center mb-5'>register</h1>

        <Input
          type='text'
          inputId='username'
          labelText='Username'
          dataType='username'
          errors={validationErrors.username || []}
          onChange={saveInputValues}
        />
        <Input
          type='text'
          inputId='email'
          labelText='Email'
          dataType='email'
          errors={validationErrors.email || []}
          onChange={saveInputValues}
        />
        <Input
          type='password'
          inputId='password'
          labelText='Password'
          dataType='password'
          errors={validationErrors.password || []}
          onChange={saveInputValues}
        />
        <Input
          type='password'
          inputId='confirmPassword'
          labelText='Confirm Password'
          dataType='confirmPassword'
          errors={validationErrors.confirmPassword || []}
          onChange={saveInputValues}
        />

        <BasicButton label='Register' type='button' disabled={isLoading} onClick={handleRegistration} />

        <p className='text-center text-xs'>
          Already have an accout?{' '}
          <button className='underline' type='button' onClick={swapToLogin}>
            Login
          </button>
        </p>
      </div>
    </>
  );
};

export default RegistrationForm;
