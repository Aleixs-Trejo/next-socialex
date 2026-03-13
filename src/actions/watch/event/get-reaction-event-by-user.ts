'use server';

import { cacheTag } from 'next/cache';
import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';

const getCachedReaction = async (eventId: string, userId: string) => {
  'use cache';
  cacheTag(`reaction-${eventId}`);

  const reaction = await prisma.contentReaction.findUnique({
    where: { userId_eventId: { userId, eventId } },
    select: { type: true },
  });

  return reaction?.type ?? null;
};

export const getReactionEventByUser = async (eventId: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return null;

    return await getCachedReaction(eventId, session.user.id);
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};