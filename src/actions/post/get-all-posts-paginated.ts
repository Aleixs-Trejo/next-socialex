'use server';

import prisma from "@/lib/prisma";

export const getAllPostsPaginated = async (page: number = 1, limit: number = 10) => {
  try {
    const postsPaginated = await prisma.post.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
      select: {
        content: true,
        userId: true,
        media: true,
        comments: true,
        reactions: true,
      },
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