'use client';

import { logout } from "@/actions";
import { signOut, useSession } from "next-auth/react";

export const LogoutBtn = () => {
  const { data: session } = useSession();

  if (!session?.user) return <h2>Cargando...</h2>;

  const logoutAction = async () => {
    await logout(session?.user?.email || '');
    signOut();
  };

  return (
    <div className="flex flex-col gap 6">
      <button
        className="btn-primary w-max"
        onClick={logoutAction}
      >
      Cerrar sesión
    </button>
    </div>
  );
};