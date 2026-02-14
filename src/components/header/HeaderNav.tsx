import { logoFont } from "@/config/fonts";
import Link from "next/link";
import { BtnProfileHeaderOptions } from "./ui/BtnProfileHeaderOptions";
import { BetterAuthSession } from "@/types/better-auth.type";

interface Props {
  session: BetterAuthSession | null;
}

export const HeaderNav = async ({ session }: Props) => {
  return (
    <header className="w-full h-header flex items-center justify-between fixed top-0 inset-x-0 border-b bg-accent-dark border-tertiary z-20">
      <div className="px-4 w-full flex items-center h-full justify-between">
        <Link href="/socialex/feed" className={`${logoFont.className} text-white text-header-logo`}>
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