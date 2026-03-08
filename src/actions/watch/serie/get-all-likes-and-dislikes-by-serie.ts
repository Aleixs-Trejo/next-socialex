'use server';

import prisma from '@/lib/prisma';

export const getAllLikesAndDislikesBySerie = async (serieIds: string[]) => {
  try {
    const reactions = await prisma.contentReaction.groupBy({
      by: ['serieId', 'type'],
      where: { serieId: { in: serieIds } },
      _count: { type: true },
    });

    const result: Record<string, { likes: number; dislikes: number }> = {};

    for (const reaction of reactions) {
      if (!reaction.serieId) continue;
      if (!result[reaction.serieId]) result[reaction.serieId] = { likes: 0, dislikes: 0 };
      if (reaction.type === 'LIKE') result[reaction.serieId].likes = reaction._count.type;
      else result[reaction.serieId].dislikes = reaction._count.type;
    }

    return { ok: true, data: result };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error: error };
  }
};