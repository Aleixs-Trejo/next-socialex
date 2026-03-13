import { getAllLikesAndDislikesByMovies, getReactionMovieByUser } from "@/actions";
import { BtnsReactionMovie } from "./BtnsReactionMovie";

interface Props {
  movieId: string;
}

export const BtnsReactionMovieWrapper = async ({ movieId }: Props) => {
  const currentUserReaction = await getReactionMovieByUser(movieId);
  const resReactions = await getAllLikesAndDislikesByMovies([movieId]);
  const counts = resReactions.data?.[movieId] ?? { likes: 0, dislikes: 0 };
  return <BtnsReactionMovie movieId={movieId} currentUserReaction={currentUserReaction} initialLikes={counts.likes} initialDislikes={counts.dislikes} />;
};