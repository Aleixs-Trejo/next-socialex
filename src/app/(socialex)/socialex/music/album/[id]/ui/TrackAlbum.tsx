import Image from "next/image";
import { formatMilliseconds } from "@/utils/formatMilliseconds";
import { TrackPreview } from "@/components/spotify/TrackPreview";

interface Props {
  idx: number;
  track: {
    trackId: string;
    artists: string;
    imgsrc: string;
    trackName: string;
    preview_url: string;
    timeMilliseconds: number;
  };
  trackId: string;
}

export const TrackAlbum = ({ idx, track, trackId }: Props) => {
  return (
    <TrackPreview trackId={trackId} title={track.trackName}>
      <span className="shrink-0 text-xs">{idx + 1}</span>
      <div className="w-full flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Image src={track.imgsrc} width={40} height={40} alt="Cover" className="w-10 h-10 object-contain object-center" />
          <span className="text-white font-normal text-sm leading-4">{track.trackName}</span>
        </div>
        <div className="text-gray-400 text-xs">{formatMilliseconds(track.timeMilliseconds)}</div>
      </div>
    </TrackPreview>
  );
};