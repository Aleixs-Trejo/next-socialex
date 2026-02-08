'use server';

import prisma from "@/lib/prisma";

export const getAllPostsPaginated = async (page: number = 1, limit: number = 10) => {
  try {
    const postsPaginated = await prisma.post.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
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
      }
    });

    return {
      ok: true,
      message: 'Posts obtenidos correctamente',
      data: postsPaginated,
    }
  } catch (error) {
    console.log('Error: ', error);
    return {
      ok: false,
      message: 'Error al obtener posts',
    }
  }
};