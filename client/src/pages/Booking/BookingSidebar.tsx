import { Link, NavLink } from 'react-router-dom';

const navLinkBase = 'flex flex-col items-center justify-center gap-1 py-3 min-h-[56px] transition-colors';
const navLinkActive = 'text-cyan-400';
const navLinkInactive = 'text-zinc-500 active:text-zinc-300';

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} width={22} height={22} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
    <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
    <line x1='16' y1='2' x2='16' y2='6' />
    <line x1='8' y1='2' x2='8' y2='6' />
    <line x1='3' y1='10' x2='21' y2='10' />
  </svg>
);

const ListIcon = ({ className }: { className?: string }) => (
  <svg className={className} width={22} height={22} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
    <line x1='8' y1='6' x2='21' y2='6' />
    <line x1='8' y1='12' x2='21' y2='12' />
    <line x1='8' y1='18' x2='21' y2='18' />
    <line x1='3' y1='6' x2='3.01' y2='6' />
    <line x1='3' y1='12' x2='3.01' y2='12' />
    <line x1='3' y1='18' x2='3.01' y2='18' />
  </svg>
);

const LogOutIcon = ({ className }: { className?: string }) => (
  <svg className={className} width={22} height={22} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
    <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
    <polyline points='16 17 21 12 16 7' />
    <line x1='21' y1='12' x2='9' y2='12' />
  </svg>
);

const BookingSidebar = () => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className='hidden md:flex w-64 bg-zinc-900/95 text-zinc-300 flex-col shrink-0 border-r border-zinc-800'>
        <div className='p-6 border-b border-zinc-800'>
          <Link to='/booking' className='text-xl font-semibold text-white tracking-tight'>
            Table Reserve
          </Link>
        </div>
        <nav className='flex-1 py-4'>
          <NavLink
            to='/booking'
            end
            className={({ isActive }) =>
              `block px-6 py-3 transition-colors ${
                isActive ? 'bg-zinc-800 text-white border-l-4 border-cyan-500' : 'hover:bg-zinc-800/60 text-zinc-400'
              }`
            }>
            Rezerwuj stolik
          </NavLink>
          <NavLink
            to='/booking/history'
            className={({ isActive }) =>
              `block px-6 py-3 transition-colors ${
                isActive ? 'bg-zinc-800 text-white border-l-4 border-cyan-500' : 'hover:bg-zinc-800/60 text-zinc-400'
              }`
            }>
            Moje rezerwacje
          </NavLink>
        </nav>
        <div className='p-4 border-t border-zinc-800'>
          <Link to='/auth/login' className='text-sm text-zinc-500 hover:text-zinc-200 transition-colors'>
            Wyloguj
          </Link>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className='md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800 flex items-stretch pb-[max(0.75rem,env(safe-area-inset-bottom))]'>
        <NavLink
          to='/booking'
          end
          className={({ isActive }) =>
            `${navLinkBase} flex-1 ${isActive ? navLinkActive : navLinkInactive}`
          }>
          <CalendarIcon />
          <span className='text-[11px] font-medium'>Rezerwuj</span>
        </NavLink>
        <NavLink
          to='/booking/history'
          className={({ isActive }) =>
            `${navLinkBase} flex-1 ${isActive ? navLinkActive : navLinkInactive}`
          }>
          <ListIcon />
          <span className='text-[11px] font-medium'>Rezerwacje</span>
        </NavLink>
        <Link to='/auth/login' className={`${navLinkBase} flex-1 ${navLinkInactive}`}>
          <LogOutIcon />
          <span className='text-[11px] font-medium'>Wyloguj</span>
        </Link>
      </nav>
    </>
  );
};

export default BookingSidebar;
