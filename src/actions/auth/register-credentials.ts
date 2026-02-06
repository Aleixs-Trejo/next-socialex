"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const registerPassword = async (data: {
  password: string;
  token: string;
}) => {
  const verification = await prisma.verificationToken.findFirst({
    where: {
      token: data.token,
      expires: { gt: new Date() },
    },
  });

  if (!verification) {
    throw new Error("Token inválido o expirado");
  }

  const email = verification.identifier;

  const newUserRegister = await auth.api.signUpEmail({
    body: {
      email,
      password: data.password,
      name: email.split("@")[0],
    },
  });

  if (!newUserRegister.token) {
    throw new Error("No se pudo crear la sesión");
  }

  await prisma.user.update({
    where: { email },
    data: {
      onboardingToken: data.token,
      onboardingTokenExpires: verification.expires,
    },
  });

  return { ok: true, email };
};
