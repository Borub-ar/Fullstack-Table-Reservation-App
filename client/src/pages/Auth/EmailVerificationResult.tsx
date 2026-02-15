import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useUser from '../../hooks/useUser';

import LoadingOverlay from '../../components/UI/LoadingOverlay';
import BasicButton from '../../components/UI/BasicButton';

const VERIFYING_EMAIL_LABEL = 'Verifying your email...';

const EmailVerificationResult = () => {
  const { verifyEmail, isLoading } = useUser();
  const navigate = useNavigate();

  const [resultLabel, setResultLabel] = useState(VERIFYING_EMAIL_LABEL);
  const verifiedTokenRef = useRef<string | null>(null);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) return;

    if (verifiedTokenRef.current === token) return;
    verifiedTokenRef.current = token;

    const verifyEmailFunction = async () => {
      const response = await verifyEmail(token);

      setResultLabel(response.message);
    };

    verifyEmailFunction();
  }, [token, verifyEmail]);

  const handleRequestNewVerificationEmail = async () => {
    console.log('request new verification email');
  };
  
  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className='flex flex-col gap-4 text-white'>
        <h1 className='text-white font-medium text-2xl text-center mb-5'>{resultLabel}</h1>
        <BasicButton label='Request new verification email' onClick={handleRequestNewVerificationEmail} />
        <BasicButton label='Login' onClick={() => navigate('/auth/login')} />
      </div>
    </>
  );
};

export default EmailVerificationResult;
