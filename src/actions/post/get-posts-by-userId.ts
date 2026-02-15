'use server';

import prisma from "@/lib/prisma";

export const getPostByUserId = async (userId: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: { userId },
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
        media: {
          select: {
            id: true,
            url: true,
            type: true,
            order: true,
          }
        },
        reactions: {
          select: {
            id: true,
            userId: true,
            type: true,
          }
        },
        comments: {
          select: {
            id: true,
            userId: true,
            content: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      ok: true,
      message: 'Posts obtenidos correctamente',
      data: posts,
    }
  } catch (error) {
    console.log('Error: ', error);
    return {
      ok: false,
      message: 'Error al obtener posts',
    }
  }
};