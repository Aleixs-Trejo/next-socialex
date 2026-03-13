'use server';

import { cacheTag } from 'next/cache';
import prisma from '@/lib/prisma';

export const getReactionsByMovie = async (movieId: string) => {
  'use cache';
  cacheTag(`reactions-movie-${movieId}`);
  
  try {
    const reactions = await prisma.contentReaction.findMany({
      where: { movieId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });

    const result: Record<string, { likes: number; dislikes: number }> = {};

    for (const reaction of reactions) {
      if (!reaction.movieId) continue;
      if (!result[reaction.userId]) result[reaction.userId] = { likes: 0, dislikes: 0 };
      if (reaction.type === 'LIKE') result[reaction.userId].likes++;
      else result[reaction.userId].dislikes++;
    }

    return { ok: true, data: result };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al obtener reacciones' };
  }
};