import { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';

import useUser from '../../hooks/useUser';

import LoadingOverlay from '../../components/UI/LoadingOverlay';
import BasicButton from '../../components/UI/BasicButton';
import type { AuthOutletContext } from './AuthWrapper';

const VERIFYING_EMAIL_LABEL = 'Verifying your email...';
const SOMETHING_WENT_WRONG_LABEL = 'Something went wrong, please request a new verification email';

const EmailVerificationResult = () => {
  const { verifyEmail, resendVerificationEmail, isLoading } = useUser();
  const navigate = useNavigate();
  const { showToast } = useOutletContext<AuthOutletContext>();

  const [resultLabel, setResultLabel] = useState(VERIFYING_EMAIL_LABEL);
  const [isError, setIsError] = useState(false);

  const verifiedTokenRef = useRef<string | null>(null);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) return;

    if (verifiedTokenRef.current === token) return;
    verifiedTokenRef.current = token;

    const verifyEmailFunction = async () => {
      const response = await verifyEmail(token);

      if (!response) {
        setResultLabel(SOMETHING_WENT_WRONG_LABEL);
        setIsError(true);
        return;
      }

      if (!response.success) {
        setIsError(true);
      }

      setResultLabel(response.message);
    };

    verifyEmailFunction();
  }, [token, verifyEmail]);

  const handleRequestNewVerificationEmail = async () => {
    if (!token) return;

    const response = await resendVerificationEmail(token);
    if (!response) return;

    showToast(response.message, response.success ? 'success' : 'error');
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className='flex flex-col gap-4 text-white'>
        <h1 className='text-white font-medium text-2xl text-center mb-5'>{resultLabel}</h1>
        {isError && <BasicButton label='Resend Verification Email' onClick={handleRequestNewVerificationEmail} />}
        {!isError && <BasicButton label='Login' onClick={() => navigate('/auth/login')} />}
      </div>
    </>
  );
};

export default EmailVerificationResult;
