import { ContentReactionType } from "@/generated/prisma/enums";
import { User } from "../user/user";

export interface Serie {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  seasons: Season[];
  commentsWatch: CommentWatch[];
  genre: string | null;
  subgenre: string | null;
  contentReactions: ContentReaction[];
}

export interface Season {
  id: string;
  serieId: string;
  seasonNumber: number;
  title: string | null;
  description: string | null;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  episodes: Episode[];
  commentsWatch: CommentWatch[];
  contentReactions: ContentReaction[];
}

export interface Episode {
  id: string;
  seasonId: string;
  episodeNumber: number;
  title: string;
  description: string | null;
  r2Key: string;
  thumbnail: string | null;
  tags: string[];
  duration: number | null;
  createdAt: Date;
  updatedAt: Date;
  contentReactions: ContentReaction[];
  commentsWatch: CommentWatch[];
}

export interface ContentReaction {
  id: string;
  type: ContentReactionType;
  userId: string;
  user: User;
  serieId: string | null;
  serie: Serie | null;
  seasonId: string | null;
  season: Season | null;
  episodeId: string | null;
  episode: Episode | null;
  createdAt: Date;
}

export interface CommentWatch {
  id: string;
  content: string;
  userId: string;
  user: User;
  serieId: string | null;
  serie: Serie | null;
  seasonId: string | null;
  season: Season | null;
  episodeId: string | null;
  episode: Episode | null;
  createdAt: Date;
}

export interface CommentWatchBasic {
  id: string;
  content: string;
  createdAt: Date;
  user: { id: string; name: string | null; image: string | null };
};

export type EpisodeBasic = Omit<Episode, 'updatedAt' | 'contentReactions' | 'commentsWatch'>;

export interface SeasonBasic {
  id: string;
  title: string | null;
  description: string | null;
  serieId: string;
  coverImage: string | null;
  seasonNumber: number;
  episodes: EpisodeBasic[];
}