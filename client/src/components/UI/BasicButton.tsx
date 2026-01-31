interface BasicButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BasicButton = ({ label, type, onClick }: BasicButtonProps) => {
  return (
    <button className='bg-white text-black py-3 px-2 rounded-md' type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default BasicButton;
