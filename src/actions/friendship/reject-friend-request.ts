'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const rejectFriendRequest = async (friendShipId: string) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return { ok: false, message: 'No autenticado'};
    }

    const friendship = await prisma.friendship.findUnique({ where: { id: friendShipId } });

    if (!friendship) {
      return { ok: false, message: 'Solicitud no encontrada' };
    }

    if (friendship.receiverId !== session.user.id) {
      return { ok: false, message: 'No autorizado' };
    }

    await prisma.friendship.update({
      where: { id: friendShipId },
      data: { status: 'REJECTED' },
    });

    revalidatePath('/');

    return { ok: true, message: 'Solicitud rechazada correctamente' };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al rechazar solicitud' };
  }
};