'use client';

import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { useState } from "react";
import { ModalRegisterForm } from "./ModalRegisterForm";
import { registerEmail } from "@/actions";
import { validateEmail } from "@/lib/validate-email";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setTouched(true);
    const validationError = validateEmail(email);
    setError(validationError);
    setOpen(!validationError);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (touched) {
      setError(validateEmail(value));
    }
  };

  const acceptTerms = async () => {
    setOpen(false);
    const res = await registerEmail(email);
    if (!res?.ok) {
      setError(res.message);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-8 overflow-hidden">
      <h2 className={`${titleFont.className} text-3xl font-semibold text-center max-w-full`}>Registrate</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            className="label-text"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className={`${titleFont.variable} input-field-text ${touched && error ? 'input-field-text-error' : ''}`}
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="Ej: alesis@makanaki.xd"
              onChange={onChange}
              onBlur={() => setTouched(true)}
            />
            {touched && error && (
              <span className="text-xs text-red-500">{error}</span>
            )}
          </div>
        </div>
        <button type="button" className={`btn-primary ${touched && error ? 'btn-disabled' : ''} `} onClick={handleClick} disabled={touched && !!error}>Siguiente</button>
        <div className="flex flex-col items-center justify-center w-full text-center sm:flex-row sm:gap-2">
          <span className="text-sm sm:text-base">Ya tienes un cuenta?</span>
          <Link
            href="/auth/login"
            className="text-sm sm:text-base text-bright hover:underline"
          >
            ¡Inicia sesión aquí!
          </Link>
        </div>
      </div>
      {
        open && (
          <ModalRegisterForm
            onAccept={ acceptTerms }
            onClose={() => setOpen(false)}
          />
        )
      }
    </div>
  );
};