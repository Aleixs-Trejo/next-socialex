'use client';

import { ContentReactionType } from "@/generated/prisma/enums";
import { BiLike, BiSolidLike, BiSolidDislike, BiDislike } from "react-icons/bi";
import { BtnReactionEpisode } from "./BtnReactionEpisode";
import { useOptimistic, useTransition } from "react";
import { toggleReactionByEpisode } from "@/actions";

interface Props {
  episodeId: string;
  currentUserReaction: ContentReactionType | null;
}

export const BtnsReactionEpisode = ({ episodeId, currentUserReaction }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticReaction, setOptimisticReaction] = useOptimistic(currentUserReaction);

  const handleReaction = (typeReaction: ContentReactionType) => {
    startTransition(async () => {
      const isActive = optimisticReaction === typeReaction;
      setOptimisticReaction(isActive ? null : typeReaction);
      await toggleReactionByEpisode(episodeId, typeReaction);
    });
  };

  const reactions = [
    {
      label: "Me gusta",
      icon: optimisticReaction === ContentReactionType.LIKE
        ? <BiSolidLike size={16} className="text-white" />
        : <BiLike size={16} className="text-white" />,
      typeReaction: ContentReactionType.LIKE,
    },
    {
      label: "No me gusta",
      icon: optimisticReaction === ContentReactionType.DISLIKE
        ? <BiSolidDislike size={16} className="text-white" />
        : <BiDislike size={16} className="text-white" />,
      typeReaction: ContentReactionType.DISLIKE,
    },
  ];

  return (
    <div className="w-full max-w-62 flex gap-2 ml-auto">
      {reactions.map(r => (
        <BtnReactionEpisode
          key={r.label}
          isActive={optimisticReaction === r.typeReaction}
          isPending={isPending}
          onClick={() => handleReaction(r.typeReaction)}
        >
          {r.icon}
          <span className="text-xs text-white">{r.label}</span>
        </BtnReactionEpisode>
      ))}
    </div>
  );
};