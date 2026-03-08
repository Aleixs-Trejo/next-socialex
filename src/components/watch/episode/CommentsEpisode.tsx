import { getCommentsWatchByContext } from "@/actions";
import { CommentFormEpisode} from "./CommentFormEpisode";
import { CommentListEpisode } from "./CommentListEpisode";
import { getServerSession } from "@/lib/get-server-session";
import Link from "next/link";

interface Props {
  episodeId: string;
}

export const CommentsEpisode = async ({ episodeId }: Props) => {
  const res = await getCommentsWatchByContext({ episodeId });
  const session = await getServerSession();
  const comments = res.data ?? [];

  return (
    <div className="p-5 w-full flex flex-col gap-2 rounded-md bg-bg-card">
      <h2 className="text-white font-semibold text-lg">Comentarios ({comments.length})</h2>
      {session?.user?.id ? <CommentFormEpisode episodeId={episodeId} /> : <Link href={`/auth/login`} className="flex flex-col gap-3 underline">¡Inicia sesión para comentar!</Link>}

      <CommentListEpisode comments={comments} currentUserId={session?.user?.id} />
    </div>
  )
};