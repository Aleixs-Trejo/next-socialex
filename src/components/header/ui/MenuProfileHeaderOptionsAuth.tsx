import Link from "next/link";
import { BtnProfileHeader } from "./BtnProfileHeader";

const LINKS_AUTH = [
  { label: 'Ingresar', href: '/auth/login' },
  { label: 'Registro', href: '/auth/register' },
];

export const MenuProfileHeaderOptionsAuth = () => {

  const linksMap = LINKS_AUTH.map((link) => (
    <li key={link.label} className="border-b border-tertiary last:border-none">
      <Link href={link.href} className="flex items-center justify-center gap-2 text-sm w-full h-full py-2 rounded-md hover:bg-tertiary transition-colors duration-300">
        {link.label}
      </Link>
    </li>
  ));

  return (
    <BtnProfileHeader>
      <ul className="flex flex-col">
        {linksMap}
      </ul>
    </BtnProfileHeader>
  )
};