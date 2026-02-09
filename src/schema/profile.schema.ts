import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre es demasiado largo')
    .trim(),
  description: z
    .string()
    .max(500, "Máximo 500 caracteres")
    .optional()
    .or(z.literal("")),
  profession: z
    .string()
    .max(50, "Máximo 50 caracteres")
    .optional()
    .or(z.literal("")),
  birthdate: z
    .string()
    .refine(val => {
      if (!val) return false;

      const date = new Date(val);
      if (Number.isNaN(date.getTime())) return false;

      const minAge = 13;
      const today = new Date();
      const birthYear = date.getFullYear();
      const age = today.getFullYear() - birthYear;
      
      const hasHadBirthdayThisYear = 
        today.getMonth() > date.getMonth() ||
        (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());
      
      const actualAge = hasHadBirthdayThisYear ? age : age - 1;

      return actualAge >= minAge && actualAge <= 120;
    }, {
      message: "Debes tener al menos 13 años",
    }),
  image: z
    .string()
    .optional()
    .or(z.literal("")),
});

export type EditProfileValues = z.infer<typeof editProfileSchema>;