// BtnReactionEpisode.tsx - ahora solo es presentacional
'use client';

interface Props {
  children: React.ReactNode;
  isActive: boolean;
  isPending: boolean;
  onClick: () => void;
}

export const BtnReactionEpisode = ({ children, isActive, isPending, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-tertiary/40 rounded-xl border flex-1 h-auto transition-all duration-300 md:w-max ${isPending ? 'cursor-wait' : ''} ${isActive ? 'bg-primary border-primary' : 'bg-accent border-transparent'}`}
    >
      {children}
    </button>
  );
};