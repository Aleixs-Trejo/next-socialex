'use server';

import { ContentReactionType } from '@/generated/prisma/enums';
import prisma from '@/lib/prisma';

export const getReactionLikeUsers = async (serieId: string) => {
  try {
    const reactions = await prisma.contentReaction.findMany({
      where: { serieId, type: ContentReactionType.LIKE },
      select: { user: { select: { id: true, name: true, image: true } } },
    });
    return { ok: true, data: reactions };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error };
  }
};