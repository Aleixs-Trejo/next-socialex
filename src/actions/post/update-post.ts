'use server';

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updatePost = async (postId: string, content: string) => {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return { ok: false, message: "No autorizado" };
    }

    await prisma.post.update({ where: { id: postId }, data: { content: content || null, updatedAt: new Date() } });
  
    revalidatePath("/socialex/feed");

    return { ok: true, message: "Publicación actualizada correctamente" };
  } catch (error) {
    console.log("Error: ", error);
    return {
      ok: false,
      message: "No se pudo actualizar la publicación",
    };
  }
};