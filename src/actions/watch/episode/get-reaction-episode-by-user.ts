'use server';

import { cacheTag } from 'next/cache';
import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';

const getCachedReaction = async (episodeId: string, userId: string) => {
  'use cache';
  cacheTag(`reactions-${episodeId}`);

  const reaction = await prisma.contentReaction.findUnique({
    where: { userId_episodeId: { userId, episodeId } },
    select: { type: true },
  });

  return reaction?.type ?? null;
};

export const getReactionEpisodeByUser = async (episodeId: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return null;

    return await getCachedReaction(episodeId, session.user.id);
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};