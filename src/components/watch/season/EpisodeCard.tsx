import Image from "next/image";
import Link from "next/link";

interface Props {
  route: string;
  epImg: string;
  epNumber: number;
  epTitle: string;
  description: string;
  tag: string;
}

export const EpisodeCard = ({ route, epImg, epNumber, epTitle, description, tag }: Props) => {
  return (
    <Link href={route} className="group relative flex flex-col rounded-md border border-white/10 bg-white/5 transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-lg hover:shadow-primary/10" draggable={false}>
      <div className="w-full aspect-video relative overflow-hidden">
        <Image src={epImg} alt={epTitle} width={320} height={240} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" draggable={false} />
      </div>
      <div className="flex flex-col gap-2 p-3 grow">
        <h3 className="text-lg font-semibold">Ep. {epNumber} - {epTitle} - <span key={tag} className="px-2 py-0.5 rounded-full bg-primary text-white text-xs align-middle">{tag}</span></h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </Link>
  )
};