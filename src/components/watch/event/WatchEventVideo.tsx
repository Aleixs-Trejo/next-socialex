import { getSignedVideoUrl } from "@/actions";
import { VideoPlayer } from "@/components";
import { cacheTag } from "next/cache";

interface Props {
  r2Key: string;
  eventTitle: string;
}

export const WatchEventVideo = async ({ r2Key, eventTitle }: Props) => {
  'use cache';
  cacheTag(`event-video-${r2Key}`);

  const signedUrl = await getSignedVideoUrl(r2Key);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-xl font-bold">{eventTitle}</h1>
        <VideoPlayer src={signedUrl} title={eventTitle} />
      </div>
    </div>
  )
};