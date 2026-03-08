'use server';

import { cacheTag } from 'next/cache';
import { ContextComment } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getCommentsWatchByContext = async (context: ContextComment) => {
  'use cache';
  cacheTag(`comments-episode-${context.episodeId}`);

  try {
    const comments = await prisma.commentWatch.findMany({
      where: {
        serieId: context.serieId ?? undefined,
        seasonId: context.seasonId ?? undefined,
        episodeId: context.episodeId ?? undefined,
      },
      include: { user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return { ok: true, data: comments };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error };
  }
};