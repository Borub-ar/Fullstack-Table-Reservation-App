interface InputProps {
  labelText: string;
  inputId: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ labelText, inputId, type, value, onChange }: InputProps) => {
  return (
    <div className='text-white relative'>
      <label htmlFor={inputId}>{labelText}</label>
      <input type={type} value={value} className='border-b-2 border-white w-full' onChange={onChange} />
    </div>
  );
};

export default Input;
