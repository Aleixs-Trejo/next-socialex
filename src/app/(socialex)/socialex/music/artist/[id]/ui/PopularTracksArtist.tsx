import Image from "next/image";
import { formatMilliseconds } from "@/utils/formatMilliseconds";
import { TopTracksItem } from "@/interfaces/spotify/spotify-artist.interface";

interface Props {
  artistTracks: TopTracksItem[];
}

export const PopularTracksArtist = ({ artistTracks }: Props) => {

  const popularTracksMap = artistTracks.map((trackItem, idx) => {
    const { track } = trackItem;
    const imgsrc = track.album.coverArt.sources.at(0)?.url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png';
    const timeMilliseconds = track.duration.totalMilliseconds;
  
    return (
      <button key={trackItem.uid} className="flex items-center gap-4 rounded-lg py-2 px-4 transition-colors cursor-pointer hover:bg-secondary/40">
        <span className="shrink-0 text-xs">{idx + 1}</span>
        <div className="w-full flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Image src={imgsrc} width={40} height={40} alt="Cover" className="w-10 h-10 object-contain object-center" />
            <span className="text-white font-normal text-sm leading-4">{track.name}</span>
          </div>
          <div className="text-gray-400 text-xs">{formatMilliseconds(timeMilliseconds)}</div>
        </div>
      </button>
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Popular</h3>
      <div className="flex flex-col gap-2 overflow-hidden">
        {popularTracksMap}
      </div>
    </div>
  );
};