'use server';

import { revalidatePath } from "next/cache";
import { getServerSession } from "@/lib/get-server-session";
import { editProfileSchema, type EditProfileValues } from "@/schema/profile.schema";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");


export const updateUser = async (data: EditProfileValues) => {
  try {
    const session = await getServerSession();
    if (!session?.user) return { ok: false, message: "No autorizado" };

    const validationResult = editProfileSchema.safeParse(data);

    if (!validationResult.success) {
      const error = validationResult.error.issues[0].message;
      return { ok: false, message: error, field: validationResult.error.issues[0].path[0] };
    }

    const { name, description, profession, birthdate, image } = validationResult.data;

    let imageUrl = session.user.image || 'user-profile-default.avif';

    if (image && image.startsWith('data:image')) {
      try {
        const blob = await fetch(image).then((r) => r.blob());
        const file = new File([blob], "avatar.png", { type: blob.type });
        const buffer = await file.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        imageUrl = await cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: "socialex/profile-images",
            public_id: `socialex/profile-images/user_${session.user.id}`,
            overwrite: true,
            transformation: [
              { width: 500, height: 500, crop: "fill" },
              { quality: 'auto' }
            ]
          })
          .then((r) => r.secure_url);
      } catch (error) {
        console.log('Error al procesar imagen: ', error);
        return { ok: false, message: 'Error al procesar imagen' };
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        profession: profession?.trim() || null,
        birthdate: birthdate ? new Date(birthdate) : undefined,
        image: imageUrl,
      }
    });

    revalidatePath("/socialex/profile");
    revalidatePath("/socialex/feed");
    revalidatePath("/socialex");

    return { ok: true, message: 'Perfil actualizado correctamente' };
  } catch (error) {
    console.log('Error: ', error);
    return {
      ok: false,
      message: 'Error al actualizar usuario',
    }
  }
};