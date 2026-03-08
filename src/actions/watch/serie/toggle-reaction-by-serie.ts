'use server';

import { getServerSession } from '@/lib/get-server-session';
import prisma from '@/lib/prisma';
import { ContentReactionType } from '@/generated/prisma/enums';
import { revalidatePath } from 'next/cache';

export const toggleReactionBySerie = async (serieId: string, typeReaction: ContentReactionType) => {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) return { ok: false, error: 'No Autenticado' };

    const userId = session.user.id;

    const isExististReaction = await prisma.contentReaction.findUnique({ where: { userId_serieId: { userId, serieId } } });

    if (isExististReaction) {

      // Eliminar reacción si elige la misma
      if (isExististReaction.type === typeReaction) {
        await prisma.contentReaction.delete({ where: { userId_serieId: { userId, serieId } } });
        revalidatePath(`/socialex/watch`);
        revalidatePath(`/socialex/watch/${serieId}`);
        return { ok: true, data: null };
      }

      // Cambiar reacción
      await prisma.contentReaction.update({ where: { userId_serieId: { userId, serieId } }, data: { type: typeReaction } });
      revalidatePath(`/socialex/watch`);
      revalidatePath(`/socialex/watch/${serieId}`);
      return { ok: true, data: typeReaction };
    }

    // Crear reacción
    await prisma.contentReaction.create({ data: { userId, serieId, type: typeReaction } });
    revalidatePath(`/socialex/watch`);
    revalidatePath(`/socialex/watch/${serieId}`);
    return { ok: true, data: typeReaction };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error };
  }
};