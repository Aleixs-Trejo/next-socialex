import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useUIStore } from "@/stores";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { logout } from "@/actions";

export const MenuProfileHeaderOptions = () => {
  const router = useRouter();
  const setIsOpenMenuProfilHeader = useUIStore(state => state.setIsOpenMenuProfilHeader);

  const handleLogout = async () => {
    await logout();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth/login');
        },
      }
    });
  };

  return (
    <div className="min-w-40 rounded-sm p-2 bg-black border border-tertiary animate-fade-in absolute top-16 right-0 z-50">
      <ul className="flex flex-col" onClick={() => setIsOpenMenuProfilHeader(false)}>
        <li className="w-full border-b border-tertiary">
          <Link href="/socialex/profile" className="flex items-center justify-center gap-2 w-full h-full py-2 rounded-md hover:bg-tertiary transition-colors duration-300">
            <FaUser size={16} className="text-white" />
            <span className="text-sm text-white text-center">Mi Perfil</span>
          </Link>
        </li>
        <li className="w-full">
          <button className="flex items-center justify-end w-full h-full gap-2 p-2 rounded-md hover:bg-tertiary transition-colors duration-300 cursor-pointer" onClick={handleLogout}>
            <IoLogOutOutline size={16} className="text-white" />
            <span className="text-sm text-white">Salir</span>
          </button>
        </li>
      </ul>
    </div>
  );
};