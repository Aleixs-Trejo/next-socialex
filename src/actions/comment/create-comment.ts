'use server';

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createComment = async (postId: string, content: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { ok: false, message: 'No autorizado' };
    }

    const userId = session.user.id;

    if (!content.trim()) {
      return { ok: false, message: 'El comentario no puede estar vacío' };
    }

    await prisma.comment.create({ data: { content: content.trim(), userId, postId } });

    revalidatePath(`/socialex/post/${postId}`);

    return { ok: true, message: 'Comentario creado correctamente' };
  } catch (error) {
    console.log('Error: ', error);
    return {
      ok: false,
      message: 'Error al crear comentario',
    };
  }
};