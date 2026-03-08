import { EmptyData } from "@/components";
import { BtnBack } from "@/components/btn-back/BtnBack";
import { getEpisodeByNumber, getSeasonByNumber } from "@/actions";
import { Suspense } from "react";
import { WatchEpisodeContent } from "@/components/watch/episode/WatchEpisodeContent";

interface Props {
  params: Promise<{ serieId: string; seasonId: string; episodeNumber: number }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { serieId, seasonId, episodeNumber } = await params;

  const seasonNumber = seasonId.split('-')[1];

  const resSeason = await getSeasonByNumber(serieId, +seasonNumber);
  if (!resSeason.ok) return <EmptyData message="Error al obtener la temporada" />;

  const season = resSeason.data;

  if (!season) return <EmptyData message="Temporada no encontrada" />;

  const resEpisode = await getEpisodeByNumber(season.id, +episodeNumber);
  if (!resEpisode.ok) return <EmptyData message="Error al obtener episodio" />;
  const episode = resEpisode.data;
  if (!episode) return <EmptyData message="Episodio no encontrado" />;

  return {
    title: `${season.title} - ${episode.title} | Socialex`,
    description: episode.description,
    canonical: `https://next-socialex.vercel.app/socialex/watch/${serieId}/${seasonId}/${episodeNumber}`,
    openGraph: {
      url: `https://next-socialex.vercel.app/socialex/watch/${serieId}/${seasonId}/${episodeNumber}`,
      title: `${season.title} - ${episode.title} | Socialex`,
      description: episode.description,
      images: [
        {
          url: episode.thumbnail,
          width: 650,
          height: 381,
          alt: episode.title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${season.title} - ${episode.title} | Socialex`,
      description: episode.description,
      images: [
        {
          url: episode.thumbnail,
          width: 650,
          height: 381,
          alt: episode.title,
        }
      ]
    },
  };
};

const WatchEpisodePage = async ({ params }: Props) => {
  const { serieId, seasonId, episodeNumber } = await params;

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <BtnBack />
      <Suspense fallback={<div className="w-9/10 max-w-5xl mx-auto animate-pulse" />}>
        <WatchEpisodeContent
          serieId={serieId}
          seasonId={seasonId}
          episodeNumber={+episodeNumber}
        />
      </Suspense>
    </div>
  );
};

export default WatchEpisodePage;