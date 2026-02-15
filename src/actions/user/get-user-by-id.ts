'use server';

import prisma from "@/lib/prisma";

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        posts: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                profession: true,
                statusProfile: true,
              }
            },
            media: true,
            comments: true,
            reactions: true,
          }
        },
        comments: true,
        reactions: true,
      }
    });
    return {
      ok: true,
      message: 'Usuario obtenido correctamente',
      data: user,
    }
  } catch (error) {
    console.log('Error: ', error);
    return {
      ok: false,
      message: 'Error al obtener usuario',
    }
  }
};