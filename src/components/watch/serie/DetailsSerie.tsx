import Image from "next/image";
import { BtnReactionSerie } from "./BtnReactionSerie";
import Link from "next/link";
import { ContentReactionType } from "@/generated/prisma/enums";
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { getReactionDislikeUsers, getReactionLikeUsers, getReactionSerieByUser } from "@/actions";
import { EmptyData } from "@/components/empty-data/EmptyData";
import { connection } from "next/server";

const reactions = [
  { label: 'Me gusta', icon: <IoMdHeart size={16} className="text-red-500" />, typeReaction: ContentReactionType.LIKE },
  { label: 'No me gusta', icon: <IoMdHeartDislike size={16} className="text-red-500" />, typeReaction: ContentReactionType.DISLIKE },
];

interface Props {
  coverImage: string | null;
  title: string;
  serieId: string;
}

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg';

export const DetailsSerie = async ({ coverImage, title, serieId }: Props) => {
  await connection();
  const getReactionLikes = await getReactionLikeUsers(serieId);
  const getReactionDislikes = await getReactionDislikeUsers(serieId);

  const dataLikes = getReactionLikes.data ?? [];
  const dataDislikes = getReactionDislikes.data ?? [];

  const isMoreLikes = dataLikes.length > dataDislikes.length;
  const dataReactions = isMoreLikes ? dataLikes : dataDislikes;
  const dataReactionsCount = dataReactions.length;

  if (!dataLikes) return <EmptyData message="Error al obtener información" />;

  const infoReactions = () => {
    if (dataReactionsCount === 0) return `Parece que nadie reacciona`;

    if (isMoreLikes) {
      if (dataReactionsCount === 1) return `A alguien hermosx le gusta ${title}`;
      return `A ${dataReactionsCount} guapos les gusta ${title} uwu`;
    } else {
      if (dataReactionsCount === 1) return `A un feo no le gusta ${title} :(`;
      return `A ${dataReactionsCount} feos no les gusta ${title} :(`;
    }
  };

  const currentUserReaction = await getReactionSerieByUser(serieId);

  return (
    <div className="flex flex-col gap-2 details-watch">
      <figure className="w-full max-w-90 figure-details-watch mx-auto border-5 border-white">
        <Image src={coverImage || defaultImage} alt={title} width={320} height={240} className="w-full h-full object-cover" draggable={false} />
      </figure>
      <div className="flex gap-2">
        {reactions.map(r => (
          <BtnReactionSerie key={r.label} serieId={serieId} typeReaction={r.typeReaction} currentUserReaction={currentUserReaction}>
            {r.icon}
            <span className="text-xs text-white">{r.label}</span>
          </BtnReactionSerie>
        ))}
      </div>
      <div className="flex flex-col">
        <span className="p-3 text-xs text-gray-300">{infoReactions()}</span>
        <div className="border-b border-primary w-full h-px" />
        <div className="w-full max-h-115 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            {dataReactions.map(({ user }) => (
              <Link href={`/socialex/user/${user.id}`} key={user.id} className="flex flex-col items-center gap-2 p-1" title={user.name || ''}>
                <Image src={user.image || defaultImage} alt={user.name || 'Usuario piola'} width={96} height={96} className="w-full h-full object-cover rounded-md" draggable={false} />
                <span className="text-xs text-white text-center leading-3">{user.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};