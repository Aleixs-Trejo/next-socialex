'use server';

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { ok: false, message: 'No autorizado' };
    }

    await prisma.post.delete({ where: { id: postId } });

    revalidatePath('/socialex/feed');

    return { ok: true, message: 'Publicación eliminada correctamente' };
  } catch (error) {
    console.log('Error: ', error);
    return {
      ok: false,
      message: 'No se pudo eliminar la publicación',
    };
  }
};