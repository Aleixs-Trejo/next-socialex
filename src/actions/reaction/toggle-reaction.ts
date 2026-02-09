'use server';

import { ReactionType } from "@/generated/prisma/enums";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleReaction = async (postId: string, reaction: ReactionType, currentPath?: string) => {
  const session = await getServerSession();

  if (!session?.user) {
    return { ok: false, message: 'No autenticado' };
  }

  try {
    const existingReaction = await prisma.reaction.findFirst({
      where: { postId, userId: session.user.id },
    });
  
    if (existingReaction && existingReaction.type === reaction) {
      await prisma.reaction.delete({
        where: { id: existingReaction.id },
      });

      if (currentPath) revalidatePath(currentPath);
  
      return { ok: true, message: 'Reactión eliminada correctamente' };
    }
  
    if (existingReaction && existingReaction.type !== reaction) {
      await prisma.reaction.update({
        where: { id: existingReaction.id },
        data: { type: reaction },
      });

      if (currentPath) revalidatePath(currentPath);
  
      return { ok: true, message: 'Reactión actualizada correctamente' };
    }
  
    // Crear reacción
    await prisma.reaction.create({
      data: { postId, userId: session.user.id, type: reaction },
    });

    if (currentPath) revalidatePath(currentPath);
    
    return { ok: true, message: 'Reactión creada correctamente' };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error en la reacción' };
  }

};