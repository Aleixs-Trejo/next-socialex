import { ImageCustom } from "@/components";
import { BetterAuthSession } from "@/types";
import Link from "next/link";

interface Props {
  session: BetterAuthSession;
}

export const NewPostBanner = ({ session }: Props) => {

  return (
    <div className="w-full flex p rounded-lg gap-2 sm:gap-4">
      <Link href='/socialex/profile' className="w-10 h-10 shrink-0 flex">
        <ImageCustom
          src={session.user.image || undefined}
          alt="Avatar"
          width={40}
          height={40}
          className="w-full h-full rounded-full m-auto"
        />
      </Link>
      <Link href='/socialex/post/new' className="rounded-2xl grow p-3 text-sm text-gray-300 bg-tertiary transition-colors duration-300 hover:bg-quaternary">¿Tienes algo en esa cabecita tuya, {session.user.name?.split(" ")[0]}?</Link>
    </div>
  );
};