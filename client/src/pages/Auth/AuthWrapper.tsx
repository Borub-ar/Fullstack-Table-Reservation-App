import { Outlet } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

export interface AuthOutletContext {
  showToast: (message: string, type: 'success' | 'error') => void;
}

const AuthWrapper = () => {
  const showToast = (message: string, type: 'success' | 'error') => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: 'dark',
    });
  };

  return (
    <>
      <ToastContainer />

      <form className='flex-1 max-w-100 border-2 border-white rounded-md py-12 px-8 mx-5 backdrop-blur-md'>
        <Outlet context={{ showToast }} />
      </form>
    </>
  );
};

export default AuthWrapper;
