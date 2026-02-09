"use server";

import { headers } from "next/headers";
import { MediaType } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/avif"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];

export const newPost = async (formData: FormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { ok: false, message: "No autorizado" };
    }

    const content = formData.get("content")?.toString().trim() || "";
    const files = formData.getAll("media") as File[];

    if (!content && files.length === 0) {
      return { ok: false, message: "La publicación no puede estar vacía" };
    }

    let imageCount = 0;
    let videoCount = 0;

    const mediaToCreate: {
      url: string;
      type: MediaType;
      order: number;
    }[] = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const isImage = IMAGE_TYPES.includes(file.type);
      const isVideo = VIDEO_TYPES.includes(file.type);

      if (!isImage && !isVideo) {
        return { ok: false, message: "Tipo de archivo no permitido" };
      }

      if (isImage) {
        imageCount++;
        if (file.size > MAX_IMAGE_SIZE) {
          return { ok: false, message: "Una de las imágenes es muy pesada" };
        }
        if (imageCount > 10) {
          return { ok: false, message: "Máximo 10 imágenes por publicación" };
        }
      }

      if (isVideo) {
        videoCount++;
        if (videoCount > 1) {
          return { ok: false, message: "Solo se permite un video por publicación" };
        }
        if (file.size > MAX_VIDEO_SIZE) {
          return { ok: false, message: "El video es muy pesado" };
        }
      }

      const uploadedFile = await uploadMedia(file);

      mediaToCreate.push({
        url: uploadedFile.secure_url,
        type: isImage ? MediaType.IMAGE : MediaType.VIDEO,
        order: mediaToCreate.length,
      });
    }

    await prisma.post.create({
      data: {
        content: content || null,
        userId: session.user.id,
        media: mediaToCreate.length
          ? { create: mediaToCreate }
          : undefined,
      },
    });

    revalidatePath("/socialex/feed");
  
    return { ok: true };
  } catch (error: any) {
    console.log("Error: ", error);
    return {
      ok: false,
      error: error.message || "No se pudo crear la publicación",
    };
  }
};

const uploadMedia = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "socialex/posts",
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ secure_url: result.secure_url });
      }
    )
    .end(buffer);
  });
};