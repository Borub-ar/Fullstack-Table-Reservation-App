interface InputProps {
  labelText: string;
  inputId: string;
  type: string;
  value?: string;
  dataType: string;
  errors: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ labelText, inputId, type, value, dataType, errors, onChange }: InputProps) => {
  return (
    <div className='text-white relative'>
      <label htmlFor={inputId} className={errors.length > 0 ? 'text-(--error-clr)' : 'text-white'}>
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        data-type={dataType}
        className={`border-b-2 ${errors.length > 0 ? 'border-(--error-clr)' : 'border-white'} w-full`}
        onChange={onChange}
      />
      {errors.length > 0 &&
        errors.map(error => (
          <p key={error} className='text-(--error-clr) text-xs'>
            {error}
          </p>
        ))}
    </div>
  );
};

export default Input;
