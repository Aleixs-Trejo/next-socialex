import { notFound } from "next/navigation";
import { EmptyData, VideoPlayer } from "@/components";
import { getEpisodeByNumber, getSeasonByNumber, getSignedVideoUrl } from "@/actions";
import { CommentsEpisode } from "./CommentsEpisode";
import { Suspense } from "react";
import { BtnsReactionEpisodeWrapper } from "./BtnsReactionEpisodeWrapper";

interface Props {
  serieId: string;
  seasonId: string;
  episodeNumber: number;
}

export const WatchEpisodeContent = async ({ serieId, seasonId, episodeNumber }: Props) => {
  const seasonNumber = seasonId.split('-')[1];

  const resSeason = await getSeasonByNumber(serieId, +seasonNumber);
  if (!resSeason.ok) return <EmptyData message="Error al obtener la temporada" />;
  const season = resSeason.data;
  if (!season) return <EmptyData message="Temporada no encontrada" />;

  const resEpisode = await getEpisodeByNumber(season.id, episodeNumber);
  if (!resEpisode.ok) return notFound();
  const episode = resEpisode.data;
  if (!episode) return notFound();

  const signedUrl = await getSignedVideoUrl(episode.r2Key);

  

  return (
    <div className="w-9/10 max-w-5xl mx-auto flex flex-col gap-4 overflow-hidden">
      <div className="flex flex-col">
        <h1 className="text-white text-xl font-bold">{season.title} - Episodio {episodeNumber}</h1>
        <span className="text-sm text-gray-300">{episode.title}</span>
      </div>
      <VideoPlayer src={signedUrl} title={`${seasonId} - Ep. ${episodeNumber} - ${episode.title}`} />
      <Suspense fallback={<div className="h-10" />}>
        <BtnsReactionEpisodeWrapper episodeId={episode.id} />
      </Suspense>
      <Suspense fallback={<div className="h-20" />}>
        <CommentsEpisode episodeId={episode.id} />
      </Suspense>
    </div>
  );
};