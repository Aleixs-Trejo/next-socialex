import { UserWithCommentsPostsAndReactions } from "@/interfaces";
import { ImageCustom } from "../image-custom/ImageCustom";
import { getServerSession } from "@/lib/get-server-session";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: UserWithCommentsPostsAndReactions;
}

export const ProfileUser = async ({ user }: Props) => {
  const currentUser = await getServerSession();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8 border border-tertiary p-4 rounded-xl relative">
        {user.id === currentUser?.user.id && (
          <Link className="w-8 h-8 flex flex-col items-center group absolute right-4 top-2" href={`/socialex/profile/edit`} title="Editar">
            <div className="w-full h-full flex items-center justify-center shrink-0 rounded-full cursor-pointer flex-col group-hover:bg-tertiary transition-colors duration-300">
              <Image
                src="/icons/edit.svg"
                alt="Edit"
                width={20}
                height={20}
                className="w-5 h-5 object-contain object-center"
              />
            </div>
            <span className="px-3 py-1 opacity-0 translate-y-2 text-sm pointer-events-none text-white bg-accent rounded-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">Editar</span>
          </Link>
        )}
        <div className="min-w-12 w-9/10 max-w-42 aspect-square rounded-full bg-white p-1 shrink-0 flex justify-center items-center relative">
          <ImageCustom
            src={user?.image || undefined}
            alt="Avatar"
            width={120}
            height={120}
            className="w-full h-full rounded-full object-cover object-center"
          />
          <div
            className="absolute min-w-2 w-1/5 max-w-8 aspect-square bg-white p-1 rounded-full bottom-1/20 right-1/10"
            title={user?.statusProfile?.toLowerCase()}
          >
            <span
              className={`block w-full h-full rounded-full ${user?.statusProfile === "ONLINE" ? "bg-green-500" : "bg-zinc-500"}`}
            />
          </div>
        </div>
        <div className="flex flex-col text-center gap-2">
          <div className="flex flex-col text-center md:text-start">
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <span className="text-sm text-gray-400">{user?.profession}</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <span className="text-sm text-gray-400">
              {user?.posts.length}{" "}
              {user?.posts.length === 1 ? "publicación" : "publicaciones"}
            </span>
            <span className="text-sm text-gray-600">|</span>
            <span className="text-sm text-gray-400">
              {user?.comments.length}{" "}
              {user?.comments.length === 1 ? "comentario" : "comentarios"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 md:flex-row md:gap-8 border border-tertiary p-4 rounded-xl relative">
        <div className="flex flex-col gap-4 bg-bg-tertiary">
          <h3 className="text-xl font-semibold">Acerca de</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col flex-wrap md:flex-row md:gap-4 md:flex-nowrap">
              <h4 className="text-lg font-semibold">Información:</h4>
              <p className="text-base text-gray-200">{user?.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-4 flex-wrap md:flex-row md:gap-4 md:flex-nowrap">
            <h4 className="text-lg font-semibold">Fecha de nacimiento:</h4>
            <span className="text-sm text-gray-200">
              {user?.birthdate?.toISOString().split("T")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
