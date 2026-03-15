import { getCommentsWatchByContext } from "@/actions";
import { CommentForm } from "./CommentContentWatchForm";
import { CommentContentWatchList } from "./CommentContentWatchList";
import { getServerSession } from "@/lib/get-server-session";
import { ContentContext } from "@/interfaces";
import Link from "next/link";

interface Props {
  context: ContentContext;
}

export const CommentsContentWatch = async ({ context }: Props) => {
  const [res, session] = await Promise.all([
    getCommentsWatchByContext(context),
    getServerSession(),
  ]);

  const comments = res.data ?? [];

  return (
    <div className="p-5 w-full flex flex-col gap-2 rounded-md bg-bg-card">
      <h2 className="text-white font-semibold text-lg">Comentarios</h2>
      {session?.user?.id
        ? <CommentForm context={context} />
        : <Link href="/auth/login" className="flex flex-col gap-3 underline">¡Inicia sesión para comentar!</Link>
      }
      <CommentContentWatchList comments={comments} currentUserId={session?.user?.id} />
    </div>
  );
};