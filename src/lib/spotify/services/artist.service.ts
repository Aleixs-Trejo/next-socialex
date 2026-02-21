import { spotifyFetch, SpotifyResult } from "@/lib/spotify/client";
import { mapArtistHome } from "@/lib/spotify/mappers/artist.mapper";
import type { ArtistResponse } from "@/interfaces/spotify/spotify-artist.interface";
import type { ArtistsRelatedSimplified } from "@/lib/spotify/mappers/artist.mapper";

export async function getArtistSimplified(id: string): Promise<SpotifyResult<ArtistsRelatedSimplified>> {
  const res = await spotifyFetch<ArtistResponse>("artist_overview", { id });
  
  if (!res.ok) return res;
  
  return { ok: true, dataRes: mapArtistHome(res.dataRes) };
}