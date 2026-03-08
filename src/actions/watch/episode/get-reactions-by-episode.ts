'use server';

import { cacheTag } from 'next/cache';
import prisma from '@/lib/prisma';

export const getReactionsByEpisode = async (episodeId: string) => {
  'use cache';
  cacheTag(`reaction-${episodeId}`);

  try {
    const reactions = await prisma.contentReaction.groupBy({
      by: ['episodeId', 'type'],
      where: { episodeId: { equals: episodeId } },
      _count: { type: true },
    });

    const result: Record<string, { likes: number; dislikes: number }> = {};

    for (const reaction of reactions) {
      if (!reaction.episodeId) continue;
      if (!result[reaction.episodeId]) result[reaction.episodeId] = { likes: 0, dislikes: 0 };
      if (reaction.type === 'LIKE') result[reaction.episodeId].likes = reaction._count.type;
      else result[reaction.episodeId].dislikes = reaction._count.type;
    }

    return { ok: true, data: result };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al obtener reacciones' };
  }
};