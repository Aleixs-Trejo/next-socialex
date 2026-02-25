import { Item } from "@/interfaces/spotify/spotify-album.interface";
import { LuClock3 } from "react-icons/lu";
import { TrackAlbum } from "./TrackAlbum";

interface Props {
  tracks : Item[];
  albumImage: string;
}

export const TracksAlbum = ({ tracks, albumImage }: Props) => {
  const tracksSimplify = tracks.map(track => ({
    trackId: track.id,
    artists: track.artists.map(artist => artist.name).join(', '),
    imgsrc: albumImage,
    trackName: track.name,
    preview_url: track.preview_url,
    timeMilliseconds: track.duration_ms,
  }));

  const tracksMap = tracksSimplify.map((track, idx) => (
    <TrackAlbum key={track.trackId} idx={idx} track={track} trackId={track.trackId} />
  ));

  return (
    <div className="w-9/10 max-w-3xl mx-auto py-4">
      <div className="w-full flex flex-col gap-2">
        <div className="h-9 flex items-center gap-4 text-gray-400 px-4 border-b border-primary text-xs">
          <div className="w-4 shrink-0">
            <span>#</span>
          </div>
          <div className="grow">
            <span>Título</span>
          </div>
          <div className="w-4 shrink-0">
            <LuClock3 size={16} />
          </div>
        </div>
      </div>
      {tracksMap}
    </div>
  )
};