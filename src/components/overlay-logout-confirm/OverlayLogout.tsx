import { useUIStore } from "@/stores";
import { logout } from "@/actions";
import { authClient } from "@/lib/auth-client";

export const OverlayLogoutConfirm = () => {
  const setIsModalLogoutOpen = useUIStore(state => state.setIsModalLogoutOpen);

  const logoutAction = async () => {
    await logout();
    await authClient.signOut();
  };

  return (
    <div className="overlay-logout-btns fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setIsModalLogoutOpen(false)}>
      <div className="w-9/10 max-w-sm mx-auto bg-accent-dark px-4 py-8 rounded-4xl" onClick={e => e.stopPropagation()}>
        <div className="flex flex-col gap-8">
          <h2 className="text-lg font-normal text-center">
            ¿En serio te vas?
          </h2>
          <div className="flex items-center justify-center gap-x-4 gap-y-2 flex-wrap w-full">
            <button type="button" className="cursor-pointer px-2 py-1 text-sm text-gray-300 transition-colors duration-300 hover:text-white" onClick={() => setIsModalLogoutOpen(false)}>No, quedarme</button>
            <button type="button" className="cursor-pointer px-6 py-2 text-sm bg-primary rounded-2xl transition-colors duration-300 hover:bg-secondary" onClick={logoutAction}>Me largo</button>
          </div>
        </div>
      </div>
    </div>
  );
};