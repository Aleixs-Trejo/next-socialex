import { cacheTag } from 'next/cache';
import { getSignedVideoUrl } from '@/actions';
import { VideoPlayer } from "@/components";

interface Props {
  seasonTitle: string;
  episodeNumber: number;
  r2Key: string;
  seasonNumber: string;
  episodeTitle: string;
}

export const WatchEpisodeVideo = async ({ seasonTitle, episodeNumber, r2Key, seasonNumber, episodeTitle }: Props) => {
  'use cache';
  cacheTag(`episode-video-${r2Key}`);

  const signedUrl = await getSignedVideoUrl(r2Key);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-white text-xl font-bold">{seasonTitle} - Episodio {episodeNumber}</h1>
        <span className="text-sm text-gray-300">{episodeTitle}</span>
      </div>
      <VideoPlayer src={signedUrl} title={`${seasonNumber} - Ep. ${episodeNumber} - ${episodeTitle}`} />
    </>
  );
};