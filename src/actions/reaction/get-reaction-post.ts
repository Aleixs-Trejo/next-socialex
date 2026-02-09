'use server';

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export const getReactionPost = async (postId: string) => {
  const session = await getServerSession();
  if (!session?.user) {
    return { ok: false, message: 'No autenticado' };
  }

  try {
    const reaction = await prisma.reaction.findFirst({
      where: { postId, userId: session.user.id },
      select: { type: true },
    });
    return { ok: true, data: reaction, message: 'Reacción obtenida correctamente' };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al obtener la reacción' };
  }
};