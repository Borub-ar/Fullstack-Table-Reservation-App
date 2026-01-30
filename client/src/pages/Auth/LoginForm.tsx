import Input from '../../components/Input';

const LoginForm = () => {
  return (
    <div>
      <h1 className='text-white font-medium text-2xl text-center mb-5'>login</h1>

      <Input type='text' inputId='username' labelText='Username'/>
    </div>
  );
};

export default LoginForm;
