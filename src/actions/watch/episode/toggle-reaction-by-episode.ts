'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';
import { ContentReactionType } from '@/generated/prisma/enums';
import { revalidateTag } from 'next/cache';

export const toggleReactionByEpisode = async (episodeId: string, typeReaction: ContentReactionType) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return { ok: false, error: 'No Autenticado' };

    const userId = session.user.id;

    const isExististReaction = await prisma.contentReaction.findUnique({ where: { userId_episodeId: { userId, episodeId } } });

    if (isExististReaction) {

      // Eliminar reacción si elige la misma
      if (isExististReaction.type === typeReaction) {
        await prisma.contentReaction.delete({ where: { userId_episodeId: { userId, episodeId } } });
        revalidateTag(`reactions-${episodeId}`, { expire: 0 });
        return { ok: true, data: null };
      }

      // Cambiar reacción
      await prisma.contentReaction.update({ where: { userId_episodeId: { userId, episodeId } }, data: { type: typeReaction } });
      revalidateTag(`reactions-${episodeId}`, { expire: 0 });
      return { ok: true, data: typeReaction };
    }

    // Crear reacción
    await prisma.contentReaction.create({ data: { userId, episodeId, type: typeReaction } });
    revalidateTag(`reactions-${episodeId}`, { expire: 0 });
    return { ok: true, data: typeReaction };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error };
  }
};