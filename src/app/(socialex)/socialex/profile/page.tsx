import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getUserBySession } from "@/actions";
import { getServerSession } from "@/lib/get-server-session";
import { ProfileUser } from "@/components/profile/ProfileUser";

export const generateMetadata = async (): Promise<Metadata> => {
  const currentUser = await getUserBySession();
  if (!currentUser) redirect("/auth/login");
  return {
    title: `Mi perfil`,
    description: `Perfil de ${currentUser.name}`,
    openGraph: {
      title: `Mi perfil`,
      description: `Perfil de ${currentUser.name}`,
      url: `/profile`,
      images: [
        {
          url: currentUser.image || '/img/user-profile-default.avif',
          width: 630,
          height: 630,
          alt: "Perfil",
        },
      ],
    }
  }
};

const ProfilePage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/auth/login");

  const currentUser = await getUserBySession();
  if (!currentUser) redirect("/auth/login");

  return (
    <div className="w-9/10 max-w-3xl mx-auto overflow-hidden py-8 relative">
      <ProfileUser user={currentUser} />
    </div>
  );
};

export default ProfilePage;
