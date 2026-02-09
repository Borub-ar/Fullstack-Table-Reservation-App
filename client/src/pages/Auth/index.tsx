import signupBackground from '../../assets/images/auth-background.avif';

import AuthWrapper from './AuthWrapper';

const Signup = () => {
  return (
    <div
      className='min-h-screen bg-cover bg-center flex justify-center items-center'
      style={{ backgroundImage: `url(${signupBackground})` }}>
      <AuthWrapper />
    </div>
  );
};

export default Signup;
