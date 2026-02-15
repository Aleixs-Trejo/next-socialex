'use server';

import prisma from "@/lib/prisma";

export const getComments = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            profession: true,
          }
        },
        reactions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                profession: true,
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'asc' },
    });
    return { ok: true, message: 'Comentarios obtenidos correctamente', data: comments };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al obtener comentarios', data: null };
  }
};