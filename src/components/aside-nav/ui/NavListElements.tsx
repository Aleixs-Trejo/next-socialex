import Link from "next/link";
import { usePathname } from "next/navigation";
import { BetterAuthSession } from "@/types";
import { useUIStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { FaMusic } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";
import { ImageCustom } from "@/components/image-custom/ImageCustom";

const navLinks = [
  {
    name: 'Inicio',
    href: '/socialex/feed',
    icon: <IoMdHome size={24} className="text-white" />,
  },
  {
    name: 'Usuarios',
    href: '/socialex/users',
    icon: <IoPeopleSharp size={24} className="text-white" />,
  },
  {
    name: 'Multimedia',
    href: '/socialex/watch',
    icon: <MdVideoLibrary size={22} className="text-white" />,
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
  session: BetterAuthSession | null;
}

export const NavListElements = ({ session }: Props) => {
  const pathname = usePathname();
  const isAsideOpen = useUIStore(useShallow(state => state.isAsideOpen));

  const navList = navLinks.map(link => {
    return (
    <li className="flex-1 flex border-b border-tertiary" key={link.name}>
      <Link href={link.href} className={`flex gap-4 w-full h-full items-center transition-colors duration-300 rounded-md hover:bg-quaternary ${pathname === link.href ? 'bg-secondary hover:bg-secondary': ''}`} draggable={false}>
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
      {session?.user && (
        <li className="flex-1 flex border-b border-tertiary">
          <Link href="socialex/profile" className={`w-full h-full flex gap-4 items-center transition-colors duration-300 rounded-md hover:bg-quaternary ${pathname === 'socialex/profile' ? 'bg-secondary hover:bg-secondary': ''}`} draggable={false}>
            <div className="w-16 h-16 shrink-0 flex items-center justify-center overflow-hidden">
              <ImageCustom
                className="w-10 h-10 rounded-full"
                src={session?.user.image || undefined}
                alt="Avatar"
                width={24}
                height={24}
                />
            </div>
            <span className={`min-w-max select-none transition-all duration-300 ${isAsideOpen ? 'opacity-100': 'opacity-0'}`}>{session.user.name}</span>
          </Link>
        </li>
      )}
      {navList}
    </>
  );
};