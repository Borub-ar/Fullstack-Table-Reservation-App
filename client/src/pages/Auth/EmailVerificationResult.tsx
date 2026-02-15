import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useUser from '../../hooks/useUser';

import LoadingOverlay from '../../components/UI/LoadingOverlay';
import BasicButton from '../../components/UI/BasicButton';

const VERIFYING_EMAIL_LABEL = 'Verifying your email...';
const EMAIL_VERIFIED_SUCCESSFULLY_LABEL = 'Email verified successfully!';
const EMAIL_VERIFICATION_FAILED_LABEL = 'Email verification failed!';

const EmailVerificationResult = () => {
  const { verifyEmail, isLoading } = useUser();

  const [resultLabel, setResultLabel] = useState(VERIFYING_EMAIL_LABEL);
  const verifiedTokenRef = useRef<string | null>(null);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    if (verifiedTokenRef.current === token) return;
    verifiedTokenRef.current = token;

    const verifyEmailFunction = async () => {
      const response = await verifyEmail(token);
      if (!response) {
        setResultLabel(EMAIL_VERIFICATION_FAILED_LABEL);
        return;
      }

      if (response.success) {
        setResultLabel(EMAIL_VERIFIED_SUCCESSFULLY_LABEL);
      } else {
        setResultLabel(EMAIL_VERIFICATION_FAILED_LABEL);
      }
    };

    verifyEmailFunction();
  }, [token, verifyEmail]);

  const displayLabel = token ? resultLabel : 'Invalid verification link';

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className='flex flex-col gap-4 text-white'>
        <h1 className='text-white font-medium text-2xl text-center mb-5'>{displayLabel}</h1>
        <BasicButton label='Login' type='button' onClick={() => navigate('/auth/login')} />
      </div>
    </>
  );
};

export default EmailVerificationResult;
