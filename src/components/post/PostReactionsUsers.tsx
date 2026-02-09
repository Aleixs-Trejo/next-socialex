'use client';

import { ReactionType } from "@/generated/prisma/enums";
import { limitNamesCount } from "@/utils/limit-names-count";
import { useState } from "react";
import { ModalReactions } from "./ModalReactions";

interface Props {
  allReactions: number;
  usersReactions: (string | null)[];
  groupedReactions: Record<ReactionType, Array<{ id: string; name: string | null; image: string | null; profession: string | null }>> | undefined;
}

export const PostReactionsUsers = ({ allReactions, usersReactions, groupedReactions }: Props) => {
  const [showReactions, setShowReactions] = useState(false);

  const usersMap = limitNamesCount(usersReactions).map((user, idx) => (
    <li key={idx} className="text-sm text-gray-800 leading-4">{ user }</li>
  ));

  return (
    <div className="relative group">
      <button type="button" className="flex items-center gap-2 cursor-pointer hover:underline" onClick={() => setShowReactions(!showReactions)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="shrink-0 select-none pointer-events-none"
        >
          <rect width="20" height="20" fill="none"></rect>
          <path
            fill="currentColor"
            d="M7.993 6.003h-.719a7 7 0 0 0 .339-1.118c.098-.486.142-1.054-.019-1.573c-.17-.55-.56-1.009-1.234-1.235c-.863-.289-1.608.317-1.924.925L3.143 5.49a2.5 2.5 0 0 1-.976 1.017l-1.161.665a2 2 0 0 0-.88 2.435l.311.834a2 2 0 0 0 1.313 1.22l4.243 1.24a2.5 2.5 0 0 0 3.09-1.66l.82-2.646a2 2 0 0 0-1.91-2.592m4.733 8h-.719a2 2 0 0 1-1.91-2.593l.82-2.646a2.5 2.5 0 0 1 3.09-1.66l4.243 1.24a2 2 0 0 1 1.313 1.22l.311.835a2 2 0 0 1-.88 2.435l-1.161.665a2.5 2.5 0 0 0-.976 1.016l-1.293 2.488c-.316.608-1.06 1.214-1.924.925c-.674-.226-1.064-.685-1.234-1.235c-.16-.518-.118-1.087-.019-1.573c.084-.414.216-.805.338-1.117"
          ></path>
        </svg>
        <span className="text-xs text-gray-200 select-none pointer-events-none">{allReactions}</span>
      </button>
      {usersReactions && usersReactions.length > 0 && (
        <div className="absolute z-5 opacity-0 transition-opacity pointer-events-none bottom-full left-0 w-max h-max bg-gray-200 rounded-md p-2 group-hover:opacity-100">
          <ul className="flex flex-col gap-1">
            {usersMap}
          </ul>
        </div>
      )}
      {showReactions && (
        <ModalReactions groupedReactions={groupedReactions} onClose={() => setShowReactions(false)} />
      )}
    </div>
  );
};