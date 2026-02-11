'use client';

import { useRouter } from "next/navigation";

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
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left shrink-0"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span className="text-sm select-none">Volver</span>
      </div>
    </button>
  );
};