'use server';

import prisma from '@/lib/prisma';
import { ContentReactionType } from '@/generated/prisma/enums';

export const getReactionLikesSeason = async (serieId: string, seasonNumber: number) => {
  try {
    const season = await prisma.season.findUnique({
      where: { serieId_seasonNumber: { serieId, seasonNumber } },
      select: { id: true },
    });
    if (!season) return { ok: false, error: 'Temporada no encontrada' };

    const reactions = await prisma.contentReaction.findMany({
      where: { seasonId: season.id, type: ContentReactionType.LIKE },
      select: { user: { select: { id: true, name: true, image: true } } },
    });

    return { ok: true, data: reactions };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al obtener información' };
  }
};