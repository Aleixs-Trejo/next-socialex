import { MediaType, StatusProfile } from "@/generated/prisma/enums";

export interface PostWithUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  content: string | null;
  user: {
    statusProfile: StatusProfile;
    id: string;
    name: string | null;
    image: string | null;
    profession: string | null;
  };
  media: {
    url: string;
    type: MediaType;
    order: number;
  }[];
}
