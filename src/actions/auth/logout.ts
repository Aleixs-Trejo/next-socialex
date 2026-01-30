'use server';

import prisma from "@/lib/prisma";

export const logout = async (email: string) => {
  try {
    await prisma.user.update({
      where: { email },
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