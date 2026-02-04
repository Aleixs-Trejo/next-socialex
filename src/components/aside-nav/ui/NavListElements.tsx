import Link from "next/link";
import { useUIStore } from "@/stores";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { FaMusic, FaUser } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { useShallow } from "zustand/shallow";

const navLinks = [
  {
    name: 'Inicio',
    href: '/socialex/feed',
    icon: <IoMdHome size={24} className="text-white" />,
  },
  {
    name: 'Amigos',
    href: '/socialex/users',
    icon: <IoPeopleSharp size={24} className="text-white" />,
  },
  {
    name: 'Perfil',
    href: '/socialex/profile',
    icon: <FaUser size={22} className="text-white" />,
  },
  {
    name: 'Música',
    href: '/socialex/music',
    icon: <FaMusic size={22} className="text-white" />,
  },
  {
    name: 'Juegos',
    href: '/socialex/games',
    icon: <GiConsoleController size={24} className="text-white" />,
  }
];

interface Props {
  session: Session | null;
}

export const NavListElements = ({ session }: Props) => {
  const pathname = usePathname();
  const isAsideOpen = useUIStore(useShallow(state => state.isAsideOpen));

  const filteredLinks = navLinks.filter(link => {
    if (link.name === 'Perfil' && !session?.user) {
      return false;
    }
    return true;
  });

  const navList = filteredLinks.map(link => {
    return (
    <li className="flex-1 flex border-b border-tertiary" key={link.name}>
      <Link href={link.href} className={`flex gap-4 w-full h-full items-center transition-colors duration-300 rounded-md hover:bg-quaternary ${pathname === link.href ? 'bg-secondary hover:bg-secondary': ''}`}>
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {link.icon}
        </div>
        <span className={`select-none transition-all duration-300 ${isAsideOpen ? 'opacity-100': 'opacity-0'}`}>{link.name}</span>
      </Link>
    </li>
    );
  });

  return (
    <>
      {navList}
    </>
  );
};