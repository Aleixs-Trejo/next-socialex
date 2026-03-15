import Image from "next/image";
import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  description: string | null;
  coverImage: string;
  serieId: string;
}

export const EventCard = ({ slug, title, description, coverImage, serieId }: Props) => {
  return (
    <Link href={`/socialex/watch/${serieId}/events/${slug}`} className="group relative flex flex-col rounded-md border border-white/10 bg-white/5 transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-lg hover:shadow-primary/10" draggable={false}>
      <div className="w-full aspect-video relative overflow-hidden">
        <Image src={coverImage} alt={title} width={320} height={240} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" draggable={false} />
      </div>
      <div className="flex flex-col gap-2 p-3 grow">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-gray-300">{description.slice(0, 103)}...</p>}
      </div>
    </Link>
  )
};