'use server';

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { getUserByToken } from "./get-user-by-token";

export const startRegisterOnboarding = async (data: { name: string, password?: string, token: string }) => {
  const findUser = await getUserByToken(data.token);
  if (!findUser) redirect('/auth/register');

  try {
    await prisma.user.update({
    where: { id: findUser.id },
      data: {
        name: data.name,
        passwordHashed: data.password ? await bcrypt.hash(data.password, 10) : undefined,
      },
    });

  } catch (error) {
    console.log('Error: ', error);
  }
};