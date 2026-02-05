'use server';

import { headers } from "next/headers";
import { OnboardingUpdateInput } from "@/interfaces";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getUserByToken } from "./get-user-by-token";
import { redirect } from "next/navigation";

export const updateRegisterOnboarding = async (data: OnboardingUpdateInput, token: string) => {
  const user = await getUserByToken(token);
  if (!user) redirect("/auth/register");

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        description: data.description,
        profession: data.profession,
        birthdate: data.birthdate ? new Date(data.birthdate) : undefined,
        image: data.image,
      },
    });

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};
