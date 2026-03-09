import { notFound } from "next/navigation";
import { EmptyData, VideoPlayer } from "@/components";
import { getEpisodeByNumber, getSeasonByNumber, getSignedVideoUrl } from "@/actions";
import { CommentsEpisode } from "./CommentsEpisode";
import { Suspense } from "react";
import { BtnsReactionEpisodeWrapper } from "./BtnsReactionEpisodeWrapper";
import { connection } from "next/server";
import { WatchEpisodeVideo } from "./WatchEpisodeVideo";

interface Props {
  serieId: string;
  seasonId: string;
  episodeNumber: number;
}

export const WatchEpisodeContent = async ({ serieId, seasonId, episodeNumber }: Props) => {
  await connection();
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
      <Suspense fallback={<div className="h-64" />}>
        <WatchEpisodeVideo seasonTitle={season.title || ''} episodeNumber={episodeNumber} signedUrl={signedUrl} seasonId={seasonId} episodeTitle={episode.title} />
      </Suspense>
      <Suspense fallback={<div className="h-10" />}>
        <BtnsReactionEpisodeWrapper episodeId={episode.id} />
      </Suspense>
      <Suspense fallback={<div className="h-20" />}>
        <CommentsEpisode episodeId={episode.id} />
      </Suspense>
    </div>
  );
};