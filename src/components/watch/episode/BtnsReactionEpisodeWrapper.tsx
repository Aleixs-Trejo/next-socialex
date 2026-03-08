import { getReactionEpisodeByUser } from "@/actions";
import { BtnsReactionEpisode } from "./BtnsReactionEpisode";

export const BtnsReactionEpisodeWrapper = async ({ episodeId }: { episodeId: string }) => {
  const currentUserReaction = await getReactionEpisodeByUser(episodeId);
  return <BtnsReactionEpisode episodeId={episodeId} currentUserReaction={currentUserReaction} />;
};