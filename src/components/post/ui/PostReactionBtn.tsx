'use client';

import Image from "next/image";
import { toggleReaction } from "@/actions";
import { ReactionType } from "@/generated/prisma/enums";
import { useState, useRef, useEffect } from 'react';
import { usePathname } from "next/navigation";

const REACTIONS = [
  { type: ReactionType.LIKE, label: 'Fino', icon: '/icons/like.svg' },
  { type: ReactionType.LOVE, label: 'Hermoso', icon: '/icons/love.svg' },
  { type: ReactionType.HAHA, label: 'XD', icon: '/icons/laugh.svg' },
  { type: ReactionType.WOW, label: 'Wao', icon: '/icons/wow.svg' },
  { type: ReactionType.SAD, label: 'Pipipi', icon: '/icons/sad.svg' },
  { type: ReactionType.ANGRY, label: 'Carajo', icon: '/icons/angry.svg' },
];

interface Props {
  postId: string;
  currentReaction: ReactionType | null;
}

export const PostReactionBtn = ({ postId, currentReaction }: Props) => {
  const [showReactions, setShowReactions] = useState(false);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(currentReaction || null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  // Detectar clicks fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setShowReactions(false);
    };

    // Agregar el evento si el selector está
    if (showReactions) document.addEventListener('mousedown', handleClickOutside);

    // Limpiar de todo mal
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showReactions]);

  const handleReaction = async (reaction: ReactionType) => {
    const result = await toggleReaction(postId, reaction, pathName);
    if (result.ok) {
      if (userReaction === reaction) {
        setUserReaction(null);
      } else {
        setUserReaction(reaction);
      }
    }

    setShowReactions(false);
  };

  const currentReactionData = REACTIONS.find(r => r.type === userReaction);

  const reactionMap = REACTIONS.map(r => (
    <button key={r.type} type="button" className="h-9/10 my-auto flex flex-col items-center justify-center cursor-pointer rounded-lg sm:px-2 hover:bg-secondary-40 transition-colors duration-300 group" title={r.label} onClick={() => handleReaction(r.type)}>
      <Image
        src={r.icon}
        alt={r.label}
        width={24}
        height={24}
        className="w-8 aspect-square transition-transform duration-400 group-hover:scale-120 group-hover:animate-shake-smooth"
      />
      <span className="text-[10px] hidden sm:block w-min leading-3 sm:w-max">{r.label}</span>
    </button>
  ));

  return (
    <div className="relative grow" ref={containerRef}>
      <button
        type="button"
        onClick={() => setShowReactions(!showReactions)}
        className={`w-full flex items-center justify-center gap-2 text-gray-300 px-3 py-1.5 grow cursor-pointer transition-colors duration-300 rounded-lg hover:bg-secondary/20 ${userReaction ? 'bg-secondary/40' : ''}`}
      >
        {currentReactionData ? (
          <>
            <Image
              src={currentReactionData.icon}
              alt={currentReactionData.label}
              width={20}
              height={20}
              className="shrink-0 select-none pointer-events-none"
            />
            <span className="user-select-none pointer-events-none text-xs">{currentReactionData.label}</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="user-select-none pointer-events-none"
            >
              <rect width="20" height="20" fill="none"></rect>
              <path
                fill="currentColor"
                d="M5.324 3.463c.2-.385.52-.504.718-.437c.356.119.518.326.597.582c.089.287.078.663-.006 1.079a6 6 0 0 1-.351 1.102a7 7 0 0 1-.207.448l-.012.023l-.003.005a.5.5 0 0 0 .44.738h1.493a1 1 0 0 1 .955 1.296l-.82 2.646a1.5 1.5 0 0 1-1.854.996l-4.244-1.24a1 1 0 0 1-.656-.61l-.312-.834a1 1 0 0 1 .44-1.218l1.162-.664A3.5 3.5 0 0 0 4.03 5.95zm2.669 2.54h-.719a7 7 0 0 0 .339-1.118c.098-.486.142-1.054-.019-1.573c-.17-.55-.56-1.009-1.234-1.235c-.863-.289-1.608.317-1.924.925L3.143 5.49a2.5 2.5 0 0 1-.976 1.017l-1.161.665a2 2 0 0 0-.88 2.435l.311.834a2 2 0 0 0 1.313 1.22l4.243 1.24a2.5 2.5 0 0 0 3.09-1.66l.82-2.646a2 2 0 0 0-1.91-2.592m6.683 10.54c-.2.385-.52.503-.718.437c-.356-.12-.518-.327-.597-.582c-.089-.288-.078-.664.006-1.08c.082-.406.225-.802.351-1.101a7 7 0 0 1 .207-.449l.012-.023l.003-.005a.5.5 0 0 0-.44-.737h-1.493a1 1 0 0 1-.955-1.297l.82-2.646a1.5 1.5 0 0 1 1.854-.996l4.243 1.24a1 1 0 0 1 .657.61l.311.834a1 1 0 0 1-.44 1.218l-1.16.665a3.5 3.5 0 0 0-1.368 1.423zm-2.669-2.54h.719a7 7 0 0 0-.339 1.117c-.099.487-.142 1.055.019 1.573c.17.55.56 1.01 1.234 1.235c.863.289 1.608-.317 1.924-.925l1.293-2.488a2.5 2.5 0 0 1 .976-1.017l1.161-.664a2 2 0 0 0 .88-2.435l-.311-.835a2 2 0 0 0-1.313-1.22l-4.244-1.24a2.5 2.5 0 0 0-3.089 1.66l-.82 2.646a2 2 0 0 0 1.91 2.592"
              ></path>
            </svg>
            <span className="user-select-none pointer-events-none text-xs">Reaccionar</span>
          </>
        )}
      </button>
      {showReactions && (
        <div className="min-w-40 w-[70dvw] max-w-max absolute -top-11 sm:-top-15 z-10 inset-x-0 bg-secondary rounded-xl animate-fade-in">
          <div className="flex items-center gap-2 w-full p-1">
            {reactionMap}
          </div>
        </div>
      )}
    </div>
  );
};