'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  additionalClass?: string;
}

export const OverlayModal = ({ children, additionalClass }: Props) => {
  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <div className="overlay-modal fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className={`w-9/10 mx-auto rounded-lg overflow-auto bg-accent-dark relative border border-primary shadow-md shadow-secondary ${additionalClass ? additionalClass : ''}`}>
        <button className="absolute top-2 right-2 w-8 h-8 cursor-pointer rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-secondary z-55" onClick={handleClose}>
          <Image
            src="/icons/close.svg"
            alt="Close"
            width={24}
            height={24}
            className="pointer-events-none"
          />
        </button>
        { children }
      </div>
    </div>
  );
};