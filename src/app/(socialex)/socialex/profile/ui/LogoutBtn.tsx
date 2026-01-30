'use client';

import { useUIStore } from "@/stores";

export const LogoutBtn = () => {
  const setIsModalLogoutOpen = useUIStore(state => state.setIsModalLogoutOpen);

  return (
    <div className="flex flex-col gap 6">
      <button
        className="btn-primary w-max"
        onClick={() => setIsModalLogoutOpen(true)}
      >
        Cerrar sesión
      </button>
    </div>
  );
};