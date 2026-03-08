'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';

export const getReactionSerieByUser = async (serieId: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return null;

    const reaction = await prisma.contentReaction.findUnique({
      where: { userId_serieId: { userId: session.user.id, serieId: serieId } },
      select: { type: true },
    });

    return reaction?.type ?? null;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};