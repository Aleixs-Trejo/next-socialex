'use server';

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

export const authenticated = async (prevState: string | undefined, formData: FormData) => {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return 'Success';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email o contraseña incorrectos';
        default:
          return 'Error de servidor';
      }
    }

    console.error("Error en autenticación:", error);
    return 'Error desconocido.';
  }
};

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email: email.toLowerCase(), password, redirect: false });
    return {
      ok: true,
      message: 'Sesión iniciada correctamente',
    }
  } catch (error) {
    console.log('Error: ', error);
    return {
      ok: false,
      message: 'Error al iniciar sesión',
    }
  }
};