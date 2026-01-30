import { logoFont } from "@/config/fonts";
import Link from "next/link";

export const HeaderNav = () => {
  return (
    <header className="w-full h-header flex items-center justify-between fixed top-0 inset-x-0 border-b bg-accent-dark border-tertiary z-2">
      <div className="p-4">
        <Link href="/socialex/feed" className={`${logoFont.className} text-white text-2xl`}>
          SOCIALEX
        </Link>
      </div>
    </header>
  );
};