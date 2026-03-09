import { Title } from "@/components";
import { SearchInput } from "./ui/SearchInput";
import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";
import { MusicArtists } from "./ui/MusicArtist";
import { connection } from "next/server";

export const metadata = {
  title: "Lo mejor de la música | Socialex",
  description: "Music Page",
}

const MusicPage = async () => {
  await connection();
  const session = await getServerSession();
  if (!session?.user) redirect("/auth/login");

  return (
    <div className="w-9/10 max-w-3xl mx-auto py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b-2 border-bg-card">
            <Title title="Música" subtitle="La buena música aquí" />
            <SearchInput />
          </div>
          <h2 className="text-xl">Hola de nuevo, {session.user.name.split(' ')[0]}. ¿Qué te apetece hoy? UwU</h2>
          <span className="text-xs text-gray-300">(Muchos de los albumes no están disponibles, estaré migrando de servicio, gracias xd)</span>
        </div>
        <MusicArtists />
      </div>
    </div>
  );
};

export default MusicPage;