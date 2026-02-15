'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaMusic } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";

const navLinks = [
  {
    name: 'Inicio',
    href: '/socialex/feed',
    icon: <IoMdHome size={22} className="text-white" />,
  },
  {
    name: 'Amigos',
    href: '/socialex/users',
    icon: <IoPeopleSharp size={22} className="text-white" />,
  },
  {
    name: 'Watch',
    href: '/socialex/watch',
    icon: <MdVideoLibrary size={22} className="text-white" />,
  },
  {
    name: 'Música',
    href: '/socialex/music',
    icon: <FaMusic size={20} className="text-white" />,
  },
  {
    name: 'Juegos',
    href: '/socialex/games',
    icon: <GiConsoleController size={24} className="text-white" />,
  }
];


export const NavList = () => {
  const pathname = usePathname();
  const navList = navLinks.map(link => (
    <li className="flex-1 flex" key={link.name}>
      <Link href={link.href} className={`flex w-full h-full justify-center items-center transition-colors duration-300 rounded-md ${pathname === link.href ? 'bg-secondary': ''}`}>{link.icon}</Link>
    </li>
  ));
  return (
    <>
      {navList}
    </>
  );
};