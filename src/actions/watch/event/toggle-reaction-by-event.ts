'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';
import { ContentReactionType } from '@/generated/prisma/enums';
import { revalidateTag } from 'next/cache';

export const toggleReactionByEvent = async (eventId: string, typeReaction: ContentReactionType) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return { ok: false, error: 'No Autenticado' };

    const userId = session.user.id;

    const isExististReaction = await prisma.contentReaction.findUnique({ where: { userId_eventId: { userId, eventId } } });

    if (isExististReaction) {
      if (isExististReaction.type === typeReaction) {
        await prisma.contentReaction.delete({ where: { userId_eventId: { userId, eventId } } });
        revalidateTag(`reaction-${eventId}`, { expire: 0 });
        return { ok: true, data: null };
      }

      await prisma.contentReaction.update({ where: { userId_eventId: { userId, eventId } }, data: { type: typeReaction } });
      revalidateTag(`reaction-${eventId}`, { expire: 0 });
      return { ok: true, data: typeReaction };
    }

    await prisma.contentReaction.create({ data: { userId, eventId, type: typeReaction } });
    revalidateTag(`reaction-${eventId}`, { expire: 0 });
    return { ok: true, data: typeReaction };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al reaccionar' };
  }
};