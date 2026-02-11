'use client';

import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(undefined);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setMessage(error.message || 'Error al iniciar sesión');
        setIsPending(false);
        return;
      }

      if (data) {
        // Éxito - redirigir
        router.push('/socialex/feed');
        router.refresh();
      }
    } catch (error) {
      setMessage('Error inesperado al iniciar sesión');
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 overflow-hidden">
        <h2 className={`${titleFont.className} text-3xl font-semibold text-center max-w-full`}>Ingresar</h2>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              className="label-text"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className={`${titleFont.variable} input-field-text`}
                id="email"
                type="email"
                name="email"
                placeholder="Ej: alesis@makanaki.xd"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="label-text"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className={`${titleFont.variable} input-field-text`}
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="*********"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 cursor-pointer flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-300"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <rect width="24" height="24" fill="none" />
                    <path fill="#fff" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <rect width="24" height="24" fill="none" />
                    <path fill="#fff" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <button 
          type="submit" 
          className={`overflow-hidden ${isPending ? 'btn-disabled' : 'btn-primary'}`}
          disabled={isPending}
        >
          {isPending ? 'Accediendo...' : 'Acceder'}
        </button>
        {
          message && (
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="text-sm text-red-500">{message}</p>
            </div>
          )
        }
        <div className="flex flex-col items-center justify-center w-full text-center sm:flex-row sm:gap-2">
          <span className="text-sm sm:text-base">¿No tienes un cuenta?</span>
          <Link
            href="/auth/register"
            className="text-sm sm:text-base text-bright hover:underline"
          >
            Registrate, es gratis (aún)
          </Link>
        </div>
      </div>
    </form>
  );
};