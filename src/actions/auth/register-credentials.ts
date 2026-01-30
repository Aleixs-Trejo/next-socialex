'use server';

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getUserByToken } from "./get-user-by-token";
import { login } from "./login";

export const registerPassword = async (data: { password: string, token: string }) => {
  const findUser = await getUserByToken(data.token);
  if (!findUser) throw new Error('No se encontró el usuario');
  
  try {
    const passwordHashed = await bcrypt.hash(data.password, 10);
    await prisma.user.update({
      where: { email: findUser.email },
      data: { 
        passwordHashed,
        onboardingCompleted: false,
      }
    });

    await login(findUser.email, data.password);

  } catch (error: any) {
    console.log('Error: ', error);
    return error.message || 'Error';
  }
};