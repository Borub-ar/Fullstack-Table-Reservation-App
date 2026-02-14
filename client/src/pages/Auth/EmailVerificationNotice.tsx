import BasicButton from '../../components/UI/BasicButton';
import { useNavigate } from 'react-router-dom';

import useUser from '../../hooks/useUser';

const EmailVerificationNotice = () => {
  const navigate = useNavigate();
  const { sendVerificationEmail, isLoading } = useUser();

  const handleResendEmail = async () => {
    const response = await sendVerificationEmail(email);
    console.log('Resend Email');
  };

  return (
    <div className='flex flex-col gap-4 text-white'>
      <h1 className=' font-medium text-2xl text-center mb-5'>Verify your email</h1>

      <p className='text-center'>We've sent you an email with a verification link. Please check your inbox.</p>

      <BasicButton label='Resend Email' type='button' onClick={handleResendEmail} />

      <button className='ext-center underline cursor-pointer' type='button' onClick={() => navigate('/auth/login')}>
        Login
      </button>
    </div>
  );
};

export default EmailVerificationNotice;
