import { TrackPreview } from "@/components/spotify/TrackPreview";
import { formatMilliseconds } from "@/utils/formatMilliseconds";
import Image from "next/image";

interface Props {
  idx: number;
  trackName: string;
  imgsrc: string;
  timeMilliseconds: number;
  trackId: string;
}

export const TrackPopularArtist = ({ idx, trackName, imgsrc, timeMilliseconds, trackId }: Props) => {

  return (
    <TrackPreview trackId={trackId} title={trackName}>
      <span className="shrink-0 text-xs">{idx + 1}</span>
      <div className="w-full flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Image src={imgsrc} width={40} height={40} alt="Cover" className="w-10 h-10 object-contain object-center" />
          <span className="text-white font-normal text-sm leading-4">{trackName}</span>
        </div>
        <div className="text-gray-400 text-xs">{formatMilliseconds(timeMilliseconds)}</div>
      </div>
    </TrackPreview>
  )
};