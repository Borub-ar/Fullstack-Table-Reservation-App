import BasicButton from '../../components/UI/BasicButton';
import { useNavigate } from 'react-router-dom';

const EmailValidation = () => {
  const navigate = useNavigate();

  const handleResendEmail = () => {
    console.log('Resend Email');
  };
  return (
    <div>
      <h1 className='text-white font-medium text-2xl text-center mb-5'>Email Validation</h1>

      <p className='text-white text-center'>
        We've sent you an email with a verification link. Please check your inbox.
      </p>

      <BasicButton label='Resend Email' type='button' onClick={handleResendEmail} />

      <button className='text-white text-center underline' type='button' onClick={() => navigate('/auth/login')}>
        Login
      </button>
    </div>
  );
};

export default EmailValidation;
