'use server';

import { cacheTag } from 'next/cache';
import prisma from "@/lib/prisma";

export const getEpisodeByNumber = async (seasonId: string, episodeNumber: number) => {
  'use cache';
  cacheTag(`episode-${seasonId}-${episodeNumber}`);
  
  try {
    const episode = await prisma.episode.findFirst({
      where: { seasonId, episodeNumber },
      include: { commentsWatch: true, contentReactions: true },
    });
    return { ok: true, data: episode };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al obtener episodio' };
  }
};