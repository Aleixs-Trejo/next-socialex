'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';
import { ContextComment } from '@/interfaces';
import { revalidateTag } from 'next/cache';

export const createCommentWatchContext = async (context: ContextComment, content: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return { ok: false, error: 'No Autenticado' };

    if (!content.trim()) return { ok: false, error: 'Comenta algo válido' };
    if (content.length > 500) return { ok: false, error: 'Tu comentario es muy largo' };

    if (!context.serieId && !context.seasonId && !context.episodeId) return { ok: false, error: 'Error al agregar comentario' };

    const comment = await prisma.commentWatch.create({
      data: {
        content: content.trim(),
        userId: session.user.id,
        serieId: context.serieId ?? null,
        seasonId: context.seasonId ?? null,
        episodeId: context.episodeId ?? null,
      },
      include: { user: { select: { id: true, name: true, image: true } } },
    });

    revalidateTag(`comments-episode-${context.episodeId}`, { expire: 0 });
    return { ok: true, data: comment };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error };
  }
};