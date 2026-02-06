'use server';

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getUserByToken } from "./get-user-by-token";

export const skipRegisterOnboarding = async (token: string) => {
  const findUser = await getUserByToken(token);
  if (!findUser) redirect('/auth/register');

  try {
    const transaction = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: findUser.id },
        data: {
          onboardingCompleted: true,
          onboardingSkippedAt: new Date(),
        },
      });

      await tx.verificationToken.deleteMany({
        where: { identifier: findUser.email },
      });
    });
    return { ok: true, message: 'Usuario actualizado correctamente', data: transaction };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al actualizar usuario' };
  }
};