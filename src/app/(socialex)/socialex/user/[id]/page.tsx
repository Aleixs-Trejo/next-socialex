import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserById } from "@/actions";
import { getServerSession } from "@/lib/get-server-session";
import { ProfileUser } from "@/components/profile/ProfileUser";

interface Props {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const user = await getUserById(id);
  if (!user.ok) redirect("/auth/login");
  const { data } = user;

  return {
    title: `Usuario ${data?.name}`,
    description: `Perfil de ${data?.name}`,
    openGraph: {
      title: `Usuario ${data?.name}`,
      description: `Perfil de ${data?.name}`,
      url: `/socialex/user/${id}`,
      images: [
        {
          url: data?.image || '/img/user-profile-default.avif',
          width: 630,
          height: 630,
          alt: "Perfil",
        },
      ],
    }
  }
};

const UserPage = async ({ params }: Props) => {
  const session = await getServerSession()
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
      <ProfileUser user={user} />
    </div>
  );
};

export default UserPage;