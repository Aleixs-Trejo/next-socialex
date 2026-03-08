'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export const deleteCommentWatchContext = async (commentId: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return { ok: false, error: 'No Autenticado' };

    const existing = await prisma.commentWatch.findUnique({ where: { id: commentId } });
    if (!existing) return { ok: false, error: 'Comentario no encontrado' };
    if (existing.userId !== session.user.id) return { ok: false, error: 'No tienes permisos' };

    const deletedComment = await prisma.commentWatch.delete({ where: { id: commentId } });
    
    revalidateTag(`comments-episode-${existing.episodeId}`, { expire: 0 });
    return { ok: true, data: deletedComment };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error };
  }
};