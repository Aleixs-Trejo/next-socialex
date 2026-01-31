import { logoFont } from "@/config/fonts";
import { Session } from "next-auth";
import Link from "next/link";
import { BtnProfileHeaderOptions } from "./ui/BtnProfileHeaderOptions";

interface Props {
  session: Session | null;
}

export const HeaderNav = async ({ session }: Props) => {
  return (
    <header className="w-full h-header flex items-center justify-between fixed top-0 inset-x-0 border-b bg-accent-dark border-tertiary z-2">
      <div className="p-4 w-full flex items-center h-full justify-between">
        <Link href="/socialex/feed" className={`${logoFont.className} text-white text-2xl`}>
          SOCIALEX
        </Link>
        {
          session?.user && (
            <BtnProfileHeaderOptions session={session} />
          )
        }
      </div>
    </header>
  );
};