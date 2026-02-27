import BookingTable from './BookingTable';

const BookingPage = () => {
  return (
    <div className='h-full min-w-0 flex flex-col p-4 sm:p-6 w-full max-w-full'>
      <h1 className='text-lg sm:text-xl font-semibold text-zinc-100 pb-4 shrink-0'>Rezerwacja stolika</h1>

      <div className='bg-zinc-900/80 rounded-xl border border-zinc-800 p-4 mb-4 sm:mb-6 shrink-0'>
        <h2 className='text-[11px] sm:text-xs font-medium text-zinc-500 uppercase tracking-wider pb-3'>
          Wybierz datę i godzinę
        </h2>
        <div className='flex flex-col md:flex-row gap-3 sm:gap-4'>
          <div className='flex-1 min-w-0'>
            <label className='block text-sm text-zinc-400 mb-1.5'>Data</label>
            <div className='h-12 sm:h-10 px-4 rounded-lg border border-zinc-700 bg-zinc-800/50 flex items-center text-zinc-500 text-sm'>
              Wybierz datę
            </div>
          </div>
          <div className='flex-1 min-w-0'>
            <label className='block text-sm text-zinc-400 mb-1.5'>Godzina</label>
            <div className='h-12 sm:h-10 px-4 rounded-lg border border-zinc-700 bg-zinc-800/50 flex items-center text-zinc-500 text-sm'>
              Wybierz godzinę
            </div>
          </div>
          <div className='flex-1 min-w-0'>
            <label className='block text-sm text-zinc-400 mb-1.5'>Liczba gości</label>
            <div className='h-12 sm:h-10 px-4 rounded-lg border border-zinc-700 bg-zinc-800/50 flex items-center text-zinc-500 text-sm'>
              2 osoby
            </div>
          </div>
        </div>
      </div>

      <div className='bg-zinc-900/80 rounded-xl border border-zinc-800 p-4 sm:p-6 flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden'>
        <h2 className='text-[11px] sm:text-xs font-medium pb-4 text-zinc-500 uppercase tracking-wider mb-3 sm:mb-4 shrink-0'>
          Dostępne stoliki
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 flex-1 min-h-0 content-start overflow-y-auto'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <BookingTable number={n} />
          ))}
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-3 pt-4 shrink-0'>
        <button
          type='button'
          className='h-12 sm:h-10 px-5 rounded-xl border border-zinc-600 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 active:bg-zinc-800 transition-colors text-sm font-medium'>
          Anuluj
        </button>
        <button
          type='button'
          className='h-12 sm:h-10 px-5 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 active:bg-cyan-600 transition-colors text-sm font-medium flex-1 sm:flex-initial'>
          Zarezerwuj
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
