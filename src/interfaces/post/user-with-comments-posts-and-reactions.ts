import { Comment } from "../comment/comments.interface";
import { Post } from "..";
import { Reaction } from "../reaction/reaction";
import { User } from "../user/user";

export interface UserWithCommentsPostsAndReactions extends User {
  posts: Post[];
  comments: Comment[];
  reactions: Reaction[];
}
