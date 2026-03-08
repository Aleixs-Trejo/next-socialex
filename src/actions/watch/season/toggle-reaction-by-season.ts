'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';
import { ContentReactionType } from '@/generated/prisma/enums';
import { revalidatePath } from 'next/cache';

export const toggleReactionBySeason = async (serieId: string, seasonNumber: number, typeReaction: ContentReactionType) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return { ok: false, error: 'No Autenticado' };

    const userId = session.user.id;

    const season = await prisma.season.findUnique({
      where: { serieId_seasonNumber: { serieId, seasonNumber } },
      select: { id: true },
    });
    if (!season) return { ok: false, error: 'Temporada no encontrada' };

    const seasonId = season.id;

    const existingReaction = await prisma.contentReaction.findUnique({
      where: { userId_seasonId: { userId, seasonId } },
    });

    if (existingReaction) {
      if (existingReaction.type === typeReaction) {
        await prisma.contentReaction.delete({ where: { userId_seasonId: { userId, seasonId } } });
        revalidatePath(`/socialex/watch/${serieId}`);
        revalidatePath(`/socialex/watch/${serieId}/${seasonNumber}`);
        return { ok: true, data: null };
      }

      await prisma.contentReaction.update({
        where: { userId_seasonId: { userId, seasonId } },
        data: { type: typeReaction },
      });
      revalidatePath(`/socialex/watch/${serieId}`);
      revalidatePath(`/socialex/watch/${serieId}/${seasonNumber}`);
      return { ok: true, data: typeReaction };
    }

    await prisma.contentReaction.create({ data: { userId, seasonId, type: typeReaction } });
    revalidatePath(`/socialex/watch/${serieId}`);
    revalidatePath(`/socialex/watch/${serieId}/${seasonNumber}`);
    return { ok: true, data: typeReaction };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error };
  }
};