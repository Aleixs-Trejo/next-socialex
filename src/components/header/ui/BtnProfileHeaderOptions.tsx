'use client';

import { ImageCustom } from "@/components";
import { Session } from "next-auth";
import { MenuProfileHeaderOptions } from "./MenuProfileHeaderOptions";
import { useUIStore } from "@/stores";

interface Props {
  session: Session | null;
}

export const BtnProfileHeaderOptions = ({ session }: Props) => {
  const isOpenMenuProfilHeader= useUIStore(state => state.isOpenMenuProfilHeader);
  const setIsOpenMenuProfilHeader = useUIStore(state => state.setIsOpenMenuProfilHeader);
  return (
    <>
      <button type="button" className="w-8 h-8 aspect-square cursor-pointer" onClick={() => setIsOpenMenuProfilHeader(!isOpenMenuProfilHeader)}>
        <ImageCustom
          src={session?.user?.image || undefined}
          alt="Avatar"
          width={24}
          height={24}
          className="rounded-full m-auto"
        />
      </button>
      {
        isOpenMenuProfilHeader && (<MenuProfileHeaderOptions />)
      }
    </>
  );
};
