import { ReactionType } from "@/generated/prisma/enums";
import { UserBasic } from "./user";

export interface Reaction {
  id: string;
  createdAt: Date;
  userId: string;
  user: UserBasic;
  type: ReactionType;
  postId: string;
  commentId: string | null;
}

export type ReactionBasic = Pick<Reaction, 'id' | 'userId' | 'type'>;