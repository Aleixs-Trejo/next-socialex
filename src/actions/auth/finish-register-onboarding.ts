"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";
import { getUserByToken } from "./get-user-by-token";
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

    await prisma.user.update({
      where: { id: user.id },
      data: {
        image: imageUrl,
        onboardingCompleted: true,
        onboardingToken: null,
        onboardingTokenExpires: null,
      },
    });
  } catch (error) {
    console.log("Error al actualizar usuario: ", error);
  }
};
