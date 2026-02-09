'use client';

import { ImageCustom } from "@/components";
import { MenuProfileHeaderOptions } from "./MenuProfileHeaderOptions";
import { useUIStore } from "@/stores";
import { BetterAuthSession } from "@/types/better-auth.type";

interface Props {
  session: BetterAuthSession | null;
}

export const BtnProfileHeaderOptions = ({ session }: Props) => {
  const isOpenMenuProfilHeader= useUIStore(state => state.isOpenMenuProfilHeader);
  const setIsOpenMenuProfilHeader = useUIStore(state => state.setIsOpenMenuProfilHeader);
  return (
    <>
      <button type="button" className="w-image-header h-image-header aspect-square cursor-pointer" onClick={() => setIsOpenMenuProfilHeader(!isOpenMenuProfilHeader)}>
        <ImageCustom
          src={session?.user.image || undefined}
          alt="Avatar"
          width={24}
          height={24}
          className="w-full h-full rounded-full object-contain object-center"
        />
      </button>
      {
        isOpenMenuProfilHeader && (<MenuProfileHeaderOptions />)
      }
    </>
  );
};
