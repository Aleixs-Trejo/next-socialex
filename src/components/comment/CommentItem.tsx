import Link from 'next/link';
import { dateFriendly } from '@/utils/dateFriendly';
import { ImageCustom } from '@/components';
import { Comment } from '@/interfaces';
import { CommentActions } from './CommentActions';
import { CommentContent } from './CommentContent';

interface Props {
  comment: Comment;
  currentUserId?: string;
}

export const CommentItem = ({ comment, currentUserId }: Props) => {
  const isOwner = currentUserId === comment.user.id;

  return (
    <div className="p-3 hover:bg-quaternary/30 transition-colors relative">
      <div className="flex gap-2">
        <Link href={`/socialex/user/${comment.user.id}`} className="shrink-0">
          <ImageCustom
            src={comment.user.image || '/default-avatar.png'}
            alt={comment.user.name || 'Usuario'}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Link href={`/socialex/user/${comment.user.id}`} className="font-semibold text-sm text-white">
                  {comment.user.name}
                </Link>
                <span className="text-xs text-gray-400">
                  {dateFriendly(new Date(comment.createdAt).toISOString())}
                </span>
              </div>
              <CommentContent comment={comment} />
            </div>
            {isOwner && <CommentActions commentId={comment.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};