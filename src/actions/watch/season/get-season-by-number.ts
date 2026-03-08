'use server';

import { cacheTag } from 'next/cache';
import prisma from "@/lib/prisma";

export const getSeasonByNumber = async (serieId: string, seasonNumber: number) => {
  'use cache';
  cacheTag(`season-${serieId}-${seasonNumber}`);
  
  try {
    const season = await prisma.season.findFirst({
      where: { serieId, seasonNumber },
      include: { episodes: true },
    });
    return { ok: true, data: season };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al obtener la temporada' };
  }
};