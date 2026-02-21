import { ArtistResponse } from "@/interfaces/spotify/spotify-artist.interface";
import { spotifyFetch } from "./client";

export const getArtist = async (id: string) => spotifyFetch<ArtistResponse>("artist_overview/?", { id });

export const getArtistRelatedArtists = async (id: string) => spotifyFetch<ArtistResponse>("artist_related/?", { id });