'use server';

import prisma from "@/lib/prisma";

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { image: 'desc' },
    });
    return {
      ok: true,
      message: 'Usuarios obtenidos correctamente',
      data: users,
    }
  } catch (error) {
    console.log('Error: ', error);
    return {
      ok: false,
      message: 'Error al obtener usuarios',
    }
  }
};