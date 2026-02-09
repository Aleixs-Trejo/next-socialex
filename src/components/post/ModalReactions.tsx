import { ReactionType } from "@/generated/prisma/enums";
import Image from "next/image";
import { useState } from "react";
import { ImageCustom } from "../image-custom/ImageCustom";
import Link from "next/link";

const REACTIONS_ICONS = [
  { type: ReactionType.LIKE, icon: '/icons/like.svg' },
  { type: ReactionType.LOVE, icon: '/icons/love.svg' },
  { type: ReactionType.HAHA, icon: '/icons/laugh.svg' },
  { type: ReactionType.WOW, icon: '/icons/wow.svg' },
  { type: ReactionType.SAD, icon: '/icons/sad.svg' },
  { type: ReactionType.ANGRY, icon: '/icons/angry.svg' },
];

interface Props {
  groupedReactions: Record<ReactionType, Array<{ id: string; name: string | null; image: string | null; profession: string | null }>> | undefined;
  onClose: () => void;
}

export const ModalReactions = ({ groupedReactions, onClose }: Props) => {
  const [btnReactionSelected, setBtnReactionSelected] = useState<ReactionType>(ReactionType.LIKE);

  const handleReaction = (reaction: ReactionType) => {
    setBtnReactionSelected(reaction);
  };

  const selectedUsers = groupedReactions?.[btnReactionSelected] || [];

  const reactionMap = REACTIONS_ICONS.map(r => {
    const count = groupedReactions?.[r.type]?.length || 0;
    return (
      <button
        key={r.type}
        type="button"
        className={`h-9/10 my-auto flex-1 flex items-center justify-center border-b-2 cursor-pointer rounded-tr-lg rounded-tl-lg sm:px-2 transition-colors duration-300 ${btnReactionSelected === r.type ? 'bg-secondary/40 border-primary' : 'border-white'}`}
        title={r.type}
        onClick={() => handleReaction(r.type)}
      >
        <div className="flex items-center gap-1">
          <Image
            src={r.icon}
            alt={r.type}
            width={20}
            height={20}
            className="w-5 aspect-square"
          />
          <span className="text-[10px]">{count}</span>
        </div>
      </button>
    )
  });

  return (
    <section className="fixed inset-0 z-20 bg-black/60 flex items-center justify-center" onClick={onClose}>
      <div className="bg-accent-dark rounded-lg overflow-hidden w-9/10 max-w-2xl mx-auto flex flex-col h-[50dvh]" onClick={e => e.stopPropagation()}>
        <div className="w-full px-2 h-12 shrink-0 flex gap-1 items-center bg-bg-card">
          {reactionMap}
        </div>
        <div className="w-full grow overflow-auto scroll-auto">
          <div className="w-full h-full flex flex-col gap-2">
            <ul className="w-full flex flex-col gap-4 py-2">
              {selectedUsers.length > 0 ? (
                selectedUsers.map(user => (
                  <li key={user.id} className="flex items-center gap-2 px-2 md:px-4 lg:px-6">
                    <div className="relative shrink-0 w-9 h-9 rounded-full">
                      <ImageCustom
                        src={user.image || undefined}
                        alt={user.name || ""}
                        width={24}
                        height={24}
                        className="w-full h-full rounded-full object-contain object-center"
                      />
                      <Image
                        src={REACTIONS_ICONS.find(r => r.type === btnReactionSelected)!.icon}
                        alt={btnReactionSelected}
                        width={16}
                        height={16}
                        className="absolute bottom-0 -right-1/10 object-contain object-center w-4 h-4"
                      />
                    </div>
                    <div className="w-full h-full flex flex-col leading-2">
                      <Link href={`/socialex/user/${user.id}`} className="font-semibold text-sm hover:underline">{user.name}</Link>
                      <span className="text-xs text-gray-400">{user.profession}</span>
                    </div>
                  </li>
                ))
              ) : (
                <span className="text-center text-gray-300 p-4 text-sm">No hay nada por aquí 😢</span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};