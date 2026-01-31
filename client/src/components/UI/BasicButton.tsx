interface BasicButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BasicButton = ({ label, onClick }: BasicButtonProps) => {
  return (
    <button className='bg-white text-black py-3 px-2 rounded-md' onClick={onClick}>
      {label}
    </button>
  );
};

export default BasicButton;
