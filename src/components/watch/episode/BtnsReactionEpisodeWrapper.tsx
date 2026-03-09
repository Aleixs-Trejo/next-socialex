import { getReactionEpisodeByUser } from "@/actions";
import { BtnsReactionEpisode } from "./BtnsReactionEpisode";

interface Props {
  episodeId: string;
}

export const BtnsReactionEpisodeWrapper = async ({ episodeId }: Props) => {
  const currentUserReaction = await getReactionEpisodeByUser(episodeId);
  return <BtnsReactionEpisode episodeId={episodeId} currentUserReaction={currentUserReaction} />;
};