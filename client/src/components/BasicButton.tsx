interface BasicButtonProps {
  label: string;
  onClick: () => void;
}

const BasicButton = ({ label, onClick }: BasicButtonProps) => {
  return (
    <button className='bg-white text-black py-3 px-2 rounded-md' onClick={onClick}>
      {label}
    </button>
  );
};

export default BasicButton;
