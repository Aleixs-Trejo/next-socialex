'use server';

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteComment = async (commentId: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { ok: false, message: 'No autorizado' };
    }

    const userId = session.user.id;

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) return { ok: false, message: 'Comentario no encontrado' };

    if (comment.userId !== userId) return { ok: false, message: 'No autorizado' };

    await prisma.comment.delete({ where: { id: commentId } });

    revalidatePath(`/socialex/post/${comment.postId}`);

    return { ok: true, message: 'Comentario borrado correctamente' };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al borrar comentario' };
  }
};