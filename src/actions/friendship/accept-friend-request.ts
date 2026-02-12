'use server';

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const acceptFriendRequest = async (friendShipId: string) => {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return { ok: false, message: 'No autenticado'};
    }

    const friendship = await prisma.friendship.findUnique({ where: { id: friendShipId } });

    if (!friendship) {
      return { ok: false, message: 'Solicitud no encontrada' };
    }

    if (friendship.receiverId !== session.user.id) {
      return { ok: false, message: 'No puedes aceptar esta solicitud' };
    }

    const updateFriendship = await prisma.friendship.update({
      where: { id: friendShipId },
      data: { status: 'ACCEPTED' },
      include: { sender: { select: { id: true, name: true, image: true, profession: true, description: true } } }
    });

    revalidatePath('/');

    return {
      ok: true,
      message: 'Solicitud aceptada correctamente',
      data: updateFriendship,
    }
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al aceptar solicitud' };
  }
};