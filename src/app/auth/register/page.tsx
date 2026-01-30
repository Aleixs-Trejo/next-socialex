import { GoogleButton } from "../ui/GoogleButtonForm";
import { RegisterForm } from "./ui/RegisterForm";

export const metadata = {
  title: 'Registro | Socialex',
  description: 'Registro en Socialex',
};

const RegisterPage = () => {
  return (
    <>
      <RegisterForm />
      <div className="w-9/10 mx-auto flex items-center">
        <span className="flex-1 h-px bg-gray-700" />
        <span className="px-2 text-white">o</span>
        <span className="flex-1 h-px bg-gray-700" />
      </div>
      <GoogleButton />
    </>
  );
};

export default RegisterPage;