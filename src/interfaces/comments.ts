import { Reaction } from "./reaction";
import { UserBasic } from "./user";

export interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  user: UserBasic;
  createdAt: Date;
  updatedAt: Date;
  reactions: CommentReaction[];
}

export interface CommentReaction extends Reaction {
  user: UserBasic;
}

export type CommentBasic = Pick<Comment, 'id' | 'content' | 'userId'>;