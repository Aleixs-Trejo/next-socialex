'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';
import { ContentReactionType } from '@/generated/prisma/enums';
import { ContentContext } from '@/interfaces';
import { Prisma } from '@/generated/prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';

const whereUniqueCase = (field: keyof ContentContext, contentId: string, userId: string): Prisma.ContentReactionWhereUniqueInput => {
  const whereMap: Record<keyof ContentContext, Prisma.ContentReactionWhereUniqueInput> = { serieId: { userId_serieId: { userId, serieId: contentId } }, seasonId: { userId_seasonId: { userId, seasonId: contentId } }, episodeId: { userId_episodeId: { userId, episodeId: contentId } }, movieId: { userId_movieId: { userId, movieId: contentId } }, eventId: { userId_eventId: { userId, eventId: contentId } } };
  return whereMap[field];
};

export const toggleReactionByContext = async (context: ContentContext, typeReaction: ContentReactionType, options?: { path?: string; tag?: string }) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return { ok: false, message: 'No Autenticado' };

    const userId = session.user.id;

    const field = (Object.keys(context) as (keyof ContentContext)[]).find((key) => context[key]);
    if (!field) return { ok: false, message: 'Error al obtener reacciones' };

    const contentId = context[field] as string;
    const whereUnique = whereUniqueCase(field, contentId, userId);

    const existingReaction = await prisma.contentReaction.findUnique({ where: whereUnique });

    const revalidate = () => {
      if (options?.path) revalidatePath(options.path);
      if (options?.tag) revalidateTag(options.tag, { expire: 0 });
    }

    if (existingReaction) {
      if (existingReaction.type === typeReaction) {
        await prisma.contentReaction.delete({ where: whereUnique });
        revalidate();
        return { ok: true, data: null };
      }

      await prisma.contentReaction.update({ where: whereUnique, data: { type: typeReaction } });
      revalidate();
      return { ok: true, data: typeReaction };
    }

    await prisma.contentReaction.create({ data: { userId, [field]: contentId, type: typeReaction } });
    revalidate();
    return { ok: true, data: typeReaction };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al reaccionar' };
  }
};