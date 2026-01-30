'use server';

import { OnboardingUpdateInput } from "@/interfaces";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getUserByToken } from "./get-user-by-token";

export const updateRegisterOnboarding = async (data: OnboardingUpdateInput, token: string) => {
  const findUser = await getUserByToken(token);
  if (!findUser) redirect('/auth/register');

  try {
    await prisma.user.update({
      where: { id: findUser.id },
      data: {
        name: data.name,
        description: data.description,
        profession: data.profession,
        birthdate: data.birthdate ? new Date(data.birthdate) : undefined,
        image: data.image,
      },
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};