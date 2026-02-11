interface InputProps {
  labelText: string;
  inputId: string;
  type: string;
  value?: string;
  dataType: string;
  errors?: string[];
  noLabelError?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void;
}

const Input = ({ labelText, inputId, type, value, dataType, errors, noLabelError, onChange }: InputProps) => {
  const hasErrors = errors && errors.length > 0;

  return (
    <div className='text-white relative'>
      <label htmlFor={inputId} className={hasErrors || noLabelError ? 'text-(--error-clr)' : 'text-white'}>
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        data-type={dataType}
        className={`border-b-2 ${hasErrors || noLabelError ? 'border-(--error-clr) text-(--error-clr)' : 'border-white text-white'} w-full`}
        onChange={onChange}
      />
      {errors &&
        hasErrors &&
        errors.map(error => (
          <p key={error} className='text-(--error-clr) text-xs font-bold'>
            {error}
          </p>
        ))}
    </div>
  );
};

export default Input;
