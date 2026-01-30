import {  signOut } from "next-auth/react";
import { logout } from "@/actions";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

export const OverlayLogoutBtn = ({ session }: Props) => {

  const logoutAction = async () => {
    await logout(session?.user?.email || '');
    signOut();
  };
  

  return (
    <button type="button" className="cursor-pointer px-6 py-2 text-sm bg-primary rounded-2xl transition-colors duration-300 hover:bg-secondary" onClick={logoutAction}>Me largo</button>
  );
};