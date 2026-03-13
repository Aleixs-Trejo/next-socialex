import { getSignedVideoUrl } from "@/actions";
import { VideoPlayer } from "@/components/media-player/VideoPlayer";
import { cacheTag } from "next/cache";

interface Props {
  r2Key: string;
  movieTitle: string;
}

export const WatchMovieVideo = async ({ r2Key, movieTitle }: Props) => {
  'use cache';
  cacheTag(`movie-video-${r2Key}`);

  const signedUrl = await getSignedVideoUrl(r2Key);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-xl font-bold">{movieTitle}</h1>
        <VideoPlayer src={signedUrl} title={movieTitle} />
      </div>
    </div>
  )
};