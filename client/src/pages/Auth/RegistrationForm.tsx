import { useState } from 'react';
import useUser from '../../hooks/useUser';

import { z } from 'zod';
import { registrationSchema } from '../../schemas/registration.js';

import BasicButton from '../../components/UI/BasicButton';
import Input from '../../components/UI/Input';
import LoadingOverlay from '../../components/UI/LoadingOverlay';

interface RegistrationFormProps {
  swapToLogin: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

interface ValidationErrors {
  [key: string]: string[];
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm = ({ swapToLogin, showToast }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const { registerUser, isLoading } = useUser();

  const saveInputValues = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    const { value, dataset } = e.target;

    setFormData(prev => {
      return { ...prev, [dataset.type as keyof typeof formData]: value };
    });

    setValidationErrors(prev => {
      return { ...prev, [dataset.type as keyof typeof formData]: [] };
    });
  };

  const validateForm = () => {
    const result = registrationSchema.safeParse(formData);

    if (!result.success) {
      const parsedErrors = z.flattenError(result.error).fieldErrors;
      setValidationErrors(parsedErrors);
      return false;
    } else {
      return true;
    }
  };

  const handleRegistration = async () => {
    const result = validateForm();

    if (!result) return;

    const response = await registerUser(formData);
    if (!response) return;

    if (response.success) {
      swapToLogin();
      showToast(response.message, 'success');
    } else {
      showToast(response.message, 'error');
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className='flex flex-col gap-4 text-white'>
        <h1 className='text-white font-medium text-2xl text-center mb-5'>register</h1>

        <Input
          type='text'
          value={formData.username}
          inputId='username'
          labelText='Username'
          dataType='username'
          errors={validationErrors.username || []}
          onChange={saveInputValues}
        />
        <Input
          type='email'
          value={formData.email}
          inputId='email'
          labelText='Email'
          dataType='email'
          errors={validationErrors.email || []}
          onChange={saveInputValues}
        />
        <Input
          type='password'
          value={formData.password}
          inputId='password'
          labelText='Password'
          dataType='password'
          errors={validationErrors.password || []}
          onChange={saveInputValues}
        />
        <Input
          type='password'
          value={formData.confirmPassword}
          inputId='confirmPassword'
          labelText='Confirm Password'
          dataType='confirmPassword'
          errors={validationErrors.confirmPassword || []}
          onChange={saveInputValues}
        />

        <BasicButton label='Register' type='button' disabled={isLoading} onClick={handleRegistration} />

        <p className='text-center text-xs'>
          Already have an account?{' '}
          <button className='underline' type='button' onClick={swapToLogin}>
            Login
          </button>
        </p>
      </div>
    </>
  );
};

export default RegistrationForm;
