'use client';

import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

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
          <IoClose size={24} className="text-white" />
        </button>
        { children }
      </div>
    </div>
  );
};