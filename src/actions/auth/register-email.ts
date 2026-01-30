'use server';

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const registerEmail = async (email: string) => {
  const token = crypto.randomUUID();

  const isExists = await prisma.user.findUnique({
    where: { email },
  });

  if (isExists) {
    return {
      ok: false,
      message: 'El email ya está registrado',
    }
  };

  const user = await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: {
      onboardingToken: token,
      onboardingTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
    },
    create: { 
      email: email.toLowerCase(),
      onboardingToken: token,
      onboardingTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
    }
  });

  if (!user) {
    return {
      ok: false,
      message: 'No se pudo registrar el usuario',
    };
  }

  redirect(`/onboarding?auth=credentials&token=${token}`);
};