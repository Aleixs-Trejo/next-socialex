'use server';

import prisma from "@/lib/prisma";

export const getUserByToken = async (token: string) => {
  const user = await prisma.user.findFirst({
    where: {
      onboardingToken: token,
      onboardingTokenExpires: { gt: new Date() },
      onboardingCompleted: false,
    },
  });

  return user;
};