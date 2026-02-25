import { Comment, UserBasic } from '@/interfaces';
import { CommentItem } from './CommentItem';
import { getServerSession } from '@/lib/get-server-session';


interface Props {
  comments: Comment[];
}

export const CommentsUsers = async ({ comments }: Props) => {
  const user = await getServerSession();
  const currentUserId = user?.user?.id;

  if (comments.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-400 text-sm">
          Aún no hay comentarios. ¡Sé el primero en comentar!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-tertiary">
      {comments.map(comment => (
        <CommentItem
          key={comment.id} 
          comment={comment} 
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};