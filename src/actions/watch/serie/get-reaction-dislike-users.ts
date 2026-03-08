'use server';

import { ContentReactionType } from '@/generated/prisma/enums';
import prisma from '@/lib/prisma';

export const getReactionDislikeUsers = async (serieId: string) => {
  try {
    const reactions = await prisma.contentReaction.findMany({
      where: { serieId: serieId, type: ContentReactionType.DISLIKE },
      select: { user: { select: { id: true, name: true, image: true } } },
    });
    return { ok: true, data: reactions };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error };
  }
};