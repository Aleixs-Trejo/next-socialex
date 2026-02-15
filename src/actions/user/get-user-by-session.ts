'use server';

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-server-session";

export const getUserBySession = async () => {
  try { 
    const session = await getServerSession();

    if (!session?.user) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        posts: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                profession: true,
                statusProfile: true,
              }
            },
            media: true,
            comments: true,
            reactions: true,
          }
        },
        comments: true,
        reactions: true,
      }
    });

    return user;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};