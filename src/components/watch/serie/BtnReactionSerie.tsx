'use client';

import { toggleReactionBySerie } from "@/actions";
import { ContentReactionType } from "@/generated/prisma/enums";
import { useOptimistic, useTransition } from "react";

interface Props {
  serieId: string;
  children: React.ReactNode;
  typeReaction: ContentReactionType;
  currentUserReaction: ContentReactionType | null;
}

export const BtnReactionSerie = ({ children, serieId, typeReaction, currentUserReaction }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticReaction, setOptimisticReaction] = useOptimistic(currentUserReaction);

  const isActive = optimisticReaction === typeReaction;

  const handleClick = () => {
    startTransition(async () => {
      setOptimisticReaction(isActive ? null : typeReaction);
      await toggleReactionBySerie(serieId, typeReaction);
    });
  };

  return (
    <button type="button" className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-tertiary/40 rounded-xl flex-1 h-auto transition-all duration-300 ${isPending ? 'cursor-wait' : ''} ${isActive ? 'bg-primary border border-primary' : 'bg-accent'}`} data-type-reaction={typeReaction} onClick={handleClick}>{children}</button>
  );
};