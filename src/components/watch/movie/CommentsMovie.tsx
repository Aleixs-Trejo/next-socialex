import { getCommentsWatchByContext } from "@/actions";
import { CommentFormMovie } from "./CommentFormMovie";
import { CommentListMovie } from "./CommentListMovie";
import Link from "next/link";

interface Props {
  movieId: string;
  userId: string | null;
}

export const CommentsMovie = async ({ movieId, userId }: Props) => {
  const res = await getCommentsWatchByContext({ movieId });
  const comments = res.data ?? [];

  return (
    <div className="p-5 w-full flex flex-col gap-2 rounded-md bg-bg-card">
      <h2 className="text-white font-semibold text-lg">Comentarios ({comments.length})</h2>
      {userId ? <CommentFormMovie movieId={movieId} /> : <Link href={`/auth/login`} className="flex flex-col gap-3 underline">¡Inicia sesión para comentar!</Link>}

      <CommentListMovie comments={comments} currentUserId={userId} />
    </div>
  )
};