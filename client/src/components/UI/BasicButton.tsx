interface BasicButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BasicButton = ({ label, type = 'button', disabled, onClick }: BasicButtonProps) => {
  return (
    <button className='bg-white text-black py-3 px-2 rounded-md' type={type} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default BasicButton;
