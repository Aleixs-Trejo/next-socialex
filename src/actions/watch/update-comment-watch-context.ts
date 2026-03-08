'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export const updateCommentWatchContext = async (commentId: string, content: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return { ok: false, error: 'No Autenticado' };

    if (!content.trim()) return { ok: false, error: 'Comenta algo válido' };
    if (content.length > 500) return { ok: false, error: 'Tu comentario es muy largo' };

    const existing = await prisma.commentWatch.findUnique({ where: { id: commentId } });
    if (!existing) return { ok: false, error: 'Comentario no encontrado' };
    if (existing.userId !== session.user.id) return { ok: false, error: 'No tienes permisos' };

    const updatedComment = await prisma.commentWatch.update({
      where: { id: commentId },
      data: { content: content.trim() },
      include: { user: { select: { id: true, name: true, image: true } } },
    });
    
    revalidateTag(`comments-episode-${existing.episodeId}`, { expire: 0 });
    return { ok: true, data: updatedComment };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error };
  }
};