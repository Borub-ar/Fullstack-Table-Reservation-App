import BasicButton from '../../components/UI/BasicButton';
import { useNavigate, useLocation, Navigate, useOutletContext } from 'react-router-dom';

import useUser from '../../hooks/useUser';

import LoadingOverlay from '../../components/UI/LoadingOverlay';
import type { AuthOutletContext } from './AuthWrapper';

const EmailVerificationNotice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useOutletContext<AuthOutletContext>();
  const { sendVerificationEmail, isLoading } = useUser();

  const email = location.state?.email;
  if (!email) return <Navigate to='/auth/login' replace />;

  const handleResendEmail = async () => {
    const response = await sendVerificationEmail(email);
    if (!response) return;

    showToast(response.message, response.success ? 'success' : 'error');
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className='flex flex-col gap-4 text-white'>
        <h1 className=' font-medium text-2xl text-center mb-5'>Verify your email</h1>

        <p className='text-center'>We've sent you an email with a verification link. Please check your inbox.</p>

        <BasicButton label='Resend Email' onClick={handleResendEmail} />

        <button className='ext-center underline cursor-pointer' type='button' onClick={() => navigate('/auth/login')}>
          Login
        </button>
      </div>
    </>
  );
};

export default EmailVerificationNotice;
