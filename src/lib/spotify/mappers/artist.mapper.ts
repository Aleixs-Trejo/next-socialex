import type { ArtistResponse, Discography } from "@/interfaces/spotify/spotify-artist.interface";

export interface SimplifiedArtistHome {
  artistName: string;
  artistUri: string;
  avatarImage: string;
}

export interface ArtistsRelatedSimplified extends SimplifiedArtistHome {
  artistsRelated: SimplifiedArtistHome[];
}

const SPOTIFY_FALLBACK_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png";

export const  mapArtistHome = (res: ArtistResponse): ArtistsRelatedSimplified => {
  const artist = res?.data?.artist;

  return {
    artistName: artist?.profile?.name ?? "",
    artistUri: artist?.uri ?? "",
    avatarImage: artist?.visuals?.avatarImage?.sources[0]?.url ?? SPOTIFY_FALLBACK_IMG,
    artistsRelated: artist?.relatedContent?.relatedArtists?.items.map(item => ({
      artistName: item.profile?.name ?? "",
      artistUri: item.uri ?? "",
      avatarImage: item.visuals?.avatarImage?.sources[0]?.url ?? SPOTIFY_FALLBACK_IMG,
    })) ?? [],
  };
}

export const mapArtistDiscography = (res: Discography) => {
  const albums = res.albums.items.map(item => item.releases.items[0]);
  const popularReleases = res.popularReleases.items.map(item => item.releases.items[0]);
  const latest = res.latest;
  const singles = res.singles.items.map(item => item.releases.items[0]);

  return { albums, popularReleases, singles, latest };
};