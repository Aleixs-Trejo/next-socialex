"use server";

import { cookies } from "next/headers";
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
      name: "",
    },
  });

  if (!newUserRegister.token) {
    throw new Error("No se pudo crear la sesión");
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      onboardingToken: data.token,
      onboardingTokenExpires: verification.expires,
    },
  });

  const signInResult = await auth.api.signInEmail({
    body: {
      email,
      password: data.password,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("better-auth.session_token", signInResult.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { ok: true };
};
