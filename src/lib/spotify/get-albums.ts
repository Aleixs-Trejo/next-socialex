import { spotifyFetch } from "./client";
import { AlbumResponse } from "@/interfaces/spotify/spotify-album.interface";

export const getAlbum = (id: string) => spotifyFetch<AlbumResponse>("albums/?", { ids: id });