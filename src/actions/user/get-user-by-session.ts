'use server';

import prisma from "@/lib/prisma";
import { Session } from "next-auth";

export const getUserBySession = async (session: Session) => {
  try { 
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });
    return user;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};