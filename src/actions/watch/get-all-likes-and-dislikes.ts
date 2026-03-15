'use server';

import prisma from '@/lib/prisma';
import { ContentContext } from '@/interfaces';
import { ContentReactionType } from '@/generated/prisma/enums';

interface UserReaction {
  id: string;
  name: string | null;
  image: string | null;
}

interface ReactionResult {
  likes: number;
  dislikes: number;
  likeUsers: UserReaction[];
  dislikeUsers: UserReaction[];
}

export const getAllLikesAndDislikes = async (field: keyof ContentContext, ids: string[]) => {
  try {
    const reactions = await prisma.contentReaction.findMany({
      where: { [field]: { in: ids } },
      select: {
        [field]: true,
        type: true,
        user: { select: { id: true, name: true, image: true } },
      },
    });

    const result: Record<string, ReactionResult> = {};

    for (const reaction of reactions) {
      const reactionId = reaction[field as keyof typeof reaction] as string | null;
      if (!reactionId) continue;
      if (!result[reactionId]) result[reactionId] = { likes: 0, dislikes: 0, likeUsers: [], dislikeUsers: [] };

      if (reaction.type === ContentReactionType.LIKE) {
        result[reactionId].likes++;
        result[reactionId].likeUsers.push(reaction.user);
      } else {
        result[reactionId].dislikes++;
        result[reactionId].dislikeUsers.push(reaction.user);
      }
    }

    return { ok: true, data: result, message: 'Reacciones obtenidas correctamente' };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al obtener reacciones' };
  }
};