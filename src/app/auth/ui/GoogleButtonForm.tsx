'use client';

import { authClient } from "@/lib/auth-client";
import { GoogleSVG } from "./GoogleSVG";
import { useState } from "react";

export function GoogleButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/onboarding",
      });
    } catch (err) {
      console.error('Error al iniciar sesión con Google:', err);
      setError('Error al conectar con Google. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        className="btn-primary overflow-hidden"
        disabled={loading}
        type="button"
      >
        <GoogleSVG />
        {loading ? 'Conectando...' : 'Continuar con Google'}
      </button>
      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}