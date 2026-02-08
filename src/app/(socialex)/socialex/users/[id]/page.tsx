import { redirect } from "next/navigation";
import { getUserById } from "@/actions";
import { ImageCustom } from "@/components";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface Props {
  params: Promise<{ id: string }>;
}

const UserPage = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { id } = await params;

  if (!session?.user) redirect("/auth/login");
  if (session.user.id === id) redirect("/socialex/profile");

  const response = await getUserById(id);

  if (!response.ok) return (
    <div className="w-9/10 max-w-xl mx-auto overflow-hidden py-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-gray-300 text-center">{response.message}</h2>
      </div>
    </div>
  );

  const { data: user } = response;

  if (!user) return (
    <div className="w-9/10 max-w-xl mx-auto overflow-hidden py-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-gray-300 text-center select-none">¿Qué rayos estás buscando?</h2>
      </div>
    </div>
  );

  return (
    <div className="w-9/10 max-w-xl mx-auto overflow-hidden py-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8 border border-tertiary p-4 rounded-xl relative">
              <div className="w-42 h-42 rounded-full bg-white p-1 shrink-0 flex justify-center items-center relative">
                <ImageCustom
                  src={user.image || undefined}
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
                    className={`block w-full h-full rounded-full ${user.statusProfile === "ONLINE" ? "bg-green-500" : "bg-zinc-500"}`}
                  />
                </div>
              </div>
              <div className="flex flex-col text-center md:text-start">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <span className="text-sm text-gray-400">
                  {user.profession}
                </span>
              </div>
            </div>
            <div className="flex gap-4 md:flex-row md:gap-8 border border-tertiary p-4 rounded-xl relative">
              <div className="flex flex-col gap-4 bg-bg-tertiary">
                <h3 className="text-xl font-semibold">Acerca de</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col flex-wrap md:flex-row md:gap-4 md:flex-nowrap">
                    <h4 className="text-lg font-semibold">Información:</h4>
                    <p className="text-base text-gray-200">{user.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-4 flex-wrap md:flex-row md:gap-4 md:flex-nowrap">
                  <h4 className="text-lg font-semibold">Fecha de nacimiento:</h4>
                  <span className="text-sm text-gray-200">{user.birthdate?.toISOString().split('T')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
};

export default UserPage;