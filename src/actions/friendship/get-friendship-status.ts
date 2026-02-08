'use server';

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const getFriendshipStatus = async (userId: string) => {
  try {
    const session = await auth.api.getSession({
          headers: await headers(),
        });
    if (!session?.user) {
      return { ok: false, message: 'No autenticado'};
    }

    const currentUserId = session.user.id;

    if (currentUserId === userId) {
      return { ok: false, message: 'No autorizado' };
    }

    const friendship = await prisma.friendship.findFirst({
      where: { OR: [{ senderId: currentUserId, receiverId: userId }, { senderId: userId, receiverId: currentUserId }] }
    });

    if (!friendship) {
      return { ok: false, message: 'No son amigos' };
    }

    return {
      ok: true,
      data: {
        status: friendship.status,
        friendshipId: friendship.id,
        isSender: friendship.senderId === currentUserId,
      }
    }

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al obtener estado de amistad' };
  }
};