'use client';

import { ContentReactionType } from "@/generated/prisma/enums";
import { BiLike, BiSolidLike, BiSolidDislike, BiDislike } from "react-icons/bi";
import { BtnReactionMovie } from "./BtnReactionMovie";
import { useOptimistic, useTransition } from "react";
import { toggleReactionByMovie } from "@/actions";
import { toast } from "sonner";
import { formatNumber } from "@/utils/formatNumber";

interface ReactionCounts {
  likes: number;
  dislikes: number;
}

interface Props {
  movieId: string;
  currentUserReaction: ContentReactionType | null;
  initialLikes: number;
  initialDislikes: number;
}

export const BtnsReactionMovie = ({ movieId, currentUserReaction, initialLikes, initialDislikes }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticReaction, setOptimisticReaction] = useOptimistic(currentUserReaction);
  const [optimisticCounts, setOptimisticCounts] = useOptimistic<ReactionCounts>(
    { likes: initialLikes, dislikes: initialDislikes }
  );

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

      const resReaction = await toggleReactionByMovie(movieId, typeReaction);
      if (!resReaction.ok) toast.error('Debes iniciar sesión, idiota');
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
        <BtnReactionMovie
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
        </BtnReactionMovie>
      ))}
    </div>
  );
};