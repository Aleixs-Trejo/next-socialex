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
        user: true,
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
