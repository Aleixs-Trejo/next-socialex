'use client';

import { authenticated } from "@/actions";
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { useActionState, useEffect } from "react";

export const LoginForm = () => {
  const [message, formAction, isPending] = useActionState(authenticated, undefined);

  useEffect(() => {
    if (message === 'Success') {
      window.location.replace('/socialex/feed');
    }
  }, [message]);

  return (
    <form action={formAction}>
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
                type="password"
                name="password"
                placeholder="*********"
                minLength={8}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn-primary overflow-hidden" aria-disabled={isPending}>
          Acceder
        </button>
        {
          message && message !== 'Success' && (
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