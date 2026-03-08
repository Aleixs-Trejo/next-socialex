'use server';

import prisma from '@/lib/prisma';

export const getAllLikesAndDislikesBySeasons = async (seasonIds: string[]) => {
  try {
    const reactions = await prisma.contentReaction.groupBy({
      by: ['seasonId', 'type'],
      where: { seasonId: { in: seasonIds } },
      _count: { type: true },
    });

    const result: Record<string, { likes: number; dislikes: number }> = {};

    for (const reaction of reactions) {
      if (!reaction.seasonId) continue;
      if (!result[reaction.seasonId]) result[reaction.seasonId] = { likes: 0, dislikes: 0 };
      if (reaction.type === 'LIKE') result[reaction.seasonId].likes = reaction._count.type;
      else result[reaction.seasonId].dislikes = reaction._count.type;
    }

    return { ok: true, data: result };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error: error };
  }
};