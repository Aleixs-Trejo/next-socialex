// Este componente me trae más problemas que la vida misma

import { notFound } from "next/navigation";
import { EmptyData } from "@/components";
import { getEpisodeByNumber, getSeasonByNumber } from "@/actions";
import { Suspense } from "react";
import { WatchEpisodeVideo } from "./WatchEpisodeVideo";
import { CommentsContentWatch } from "../CommentsContentWatch";
import { BtnsReactionVideoPlayerWrapper } from "../BtnsReactionVideoPlayerWrapper";

interface Props {
  serieId: string;
  seasonNumber: string;
  episodeNumber: number;
}

export const WatchEpisodeContent = async ({ serieId, seasonNumber, episodeNumber }: Props) => {
  const countSeason = seasonNumber.split('-')[1];

  const resSeason = await getSeasonByNumber(serieId, +countSeason);
  if (!resSeason.ok) return <EmptyData message="Error al obtener la temporada" />;
  const season = resSeason.data;
  if (!season) return <EmptyData message="Temporada no encontrada" />;

  const resEpisode = await getEpisodeByNumber(season.id, episodeNumber);
  if (!resEpisode.ok) return notFound();
  const episode = resEpisode.data;
  if (!episode) return notFound();

  return (
    <div className="w-9/10 max-w-5xl mx-auto flex flex-col gap-4 overflow-hidden">
      <Suspense fallback={<div className="h-64" />}>
        <WatchEpisodeVideo seasonTitle={season.title || ''} episodeNumber={episodeNumber} r2Key={episode.r2Key} seasonNumber={seasonNumber} episodeTitle={episode.title} />
      </Suspense>
      <Suspense fallback={<div className="h-10" />}>
        <BtnsReactionVideoPlayerWrapper contentId={episode.id} contextField="episodeId" />
      </Suspense>
      <Suspense fallback={<div className="h-20" />}>
        <CommentsContentWatch context={{ episodeId: episode.id }} />
      </Suspense>
    </div>
  );
};