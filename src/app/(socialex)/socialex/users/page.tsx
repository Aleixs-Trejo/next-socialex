import { getAllUsers } from "@/actions";
import { EmptyData, ImageCustom, Title } from "@/components";
import Link from "next/link";

export const metadata = {
  title: "Usuarios | Socialex",
  description: "Users Page",
};

const UsersPage = async () => {
  const users = await getAllUsers();

  if (!users.ok) return (
    <EmptyData message={users.message} />
  );

  const { data } = users;

  if (!data) return (
    <EmptyData message="No hay usuarios para mostrar" />
  );

  const usersMap = data.map(user => (
    <div key={user.id} className="w-full border border-tertiary p-4 rounded-xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/socialex/user/${user.id}`} className="w-15 h-15 shrink-0 relative">
            <ImageCustom
              src={user.image || undefined}
              alt="Avatar"
              width={150}
              height={150}
              className="w-full h-full rounded-full object-cover object-center"
            />
            <div
              className="absolute w-3 h-3 bg-white p-0.5 rounded-full bottom-1/20 right-1/20"
              title={user.statusProfile?.toLowerCase()}
            >
              <span
                className={`block w-full h-full rounded-full ${user.statusProfile === "ONLINE" ? "bg-green-500" : "bg-zinc-500"}`}
              />
            </div>
          </Link>
          <div className="flex flex-col">
            <Link href={`/socialex/user/${user.id}`} className="text-base font-normal hover:underline">{user.name}</Link>
            <span className="text-sm text-gray-400">{user.profession}</span>
          </div>
        </div>
        <div className="w-full">
          <p className="text-sm text-gray-200">"{user.description}"</p>
        </div>
        <Link href={`/socialex/user/${user.id}`} className="btn-primary">Ver perfil</Link>
      </div>
    </div>
  ));

  return (
    <div className="w-9/10 max-w-xl mx-auto overflow-hidden py-8">
      <div className="flex flex-col gap-4">
        <Title title="Usuarios" subtitle="Explora los usuarios" />
        {usersMap}
      </div>
    </div>
  );
};

export default UsersPage;