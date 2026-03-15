'use client';

import { ContentReactionType } from "@/generated/prisma/enums";
import { BiLike, BiSolidLike, BiSolidDislike, BiDislike } from "react-icons/bi";
import { useOptimistic, useState, useTransition } from "react";
import { toggleReactionByContext } from "@/actions";
import { toast } from "sonner";
import { formatNumber } from "@/utils/formatNumber";
import { BtnReactionVideoPlayer } from "./BtnReactionVideoPlayer";
import { ContentContext } from "@/interfaces";

interface ReactionCounts {
  likes: number;
  dislikes: number;
}

interface Props {
  contentId: string;
  contextField: keyof ContentContext;
  currentUserReaction: ContentReactionType | null;
  initialLikes: number;
  initialDislikes: number;
}

export const BtnsReactionVideoPlayer = ({ contentId, contextField, currentUserReaction, initialLikes, initialDislikes }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [reaction, setReaction] = useState<ContentReactionType | null>(currentUserReaction);
  const [counts, setCounts] = useState<ReactionCounts>({ likes: initialLikes, dislikes: initialDislikes });
  const [optimisticReaction, setOptimisticReaction] = useOptimistic(reaction);
  const [optimisticCounts, setOptimisticCounts] = useOptimistic<ReactionCounts>(counts);

  const handleReaction = (typeReaction: ContentReactionType) => {
    startTransition(async () => {
      const isActive = optimisticReaction === typeReaction;
      const isLike = typeReaction === ContentReactionType.LIKE;
      const wasLike = optimisticReaction === ContentReactionType.LIKE;
      const wasDislike = optimisticReaction === ContentReactionType.DISLIKE;

      const newCounts = { ...optimisticCounts };

      if (isActive) {
        if (isLike) newCounts.likes -= 1;
        else newCounts.dislikes -= 1;
      } else {
        if (isLike) {
          newCounts.likes += 1;
          if (wasDislike) newCounts.dislikes -= 1;
        } else {
          newCounts.dislikes += 1;
          if (wasLike) newCounts.likes -= 1;
        }
      }

      setOptimisticReaction(isActive ? null : typeReaction);
      setOptimisticCounts(newCounts);

      const resReaction = await toggleReactionByContext({ [contextField]: contentId }, typeReaction, { tag: `reaction-${contentId}` });
      if (!resReaction.ok) {
        toast.error('Debes iniciar sesión, idiota');
        return;
      }

      const newReaction = resReaction.data ?? null;
      setReaction(newReaction);
      setCounts(newCounts);
    });
  };

  const reactions = [
    {
      label: "Me gusta",
      count: optimisticCounts.likes,
      icon: optimisticReaction === ContentReactionType.LIKE
        ? <BiSolidLike size={16} className="text-white" />
        : <BiLike size={16} className="text-white" />,
      typeReaction: ContentReactionType.LIKE,
    },
    {
      label: "No me gusta",
      count: optimisticCounts.dislikes,
      icon: optimisticReaction === ContentReactionType.DISLIKE
        ? <BiSolidDislike size={16} className="text-white" />
        : <BiDislike size={16} className="text-white" />,
      typeReaction: ContentReactionType.DISLIKE,
    },
  ];

  return (
    <div className="w-full max-w-80 flex gap-6 ml-auto">
      {reactions.map(r => (
        <BtnReactionVideoPlayer
          key={r.label}
          isActive={optimisticReaction === r.typeReaction}
          isPending={isPending}
          onClick={() => handleReaction(r.typeReaction)}
        >
          <div className="flex items-center gap-2">
            {r.icon}
            <span className="text-xs text-white">{r.label}</span>
          </div>
          <span className="text-white text-xs">{formatNumber(r.count)}</span>
        </BtnReactionVideoPlayer>
      ))}
    </div>
  );
};