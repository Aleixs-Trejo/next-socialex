import Image from "next/image";
import Link from "next/link";

interface Props {
  seasonNumber: number;
  episodesNumber: number;
  seasonTitle: string;
  imgSeason: string;
  route: string;
}

export const SeasonCard = ({ seasonNumber, episodesNumber, seasonTitle, route, imgSeason }: Props) => {
  return (
    <Link href={route} className="group relative flex flex-col rounded-md border border-white/10 bg-white/5 transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-lg hover:shadow-primary/10" draggable={false}>
      <div className="w-full aspect-video relative overflow-hidden">
        <Image src={imgSeason} alt={seasonTitle} width={320} height={240} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" draggable={false} />
      </div>
      <div className="flex flex-col gap-2 p-3 grow">
        <h3 className="text-lg font-semibold">{seasonTitle} - Temp. {seasonNumber}</h3>
        <div className="flex flex-col gap-2 mt-auto">
          <span className="text-gray-400 font-normal text-xs">Total Episodios: {episodesNumber}</span>
        </div>
      </div>
    </Link>
  )
};