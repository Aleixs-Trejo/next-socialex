import { OnboardingForm } from "./OnboardingForm";
import { redirect } from "next/navigation";
import { getUserByToken } from "@/actions";

export const metadata = {
  title: "Registro | Socialex",
  description: "Registro en Socialex",
};

interface Props {
  searchParams: Promise<{ token: string }>;
}

const OnboardingPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const tokenAuth = params.token as string;
  const user = await getUserByToken(tokenAuth);

  // if (!user || user.onboardingCompleted) redirect("/auth/register");

  const defaultValues = {
    name: user?.name ?? "",
    password: "",
    birthdate: user?.birthdate ? user?.birthdate.toISOString().slice(0, 10) : "",
    image: user?.image ?? "user-profile-default.avif",
    description: user?.description ?? '',
    profession: user?.profession ?? '',
  };

  return (
    <OnboardingForm
      token={tokenAuth}
      defaultValues={defaultValues}
      hasRegister={!!user?.onboardingCompleted}
    />
  );
};

export default OnboardingPage;
