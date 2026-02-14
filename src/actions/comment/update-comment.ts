'use server';

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateComment = async (commentId: string, content: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { ok: false, message: 'No autorizado' };
    }

    const userId = session.user.id;

    if (!content.trim()) {
      return { ok: false, message: 'El comentario no puede estar vacío' };
    }

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) return { ok: false, message: 'Comentario no encontrado' };

    if (comment.userId !== userId) return { ok: false, message: 'No autorizado' };

    await prisma.comment.update({ where: { id: commentId }, data: { content: content.trim() } });

    revalidatePath(`/socialex/post/${comment.postId}`);

    return { ok: true, message: 'Comentario actualizado correctamente' };
  } catch (error) {
    console.log('Error: ', error);
    return {
      ok: false,
      message: 'Error al actualizar comentario',
    };
  }
};