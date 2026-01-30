"use client";

import { signIn } from "next-auth/react";
import { GoogleSVG } from "./GoogleSVG";
import { useState } from "react";

export function GoogleButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="btn-primary overflow-hidden"
    >
      <GoogleSVG />
      {loading ? 'Conectando...' : 'Continuar con Google'}
    </button>
  );
}