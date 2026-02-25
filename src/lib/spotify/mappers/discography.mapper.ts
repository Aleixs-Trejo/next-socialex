import { ArtistResponse } from "@/interfaces/spotify/spotify-artist.interface";

export const mapDiscography = (res: ArtistResponse) => {
  const artist = res?.data?.artist;

  return artist?.discography ?? {}
};