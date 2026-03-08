import { getCommentsWatchByContext } from "@/actions";
import { CommentFormSerie } from "./CommentFormSerie";
import { CommentList } from "./CommentListSerie";
import { getServerSession } from "@/lib/get-server-session";
import Link from "next/link";

interface Props {
  serieId: string;
}

export const CommentsSerie = async ({ serieId }: Props) => {
  const res = await getCommentsWatchByContext({ serieId });
  const session = await getServerSession();
  const comments = res.data ?? [];

  return (
    <div className="p-5 w-full flex flex-col gap-2 rounded-md bg-bg-card">
      <h2 className="text-white font-semibold text-lg">Comentarios</h2>
      {session?.user?.id ? <CommentFormSerie serieId={serieId} /> : <Link href={`/auth/login`} className="flex flex-col gap-3 underline">¡Inicia sesión para comentar!</Link>}

      <CommentList comments={comments} currentUserId={session?.user?.id} />
    </div>
  )
};