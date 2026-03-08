'use client';

import { toggleReactionBySeason } from "@/actions";
import { ContentReactionType } from "@/generated/prisma/enums";
import { useOptimistic, useTransition } from "react";

interface Props {
  serieId: string;
  seasonNumber: number;
  children: React.ReactNode;
  typeReaction: ContentReactionType;
  currentUserReaction: ContentReactionType | null;
}

export const BtnReactionSeason = ({ children, serieId, seasonNumber, typeReaction, currentUserReaction }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticReaction, setOptimisticReaction] = useOptimistic(currentUserReaction);

  const isActive = optimisticReaction === typeReaction;

  const handleClick = () => {
    startTransition(async () => {
      setOptimisticReaction(isActive ? null : typeReaction);
      await toggleReactionBySeason(serieId, seasonNumber, typeReaction);
    });
  };

  return (
    <button type="button" className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-tertiary/40 rounded-xl flex-1 h-auto transition-all duration-300 ${isPending ? 'cursor-wait' : ''} ${isActive ? 'bg-primary border border-primary' : 'bg-accent'}`} data-type-reaction={typeReaction} onClick={handleClick}>{children}</button>
  );
};