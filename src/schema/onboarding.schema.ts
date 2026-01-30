import { AuthProvider } from "@/types";
import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(64)
  .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
  .regex(/[a-z]/, "Debe tener al menos una minúscula")
  .regex(/[0-9]/, "Debe tener al menos un número");

export const onboardingSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre es demasiado largo')
    .trim(),
  password: z
    .union([passwordSchema, z.literal("")])
    .optional(),
  description: z
    .string()
    .max(255, "Máximo 255 caracteres")
    .optional()
    .or(z.literal("")),
  profession: z
    .string()
    .min(2, "La profesión es muy corta")
    .max(50)
    .optional()
    .or(z.literal("")),
  birthdate: z
    .string()
    .optional()
    .refine(val => {
      if (!val) return true;

      const date = new Date(val);
      if (Number.isNaN(date.getTime())) return false;

      const minAge = 12;
      const today = new Date();
      const currYear = today.getFullYear();
      const currMonth = today.getMonth();
      const currDay = today.getDate();
      const age = currYear - date.getFullYear() - (today < new Date(currYear, currMonth, currDay) ? 1 : 0);

      return age >= minAge;
    }, {
      message: "Debes tener al menos 12 años",
    }),
  image: z
    .string()
    .optional()
    .or(z.literal("")),
});

export type OnboardingValues = z.infer<typeof onboardingSchema>;

export const validateOnboardingWithAuth = (data: OnboardingValues, authProvider: AuthProvider) => {
  if (authProvider === 'credentials' && !data.password) {
    throw new Error('Password es requerido para registro con credenciales');
  }
  return onboardingSchema.parse(data);
};