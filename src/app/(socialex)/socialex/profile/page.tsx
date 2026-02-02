import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { LogoutBtn } from "./ui/LogoutBtn";
import { ImageCustom } from "@/components";
import { getUserBySession } from "@/actions";

export const metadata = {
  title: "Mi Perfil | Socialex",
  description: "Perfil Page",
};

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const currentUser = await getUserBySession(session);
  if (!currentUser) redirect("/auth/login");

  return (
    <div className="w-9/10 max-w-3xl mx-auto overflow-hidden py-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8 border border-tertiary p-4 rounded-xl relative">
          <div className="w-42 h-42 rounded-full bg-white p-1 shrink-0 flex justify-center items-center relative">
            <ImageCustom
              src={currentUser.image || undefined}
              alt="Avatar"
              width={160}
              height={160}
              className="w-full h-full rounded-full object-cover object-center"
            />
            <div
              className="absolute w-8 h-8 bg-white p-1 rounded-full bottom-1/20 right-1/10"
              title={session?.user.statusProfile?.toLowerCase()}
            >
              <span
                className={`block w-full h-full rounded-full ${session?.user.statusProfile === "ONLINE" ? "bg-green-500" : "bg-zinc-500"}`}
              />
            </div>
          </div>
          <div className="flex flex-col text-center md:text-start">
            <h2 className="text-2xl font-semibold">{currentUser.name}</h2>
            <span className="text-sm text-gray-400">
              {currentUser.profession}
            </span>
          </div>
        </div>
        <div className="flex gap-4 md:flex-row md:gap-8 border border-tertiary p-4 rounded-xl relative">
          <div className="flex flex-col gap-4 bg-bg-tertiary">
            <h3 className="text-xl font-semibold">Acerca de</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col flex-wrap md:flex-row md:gap-4 md:flex-nowrap">
                <h4 className="text-lg font-semibold">Información:</h4>
                <p className="text-base text-gray-200">{currentUser.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-x-4 flex-wrap md:flex-row md:gap-4 md:flex-nowrap">
              <h4 className="text-lg font-semibold">Fecha de nacimiento:</h4>
              <span className="text-sm text-gray-200">{currentUser.birthdate?.toISOString().split('T')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
