import { ReactionType, StatusAccount, StatusProfile } from "@/generated/prisma/enums";

export interface UserWithCommentsPostsAndReactions {
  id: string;
  email: string;
  name: string | null;
  description: string | null;
  statusAccount: StatusAccount;
  statusProfile: StatusProfile;
  profession: string | null;
  birthdate: Date | null;
  emailVerified: boolean;
  image: string | null;
  onboardingToken: string | null;
  onboardingTokenExpires: Date | null;
  onboardingCompleted: boolean;
  onboardingSkippedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comments: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string;
    postId: string;
  }[];
  posts: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string | null;
  }[];
  reactions: {
    id: string;
    createdAt: Date;
    userId: string;
    type: ReactionType;
    postId: string;
    commentId: string | null;
  }[];
}