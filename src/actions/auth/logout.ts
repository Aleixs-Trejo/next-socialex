'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const logout = async () => {
  const session = await auth();
  if (!session?.user) return;

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { statusProfile: 'OFFLINE' },
    });
  } catch (error) {
    console.error("Error en logout:", error);
    return {
      ok: false,
      message: 'Error al cerrar sesión',
    }
  }
};