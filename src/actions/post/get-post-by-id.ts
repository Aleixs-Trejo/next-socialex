"use server";

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export const getPostById = async (postId: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return {
        ok: false,
        message: "Debes iniciar sesión para acceder a esta página",
      };
    }

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
