'use server';

import { cacheTag } from 'next/cache';
import { ContentContext } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getCommentsWatchByContext = async (context: ContentContext) => {
  'use cache';

  try {
    const comments = await prisma.commentWatch.findMany({
      where: {
        serieId: context.serieId ?? undefined,
        seasonId: context.seasonId ?? undefined,
        episodeId: context.episodeId ?? undefined,
        movieId: context.movieId ?? undefined,
        eventId: context.eventId ?? undefined,
      },
      include: { user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });

    if (context.serieId) cacheTag(`comments-serie-${context.serieId}`);
    if (context.seasonId) cacheTag(`comments-season-${context.seasonId}`);
    if (context.episodeId) cacheTag(`comments-episode-${context.episodeId}`);
    if (context.movieId) cacheTag(`comments-movie-${context.movieId}`);
    if (context.eventId) cacheTag(`comments-event-${context.eventId}`);

    return { ok: true, data: comments };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error };
  }
};