import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

interface Props {
  serieId: string;
  cap: {
    title: string;
    bg: string;
    description: string;
    episodeUrl: string;
    episodeNumber: number;
  };
  tags: string[];
}


export const EpisodeCard = ({ serieId, cap, tags }: Props) => {
  return (
    <Link href={`/socialex/watch/${serieId}/${cap.episodeNumber}`} className="group relative flex flex-col rounded-md border border-white/10 bg-white/5 transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-lg hover:shadow-primary/10" draggable={false}>
      <div className="w-full aspect-video relative overflow-hidden">
        <Image src={cap.bg} alt={cap.title} width={320} height={240} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" draggable={false} />
        <FaPlay size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-primary " />
      </div>
      <div className="flex flex-col gap-2 p-3 grow">
        <h3 className="text-xl font-semibold">{cap.title}</h3>
        <div className="flex flex-col gap-2 mt-auto">
          <p className="text-sm text-gray-500">{cap.description.slice(0, 103)}...</p>
          <div className="flex items-center gap-2 mt-auto">
            {tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-primary text-white text-xs">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};