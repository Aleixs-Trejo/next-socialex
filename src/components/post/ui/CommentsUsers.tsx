import { CommentItem } from './CommentItem';

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  reactions: any[];
}

interface Props {
  comments: Comment[];
  currentUserId?: string;
}

export const CommentsUsers = ({ comments, currentUserId }: Props) => {
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