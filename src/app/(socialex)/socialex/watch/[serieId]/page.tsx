import { ALL_CONTENT } from "@/config/watch-content";
import { notFound } from "next/navigation";
import { BackgroundSerie } from "./ui/BackgroundSerie";
import { BtnBack } from "@/components/btn-back/BtnBack";
import { EpisodeCard } from "./ui/EpisodeCard";

interface Props {
  params: Promise<{ serieId: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { serieId } = await params;
  const serie = ALL_CONTENT.find(item => item.id === serieId);
  if (!serie) notFound();

  return {
    title: `Ver ${serie.title} | Socialex`,
    description: serie.description,
    canonical: `https://next-socialex.vercel.app/socialex/watch/${serieId}`,
    openGraph: {
      url: `https://next-socialex.vercel.app/socialex/watch/${serieId}`,
      title: `Ver ${serie.title} | Socialex`,
      description: serie.description,
      images: [
        {
          url: '/img/kon/portakon.jpg',
          width: 630,
          height: 630,
          alt: serie.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${serie.title} | Socialex`,
      description: serie.description,
      images: [
        {
          url: '/img/kon/portakon.jpg',
          width: 630,
          height: 630,
          alt: serie.title,
        }
      ]
    },
  };
};

const WatchSeriesPage = async ({ params }: Props) => {
  const { serieId } = await params;
  const serie = ALL_CONTENT.find(item => item.id === serieId);
  if (!serie) notFound();

  return (
    <div className="w-full flex flex-col">
      <BackgroundSerie image={serie.image} title={serie.title} />
      <BtnBack additionalClass="my-2" />
      <div className="w-9/10 max-w-5xl mx-auto px-4 pb-6 flex flex-col gap-3">
        <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Todos los episodios</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {serie.caps.map(cap => {
            if (!cap) return null;
            return <EpisodeCard key={cap.episodeNumber} serieId={serie.id} cap={cap} tags={serie.tags} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchSeriesPage;