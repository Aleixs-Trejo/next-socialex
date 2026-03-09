import { CommentWatchBasic } from "@/interfaces";
import { CommentItemWatch } from "../CommentItemWatch";

interface Props {
  comments: CommentWatchBasic[];
  currentUserId: string | null;
}

export const CommentListEpisode = async ({ comments, currentUserId }: Props) => {

  if (comments.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-400 text-sm">
          Aún no hay comentarios uwu
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {comments.map(comment => (
        <CommentItemWatch
          key={comment.id}
          comment={comment}
          isOwner={comment.user.id === currentUserId}
        />
      ))}
    </div>
  );
};