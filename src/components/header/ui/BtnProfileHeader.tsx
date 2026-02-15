'use client';

import { useUIStore } from "@/stores";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

export const BtnProfileHeader = ({ children }: Props) => {
  const isOpenMenuProfilHeader= useUIStore(state => state.isOpenMenuProfilHeader);
  const setIsOpenMenuProfilHeader = useUIStore(state => state.setIsOpenMenuProfilHeader);

  return (
    <>
      <button type="button" className="w-image-header h-image-header aspect-square cursor-pointer" onClick={() => setIsOpenMenuProfilHeader(!isOpenMenuProfilHeader)}>
        <Image
          src="/img/user-profile-default.avif"
          alt="Avatar"
          width={24}
          height={24}
          className="w-full h-full rounded-full object-contain object-center"
        />
      </button>
      {
        isOpenMenuProfilHeader && (
          <div className="min-w-30 rounded-sm p-2 bg-black border border-tertiary animate-fade-in absolute top-16 right-0 z-50" onClick={() => setIsOpenMenuProfilHeader(false)}>{children}</div>
        )
      }
    </>
  );
};
