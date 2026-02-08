'use server';

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const deleteFriend = async (friendshipId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return { ok: false, message: 'No autenticado'};
    }

    const friendship = await prisma.friendship.findUnique({ where: { id: friendshipId } });

    if (!friendship) {
      return { ok: false, message: 'Amigo no encontrado' };
    }

    // VErificar si hay amistac
    if (friendship.senderId !== session.user.id && friendship.receiverId !== session.user.id) {
      return { ok: false, message: 'No autorizado' };
    }

    await prisma.friendship.delete({
      where: { id: friendshipId },
    });

    revalidatePath('/');

    return { ok: true, message: 'Amigo eliminado correctamente' };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al eliminar amigo' };
  }
};