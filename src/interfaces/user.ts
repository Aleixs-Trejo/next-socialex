import { StatusAccount, StatusProfile } from "@/generated/prisma/enums";
import { Post } from "./post";
import { Reaction } from "./reaction";

export interface User {
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
}

export type UserBasic = Pick<User, 'id' | 'name' | 'image' | 'profession' | 'statusProfile'>;

export interface UserWithPosts extends User {
  posts: Post[];
  reactions: Reaction[];
}