'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getUserByToken } from "./get-user-by-token";

export const skipRegisterOnboarding = async (token: string) => {
  const findUser = await getUserByToken(token);
  if (!findUser) redirect('/auth/register');

  try {
    const updatedUser = await prisma.user.update({
      where: { id: findUser.id },
      data: {
        onboardingCompleted: true,
        onboardingSkippedAt: new Date(),
      },
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};