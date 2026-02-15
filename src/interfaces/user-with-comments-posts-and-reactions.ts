import { Comment } from "./comments";
import { Post } from "./post";
import { Reaction } from "./reaction";
import { User } from "./user";

export interface UserWithCommentsPostsAndReactions extends User {
  posts: Post[];
  comments: Comment[];
  reactions: Reaction[];
}