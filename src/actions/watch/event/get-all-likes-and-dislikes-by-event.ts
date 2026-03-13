'use server';

import prisma from '@/lib/prisma';

export const getAllLikesAndDislikesByEvents = async (eventsIds: string[]) => {
  try {
    const reactions = await prisma.contentReaction.groupBy({
      by: ['eventId', 'type'],
      where: { eventId: { in: eventsIds } },
      _count: { type: true },
    });

    const result: Record<string, { likes: number; dislikes: number }> = {};

    for (const reaction of reactions) {
      if (!reaction.eventId) continue;
      if (!result[reaction.eventId]) result[reaction.eventId] = { likes: 0, dislikes: 0 };
      if (reaction.type === 'LIKE') result[reaction.eventId].likes = reaction._count.type;
      else result[reaction.eventId].dislikes = reaction._count.type;
    }

    return { ok: true, data: result };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error: error, message: 'Error al obtener reacciones' };
  }
};