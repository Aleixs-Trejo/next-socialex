'use server';

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const logout = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { ok: false, message: 'No hay sesión activa' };
  }

  try {
    const logoutDB = await prisma.user.update({
      where: { id: session.user.id },
      data: { statusProfile: 'OFFLINE' },
    });

    console.log('logoutDB: ', logoutDB);

    return { ok: true, message: 'Sesión cerrada correctamente' };
  } catch (error) {
    console.error("Error en logout:", error);
    return {
      ok: false,
      message: 'Error al cerrar sesión',
    };
  }
};