import { getAllLikesAndDislikesByEpisodes, getReactionEpisodeByUser } from "@/actions";
import { BtnsReactionEpisode } from "./BtnsReactionEpisode";

interface Props {
  episodeId: string;
}

export const BtnsReactionEpisodeWrapper = async ({ episodeId }: Props) => {
  const currentUserReaction = await getReactionEpisodeByUser(episodeId);
  const resReactions = await getAllLikesAndDislikesByEpisodes([episodeId]);
  const counts = resReactions.data?.[episodeId] ?? { likes: 0, dislikes: 0 };
  return <BtnsReactionEpisode episodeId={episodeId} currentUserReaction={currentUserReaction} initialLikes={counts.likes} initialDislikes={counts.dislikes} />;
};