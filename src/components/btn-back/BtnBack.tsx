'use client';

import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

interface Props {
  additionalClass?: string;
}

export const BtnBack = ({ additionalClass }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  
  return (
    <button type="button" className={`w-max cursor-pointer transition-colors duration-300 hover:underline px-3 py-1 rounded-lg ${additionalClass || ''}`} onClick={handleBack}>
      <div className="flex items-center gap-1">
        <IoMdArrowBack size={16} className="text-white" />
        <span className="text-sm select-none">Volver</span>
      </div>
    </button>
  );
};