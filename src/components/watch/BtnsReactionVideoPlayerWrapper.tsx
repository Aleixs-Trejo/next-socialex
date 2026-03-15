import { unstable_cache } from "next/cache";
import { getAllLikesAndDislikes, getReactionContextByUser } from "@/actions";
import { BtnsReactionVideoPlayer } from "./BtnsReactionVideoPlayer";
import { ContentContext } from "@/interfaces";

interface Props {
  contentId: string;
  contextField: keyof ContentContext;
}

const getCounts = (contextField: keyof ContentContext, contentId: string) =>
  unstable_cache(
    () => getAllLikesAndDislikes(contextField, [contentId]),
    [`reaction-counts-${contentId}`],
    { tags: [`reaction-${contentId}`] }
  )();

export const BtnsReactionVideoPlayerWrapper = async ({ contentId, contextField }: Props) => {
  const context: ContentContext = { [contextField]: contentId };

  const [currentUserReaction, resReactions] = await Promise.all([
    getReactionContextByUser(context),
    getCounts(contextField, contentId),
  ]);

  const counts = resReactions.data?.[contentId] ?? { likes: 0, dislikes: 0 };

  return (
    <BtnsReactionVideoPlayer
      contentId={contentId}
      contextField={contextField}
      currentUserReaction={currentUserReaction}
      initialLikes={counts.likes}
      initialDislikes={counts.dislikes}
    />
  );
};