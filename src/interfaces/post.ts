import { MediaType } from "@/generated/prisma/enums";
import { Reaction, ReactionBasic } from "./reaction";
import { User, UserBasic } from "./user";
import { Comment, CommentBasic } from "./comments";

export interface Post {
  id: string;
  content: string | null;
  userId: string;
  user: User;
  media: {
    id: string;
    url: string;
    type: MediaType;
    order: number;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  comments: Comment[];
  reactions: Reaction[];
  createdAt: Date;
  updatedAt: Date;
}

export type PostBasic = Pick<Post, 'id' | 'content' | 'userId' | 'createdAt' | 'updatedAt'>;

export interface PostInterface extends PostBasic {
  comments: CommentBasic[];
  user: UserBasic;
  media: {
    url: string;
    type: MediaType;
    order: number;
  }[];
  reactions: ReactionBasic[];
}