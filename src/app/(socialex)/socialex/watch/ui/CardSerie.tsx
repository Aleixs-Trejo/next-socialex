import { getAudienceMessage } from "@/utils/reactionsWatch";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  likes: number;
  dislikes: number;
}

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg'

export const CardSerie = ({ id, title, description, coverImage, likes, dislikes }: Props) => {
  const audienceMsg = getAudienceMessage(likes, dislikes);
  const serieImg = coverImage || defaultImage;

  return (
    <Link key={id} href={`/socialex/watch/${id}`} className="group relative flex flex-col justify-between rounded-xl border border-secondary shadow-md transition-all duration-300 hover:border-bright overflow-hidden" draggable={false}>
      <div className="relative aspect-video w-full overflow-hidden">
        <Image src={serieImg} alt={title} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-300" width={320} height={240} draggable={false} />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 pb-3 border-b border-bg-card">{description?.slice(0, 103)}...</p>
        <p className="text-xs text-bright">{audienceMsg}</p>
      </div>
    </Link>
  );
};