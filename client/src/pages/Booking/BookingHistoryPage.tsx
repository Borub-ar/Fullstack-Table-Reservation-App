const BookingHistoryPage = () => {
  return (
    <div className='h-full min-w-0 flex flex-col p-4 sm:p-6 w-full max-w-full'>
      <h1 className='text-lg sm:text-xl font-semibold text-zinc-100 mb-4 shrink-0'>Moje rezerwacje</h1>

      <div className='md:block bg-zinc-900/80 rounded-xl border border-zinc-800 overflow-x-auto flex-1 min-h-0 min-w-0 flex flex-col'>
        <table className='w-full shrink-0'>
          <thead>
            <tr className='bg-zinc-800/50 border-b border-zinc-800'>
              <th className='text-left py-3 px-4 text-xs font-medium text-zinc-500'>Data</th>
              <th className='text-left py-3 px-4 text-xs font-medium text-zinc-500'>Godzina</th>
              <th className='text-left py-3 px-4 text-xs font-medium text-zinc-500'>Stolik</th>
              <th className='text-left py-3 px-4 text-xs font-medium text-zinc-500'>Goście</th>
              <th className='text-right py-3 px-4 text-xs font-medium text-zinc-500'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b border-zinc-800/50 hover:bg-zinc-800/30'>
              <td className='py-3 px-4 text-zinc-400 text-sm'>—</td>
              <td className='py-3 px-4 text-zinc-400 text-sm'>—</td>
              <td className='py-3 px-4 text-zinc-400 text-sm'>—</td>
              <td className='py-3 px-4 text-zinc-400 text-sm'>—</td>
              <td className='py-3 px-4 text-right'>
                <span className='inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-700 text-zinc-400'>
                  —
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='flex-1 flex items-center justify-center text-zinc-500 text-sm'>
          Brak rezerwacji. Wybierz datę i stolik, aby utworzyć rezerwację.
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryPage;
