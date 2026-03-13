'use server';

import { cacheTag } from 'next/cache';
import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';

const getCachedReaction = async (movieId: string, userId: string) => {
  'use cache';
  cacheTag(`reaction-${movieId}`);

  const reaction = await prisma.contentReaction.findUnique({
    where: { userId_movieId: { userId, movieId } },
    select: { type: true },
  });

  return reaction?.type ?? null;
};

export const getReactionMovieByUser = async (movieId: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return null;

    return await getCachedReaction(movieId, session.user.id);
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};