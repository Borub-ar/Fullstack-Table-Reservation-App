import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import BookingSidebar from './BookingSidebar';

const BookingLayout = () => {
  return (
    <div className='h-screen max-h-screen w-screen flex flex-col md:flex-row bg-zinc-950 overflow-hidden min-w-0'>
      <BookingSidebar />

      <main className='relative flex-1 min-w-0 min-h-0 overflow-hidden flex flex-col pt-14 md:pt-0 pb-24 md:pb-0'>
        <header className='md:hidden shrink-0 absolute top-0 left-0 right-0 z-40 h-14 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800 flex items-center px-4'>
          <Link to='/booking' className='text-lg font-semibold text-white tracking-tight truncate'>
            Table Reserve
          </Link>
        </header>
        <div className='flex-1 min-w-0 min-h-0 overflow-hidden flex flex-col md:flex-row'>
          <div className='flex-1 min-w-0 min-h-0 overflow-x-hidden overflow-y-auto'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingLayout;
