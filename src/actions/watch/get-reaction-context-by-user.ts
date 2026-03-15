'use server';

import { cacheTag } from 'next/cache';
import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';
import { ContentContext } from '@/interfaces';
import { Prisma } from '@/generated/prisma/client';

const whereUniqueCase = (field: keyof ContentContext, contentId: string, userId: string): Prisma.ContentReactionWhereUniqueInput => {
  const whereMap: Record<keyof ContentContext, Prisma.ContentReactionWhereUniqueInput> = { serieId: { userId_serieId: { userId, serieId:  contentId } }, seasonId: { userId_seasonId: { userId, seasonId: contentId } }, episodeId: { userId_episodeId: { userId, episodeId: contentId } }, movieId: { userId_movieId: { userId, movieId: contentId } }, eventId: { userId_eventId: { userId, eventId: contentId } } };
  return whereMap[field];
};

const getCachedReaction = async (field: keyof ContentContext, contentId: string, userId: string) => {
  'use cache';
  cacheTag(`reaction-${contentId}`);

  const reaction = await prisma.contentReaction.findUnique({
    where: whereUniqueCase(field, contentId, userId),
    select: { type: true },
  });

  return reaction?.type ?? null;
};

export const getReactionContextByUser = async (context: ContentContext) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return null;

    const field = (Object.keys(context) as (keyof ContentContext)[]).find((key) => context[key]);
    if (!field) return null;

    return await getCachedReaction(field, context[field]!, session.user.id);
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};


