import { VideoPlayer } from "@/components";

interface Props {
  seasonTitle: string;
  episodeNumber: number;
  signedUrl: string;
  seasonId: string;
  episodeTitle: string;
}

export const WatchEpisodeVideo = async ({ seasonTitle, episodeNumber, signedUrl, seasonId, episodeTitle }: Props) => {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-white text-xl font-bold">{seasonTitle} - Episodio {episodeNumber}</h1>
        <span className="text-sm text-gray-300">{seasonTitle}</span>
      </div>
      <VideoPlayer src={signedUrl} title={`${seasonId} - Ep. ${episodeNumber} - ${episodeTitle}`} />
    </>
  )
};