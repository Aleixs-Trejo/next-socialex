"use server";

import { ReactionType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

export const getAllReactionsFromPost = async (postId: string) => {
  try {
    const reactions = await prisma.reaction.findMany({
      where: { postId },
      select: {
        type: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            profession: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const groupedReactions = reactions.reduce(
      (acc, reaction) => {
        if (!acc[reaction.type]) acc[reaction.type] = [];
        acc[reaction.type].push(reaction.user);
        return acc;
      },
      {} as Record<
        ReactionType,
        Array<{ id: string; name: string | null; image: string | null; profession: string | null }>
      >,
    );

    const totalReactions = reactions.length;
    const reactionCounts = Object.entries(groupedReactions).map(
      ([type, users]) => ({
        type,
        count: users.length,
        users,
      }),
    );

    return {
      ok: true,
      data: {
        reactions,
        groupedReactions,
        totalReactions,
        reactionCounts,
      },
      message: "Reacciones obtenidas correctamente",
    };
  } catch (error) {
    console.log("Error: ", error);
    return { ok: false, message: "Error al obtener las reacciones" };
  }
};
