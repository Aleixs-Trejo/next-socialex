import { ReactionType } from "@/generated/prisma/enums";

export interface Reaction {
  id: string;
  createdAt: Date;
  userId: string;
  type: ReactionType;
  postId: string;
  commentId: string | null;
}

export type ReactionBasic = Pick<Reaction, 'id' | 'userId' | 'type'>;