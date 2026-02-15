'use server';

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export const logout = async () => {
  const session = await getServerSession()

  if (!session?.user) {
    return { ok: false, message: 'No hay sesión activa' };
  }

  try {
    const logoutDB = await prisma.user.update({
      where: { id: session.user.id },
      data: { statusProfile: 'OFFLINE' },
    });

    return { ok: true, message: 'Sesión cerrada correctamente' };
  } catch (error) {
    console.error("Error en logout:", error);
    return {
      ok: false,
      message: 'Error al cerrar sesión',
    };
  }
};