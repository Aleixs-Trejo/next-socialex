import { getCommentsWatchByContext } from "@/actions";
import { CommentFormSeason} from "./CommentFormSeason";
import { CommentList } from "./CommentListSeason";
import { getServerSession } from "@/lib/get-server-session";
import Link from "next/link";

interface Props {
  seasonId: string;
}

export const CommentsSeason = async ({ seasonId }: Props) => {
  const res = await getCommentsWatchByContext({ seasonId });
  const session = await getServerSession();
  const comments = res.data ?? [];

  return (
    <div className="p-5 w-full flex flex-col gap-2 rounded-md bg-bg-card">
      <h2 className="text-white font-semibold text-lg">Comentarios</h2>
      {session?.user?.id ? <CommentFormSeason seasonId={seasonId} /> : <Link href={`/auth/login`} className="flex flex-col gap-3 underline">¡Inicia sesión para comentar!</Link>}

      <CommentList comments={comments} currentUserId={session?.user?.id} />
    </div>
  )
};