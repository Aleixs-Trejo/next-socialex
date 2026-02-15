"use server";

import prisma from "@/lib/prisma";

export const getPostById = async (postId: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
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
        reactions: true,
        comments: true
      }
    });
    return {
      ok: true,
      message: "Post obtenido correctamente",
      data: post,
    };
  } catch (error) {
    console.log("Error: ", error);
    return {
      ok: false,
      message: "Error al obtener post",
    };
  }
};
