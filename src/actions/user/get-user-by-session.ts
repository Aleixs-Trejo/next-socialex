'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUserBySession = async () => {
  try { 
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });
    
    return user;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};