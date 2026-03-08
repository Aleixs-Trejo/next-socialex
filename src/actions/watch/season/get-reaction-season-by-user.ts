'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';

export const getReactionSeasonByUser = async (serieId: string, seasonNumber: number) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return null;

    const reaction = await prisma.contentReaction.findFirst({
      where: { userId: session.user.id, season: { serieId, seasonNumber } },
      select: { type: true },
    });

    return reaction?.type ?? null;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};