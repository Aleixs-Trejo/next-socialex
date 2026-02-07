'use client';

import { useRouter } from "next/navigation";

export const OverlayModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <section className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={handleClose}>
      <div className="w-9/10 max-w-3xl mx-auto rounded lg bg-accent-dark p-4 sm:p-6 relative border border-primary shadow-md shadow-secondary" onClick={e => e.stopPropagation()}>
        <button className="absolute top-2 right-2 w-8 h-8 cursor-pointer rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-secondary" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
          </svg>
        </button>
        { children }
      </div>
    </section>
  );
};