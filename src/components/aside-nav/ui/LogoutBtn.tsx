import { OverlayLogoutConfirm } from "@/components";
import { useUIStore } from "@/stores";
import { IoLogOutOutline } from "react-icons/io5";


export const LogoutBtn = () => {
  const isModalLogoutOpen = useUIStore(state => state.isModalLogoutOpen);
  const isAsideOpen = useUIStore(state => state.isAsideOpen);
  const setIsModalLogoutOpen = useUIStore(state => state.setIsModalLogoutOpen);

  return (
    <>
      <button type="button" className="w-full cursor-pointer transition-colors duration-300 hover:bg-secondary" onClick={() => setIsModalLogoutOpen(true)}>
        <div className="flex items-center h-full">
          <div className="p-5 aspext-square flex items-center justify-center shrink-0">
            <IoLogOutOutline size={24} className="text-white m-auto" />
          </div>
          <span className={`text-base select-none transition-opacity duration-300 w-max ${isAsideOpen ? 'opacity-100' : 'opacity-0'}`}>Salir</span>
        </div>
      </button>
      {
        isModalLogoutOpen && (
          <OverlayLogoutConfirm />
        )
      }
    </>
  );
};