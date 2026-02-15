import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useUser from '../../hooks/useUser';

import { z } from 'zod';
import { registrationSchema } from '../../../../shared/validation/registrationSchema.ts';

import BasicButton from '../../components/UI/BasicButton';
import Input from '../../components/UI/Input';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import type { AuthOutletContext } from './AuthWrapper';

interface ValidationErrors {
  [key: string]: string[];
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { showToast } = useOutletContext<AuthOutletContext>();

  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [emailExternalError, setEmailExternalError] = useState(false);
  const [usernameExternalError, setUsernameExternalError] = useState(false);

  const { registerUser, isLoading } = useUser();

  const saveInputValues = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    const { value, dataset } = e.target;

    if (dataset.type === 'email') setEmailExternalError(false);
    if (dataset.type === 'username') setUsernameExternalError(false);

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
      setValidationErrors(z.flattenError(result.error).fieldErrors);
    }

    return result.success;
  };

  const handleRegistration = async () => {
    setEmailExternalError(false);
    setUsernameExternalError(false);

    if (!validateForm()) return;

    const response = await registerUser(formData);
    if (!response) return;

    showToast(response.message, response.success ? 'success' : 'error');

    if (response.success) {
      navigate('/auth/verify-email', {
        state: { email: formData.email },
      });
      return;
    }

    if (response?.fields) {
      if (response.fields.includes('email')) setEmailExternalError(true);
      if (response.fields.includes('username')) setUsernameExternalError(true);
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
          noLabelError={usernameExternalError}
          onChange={saveInputValues}
        />
        <Input
          type='email'
          value={formData.email}
          inputId='email'
          labelText='Email'
          dataType='email'
          errors={validationErrors.email || []}
          noLabelError={emailExternalError}
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

        <BasicButton label='Register' disabled={isLoading} onClick={handleRegistration} />

        <p className='text-center text-xs'>
          Already have an account?{' '}
          <button className='underline' onClick={() => navigate('/auth/login')}>
            Login
          </button>
        </p>
      </div>
    </>
  );
};

export default RegistrationForm;
