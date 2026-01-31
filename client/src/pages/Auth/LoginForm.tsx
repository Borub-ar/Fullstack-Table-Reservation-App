import BasicButton from '../../components/BasicButton';
import Input from '../../components/Input';

const LoginForm = () => {
  return (
    <div className='flex flex-col gap-4 text-white'>
      <h1 className='text-white font-medium text-2xl text-center mb-5'>login</h1>

      <Input type='text' inputId='username' labelText='Username' />
      <Input type='password' inputId='password' labelText='Password' />

      <div className='flex'>
        <input type='checkbox' name='' id='' />
        <button className='text-sm'>Forgott Password?</button>
      </div>

      <BasicButton label='Login' onClick={() => {}} />
      <p>
        Don't have account? <button>Register</button>
      </p>
    </div>
  );
};

export default LoginForm;
