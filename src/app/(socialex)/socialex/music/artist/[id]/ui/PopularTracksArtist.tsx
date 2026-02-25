import { TopTracksItem } from "@/interfaces/spotify/spotify-artist.interface";
import { TrackPopularArtist } from "./TrackPopularArtist";

interface Props {
  artistTracks: TopTracksItem[];
}

export const PopularTracksArtist = async ({ artistTracks }: Props) => {
  
  const popularTracksMap = artistTracks.map(async (trackItem, idx) => {
    const { track } = trackItem;
    const imgsrc = track.album.coverArt.sources.at(0)?.url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png';
    const timeMilliseconds = track.duration.totalMilliseconds;
    const trackId = track.uri.split(':')[2];
  
    return (
      <TrackPopularArtist key={trackId} idx={idx} trackName={track.name} imgsrc={imgsrc} timeMilliseconds={timeMilliseconds} trackId={trackId} />
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