'use client';

import { useSession } from "next-auth/react";
import { IoMdMenu } from "react-icons/io";
import { useUIStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import Link from "next/link";
import { NavList } from "./ui/NavList";
import { useEffect } from "react";

export const AsideNav = () => {
  const isAsideOpen = useUIStore(useShallow(state => state.isAsideOpen));
  const setIsAsideOpen = useUIStore(useShallow(state => state.setIsAsideOpen));

/*   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isAsideOpen) {
        setIsAsideOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isAsideOpen, setIsAsideOpen]); */

  const { data: session } = useSession();

  return (
    <aside className={`h-main fixed top-16 bottom-0 hidden md:block transition-all duration-300 ${isAsideOpen ? 'w-aside-open aside-active': 'w-aside'}`}>
      <div className="w-full h-full flex flex-col">
        <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${isAsideOpen ? 'w-max': 'w-16'}`}>
          <button
            type="button"
            className={`h-16 aspect-square flex items-center justify-center cursor-pointer px-4 shrink-0`}
            onClick={() => setIsAsideOpen(!isAsideOpen)}
          >
            <IoMdMenu size={32} className="text-white" />
          </button>
          {
            session?.user ? (
              <span className={`text-sm select-none transition-opacity duration-300 w-max ${isAsideOpen ? 'opacity-100': 'opacity-0'}`}>Hola, {session.user.name?.split(" ")[0]}</span>
            ) : (
              <Link href="/auth/login" className={`text-sm transition-opacity duration-300 w-max text-bright ${isAsideOpen ? 'opacity-100 pointer-events-auto': 'opacity-0 pointer-events-none'}`}>Iniciar Sesión</Link>
            )
          }
        </div>
        <nav className="w-full pb-4 min-h-aside-nav">
          <ul className="flex flex-col">
            <NavList session={session} />
          </ul>
        </nav>
      </div>
    </aside>
  );
};
