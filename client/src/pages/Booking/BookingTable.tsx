interface BookingTableProps {
  number: number;
  capacity?: string;
}

const BookingTable = ({ number, capacity = '2–4 os.' }: BookingTableProps) => {
  return (
    <div className='group relative w-full aspect-square max-w-full rounded-xl sm:rounded-2xl bg-zinc-800/60 border border-zinc-700 flex flex-col items-center justify-center gap-1 sm:gap-2 hover:border-cyan-500/70 hover:bg-zinc-800 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-[0.98] transition-all duration-200 cursor-pointer touch-manipulation'>
      <div className='w-10 h-6 sm:w-12 sm:h-8 rounded-md bg-zinc-600/70 group-hover:bg-cyan-500/30 border border-zinc-600 shrink-0' />
      <span className='text-sm font-semibold text-zinc-300 group-hover:text-cyan-400'>Stolik {number}</span>
      <span className='text-xs text-zinc-500'>{capacity}</span>
    </div>
  );
};

export default BookingTable;
