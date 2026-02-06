"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";
import { getUserByToken } from "./get-user-by-token";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const finishOnboarding = async (imageForm: string, token: string) => {
  const user = await getUserByToken(token);
    if (!user) redirect("/auth/register");

  try {
    let imageUrl = "user-profile-default.avif";

    if (imageForm.startsWith("data:image")) {
      try {
        const blob = await fetch(imageForm).then((r) => r.blob());
        const file = new File([blob], "avatar.png", { type: blob.type });
        const buffer = await file.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        imageUrl = await cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: "socialex/profile-images",
            public_id: `socialex/profile-images/user_${user.id}`,
            overwrite: true,
          })
          .then((r) => r.secure_url);
      } catch (error) {
        console.log("Error al procesar imagen: ", error);
      }
    }

    const transaction = await prisma.$transaction(async (tx) => {
      await tx.user.update({
      where: { id: user.id },
      data: {
        image: imageUrl,
        onboardingCompleted: true,
        onboardingToken: null,
        onboardingTokenExpires: null,
      },
    });

      await tx.verificationToken.deleteMany({
        where: { identifier: user.email },
      });
    });

    return { ok: true, message: "Usuario actualizado correctamente", imageUrl };
  } catch (error) {
    console.log("Error al actualizar usuario: ", error);
  }
};
