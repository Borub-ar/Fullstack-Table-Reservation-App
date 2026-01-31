import BasicButton from '../../components/UI/BasicButton';
import Checkbox from '../../components/UI/Checkbox';
import Input from '../../components/UI/Input';

const LoginForm = () => {
  return (
    <div className='flex flex-col gap-4 text-white'>
      <h1 className='text-white font-medium text-2xl text-center mb-5'>login</h1>

      <Input type='text' inputId='username' labelText='Username' />
      <Input type='password' inputId='password' labelText='Password' />

      <div className='flex justify-between text-xs'>
        <Checkbox id='rememberMe' label='Remember me' />
        <button className='text-sm decoration-sol underline'>Forgott Password?</button>
      </div>

      <BasicButton label='Login' onClick={() => {}} />

      <p className='text-center text-xs'>
        Don't have account? <button className='underline'>Register</button>
      </p>
    </div>
  );
};

export default LoginForm;
