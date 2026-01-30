import { LoginForm } from "./ui/LoginForm";
import { GoogleButton } from "../ui/GoogleButtonForm";

export const metadata = {
  title: 'Iniciar Sesión | Socialex',
  description: 'Iniciar sesión en Socialex',
};

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className="w-9/10 mx-auto flex items-center">
        <span className="flex-1 h-px bg-gray-700" />
        <span className="px-2 text-white">o</span>
        <span className="flex-1 h-px bg-gray-700" />
      </div>
      <GoogleButton />
    </>
  );
}
