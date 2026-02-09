import { ZodSchema } from "zod";

export const zodValidator = (schema: ZodSchema) => {
  return ({ value }: { value: any }) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      return result.error.issues[0].message;
    }
    return undefined;
  };
};