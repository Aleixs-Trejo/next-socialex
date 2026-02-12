'use server';

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const sendFriendRequest = async (receiverId: string) => {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return { ok: false, message: 'No autenticado'};
    }

    const senderId = session.user.id;

    if (senderId === receiverId) {
      return { ok: false, message: 'No puedes enviar una solicitud de amistad a ti mismo'};
    }

    const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
    if (!receiver) {
      return { ok: false, message: 'Usuario no encontrado' };
    }

    const existingFriendship = await prisma.friendship.findFirst({
      where: { OR: [{ senderId, receiverId }, { senderId: receiverId, receiverId: senderId }] }
    });

    if (existingFriendship) {
      if (existingFriendship.status === 'ACCEPTED') {
        return { ok: false, message: 'Ya son amigos' };
      }
      if (existingFriendship.status === 'PENDING') {
        return { ok: false, message: 'Ya existe una solicitud pendiente' };
      }
      if (existingFriendship.status === 'BLOCKED') {
        return { ok: false, message: 'No se pudo enviar la solicitud' };
      }
    }

    // Crear solicitud
    const newFriendship = await prisma.friendship.create({
      data: { senderId, receiverId, status: 'PENDING' },
      include: { receiver: { select: { id: true, name: true, image: true, profession: true, description: true } } }
    });

    revalidatePath('/');

    return { ok: true, message: 'Solicitud enviada correctamente', data: newFriendship };

  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al enviar solicitud' };
  }
};