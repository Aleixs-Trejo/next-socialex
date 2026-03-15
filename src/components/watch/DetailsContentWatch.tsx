import Image from "next/image";
import Link from "next/link";
import { EmptyData } from "@/components";
import { connection } from "next/server";
import { getAllLikesAndDislikes, getReactionContextByUser } from "@/actions";
import { ContentContext } from "@/interfaces";
import { ReactionsBtnsContentWatch } from "./ReactionBtnsContentWatch";

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg';

interface Props {
  coverImage: string | null;
  title: string;
  context: ContentContext;
  contentId: string;
}

export const DetailsContentWatch = async ({ coverImage, title, context, contentId }: Props) => {
  await connection();

  const field = Object.keys(context)[0] as keyof ContentContext;

  const [resReactions, currentUserReaction] = await Promise.all([
    getAllLikesAndDislikes(field, [contentId]),
    getReactionContextByUser(context),
  ]);

  if (!resReactions.ok || !resReactions.data) return <EmptyData message="Error al obtener reacciones" />;

  const counts = resReactions.data[contentId];
  const likeUsers = counts?.likeUsers ?? [];
  const dislikeUsers = counts?.dislikeUsers ?? [];

  const isMoreLikes = likeUsers.length >= dislikeUsers.length;
  const dataReactions = isMoreLikes ? likeUsers : dislikeUsers;
  const dataReactionsCount = dataReactions.length;

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

  return (
    <div className="flex flex-col gap-2 details-watch">
      <figure className="w-full max-w-90 figure-details-watch mx-auto border-5 border-white">
        <Image src={coverImage || defaultImage} alt={title} width={320} height={240} className="w-full h-full object-cover" draggable={false} />
      </figure>
      <ReactionsBtnsContentWatch context={context} currentUserReaction={currentUserReaction} />
      <div className="flex flex-col">
        <span className="p-3 text-xs text-gray-300">{infoReactions()}</span>
        <div className="border-b border-primary w-full h-px" />
        <div className="w-full max-h-115 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            {dataReactions.map(user => (
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