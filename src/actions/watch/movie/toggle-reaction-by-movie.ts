'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';
import { ContentReactionType } from '@/generated/prisma/enums';
import { revalidateTag } from 'next/cache';

export const toggleReactionByMovie = async (movieId: string, typeReaction: ContentReactionType) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return { ok: false, error: 'No Autenticado' };

    const userId = session.user.id;

    const isExististReaction = await prisma.contentReaction.findUnique({ where: { userId_movieId: { userId, movieId } } });

    if (isExististReaction) {
      if (isExististReaction.type === typeReaction) {
        await prisma.contentReaction.delete({ where: { userId_movieId: { userId, movieId } } });
        revalidateTag(`reaction-${movieId}`, { expire: 0 });
        return { ok: true, data: null };
      }

      await prisma.contentReaction.update({ where: { userId_movieId: { userId, movieId } }, data: { type: typeReaction } });
      revalidateTag(`reaction-${movieId}`, { expire: 0 });
      return { ok: true, data: typeReaction };
    }

    await prisma.contentReaction.create({ data: { userId, movieId, type: typeReaction } });
    revalidateTag(`reaction-${movieId}`, { expire: 0 });
    return { ok: true, data: typeReaction };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al reaccionar' };
  }
};