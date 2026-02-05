'use server';

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const registerEmail = async (email: string) => {
  const emailNormalized = email.toLowerCase();

  const exists = await prisma.user.findUnique({
    where: { email: emailNormalized },
  });

  if (exists) {
    return {
      ok: false,
      message: "El email ya está registrado",
    };
  }

  const token = crypto.randomUUID();

  const verificationIdentifierExsists = await prisma.verificationToken.findFirst({
    where: { identifier: emailNormalized },
  });

  if (verificationIdentifierExsists) {
    return {
      ok: false,
      message: "Ya existe una solicitud de registro para este email",
    };
  }

  await prisma.verificationToken.create({
    data: {
      identifier: emailNormalized,
      token,
      expires: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  redirect(`/onboarding?token=${token}`);
};
