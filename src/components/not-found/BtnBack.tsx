'use client';

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export const BtnBack = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 transition-colors duration-300 cursor-pointer hover:underline"
    >
      <IoArrowBackOutline size={20} />
      <span className="text-sm">Volver</span>
    </button>
  )
};