"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const getPostById = async (postId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user) {
      return {
        ok: false,
        message: "Debes iniciar sesión para acceder a esta página",
      };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
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
