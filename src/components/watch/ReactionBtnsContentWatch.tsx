'use client';

import { toggleReactionByContext } from "@/actions";
import { ContentReactionType } from "@/generated/prisma/enums";
import { ContentContext } from "@/interfaces";
import { useState, useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { usePathname } from "next/navigation";

const reactions = [
  { label: 'Me gusta', icon: <IoMdHeart size={16} className="text-red-500" />, typeReaction: ContentReactionType.LIKE },
  { label: 'No me gusta', icon: <IoMdHeartDislike size={16} className="text-red-500" />, typeReaction: ContentReactionType.DISLIKE },
];

interface Props {
  context: ContentContext;
  currentUserReaction: ContentReactionType | null;
}

export const ReactionsBtnsContentWatch = ({ context, currentUserReaction }: Props) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [reaction, setReaction] = useState<ContentReactionType | null>(currentUserReaction);
  const [optimisticReaction, setOptimisticReaction] = useOptimistic(reaction);

  const handleClick = (typeReaction: ContentReactionType) => {
    startTransition(async () => {
      const newReaction = optimisticReaction === typeReaction ? null : typeReaction;
      setOptimisticReaction(newReaction);

      const resReaction = await toggleReactionByContext(context, typeReaction, { path: pathname });

      if (!resReaction.ok) {
        toast.error('Debes iniciar sesión, idiota');
        return;
      }

      setReaction(resReaction.data ?? null);
    });
  };

  return (
    <div className="flex gap-2">
      {reactions.map(r => {
        const isActive = optimisticReaction === r.typeReaction;
        return (
          <button
            key={r.label}
            type="button"
            onClick={() => handleClick(r.typeReaction)}
            data-type-reaction={r.typeReaction}
            disabled={isPending}
            className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-tertiary/40 rounded-xl flex-1 h-auto transition-all duration-300 ${isPending ? 'cursor-wait' : ''} ${isActive ? 'bg-primary border border-primary' : 'bg-accent'}`}
          >
            {r.icon}
            <span className="text-xs text-white">{r.label}</span>
          </button>
        );
      })}
    </div>
  );
};