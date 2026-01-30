import { AuthProvider } from "@/types";
import { OnboardingForm } from "./OnboardingForm";
import { getUserByToken } from "@/actions/auth/get-user-by-token";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ auth?: string; token?: string }>;
}

export const metadata = {
  title: "Registro | Socialex",
  description: "Registro en Socialex",
};

const OnboardingPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const authProvider = params.auth as AuthProvider;
  const tokenAuth = params.token as string;
  const user = await getUserByToken(tokenAuth);

  if (!user || user.onboardingCompleted) redirect("/auth/register");

  const defaultValues = {
    name: user.name ?? "",
    password: "",
    birthdate: user.birthdate ? user.birthdate.toISOString().slice(0, 10) : "",
    image: user.image ?? "user-profile-default.avif",
    description: user.description ?? '',
    profession: user.profession ?? '',
  };

  return (
    <OnboardingForm
      authProvider={authProvider}
      token={tokenAuth}
      defaultValues={defaultValues}
      hasRegister={!!user.passwordHashed}
    />
  );
};

export default OnboardingPage;
