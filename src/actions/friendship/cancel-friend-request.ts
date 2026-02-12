'use server';

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const cancelFriendRequest = async (friendShipId: string) => {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { ok: false, message: 'No autenticado'};
    }

    const friendship = await prisma.friendship.findUnique({ where: { id: friendShipId } });

    if (!friendship) {
      return { ok: false, message: 'Solicitud no encontrada' };
    }

    // Solo el qu envió la puede cancelar
    if (friendship.senderId !== session.user.id) {
      return { ok: false, message: 'No autorizado' };
    }

    await prisma.friendship.delete({
      where: { id: friendShipId },
    });

    revalidatePath('/');

    return { ok: true, message: 'Solicitud cancelada correctamente' };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al cancelar solicitud' };
  }
};