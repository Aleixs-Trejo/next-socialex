import { TrackResponse } from "@/interfaces/spotify/spotify-track.interface";
import { spotifyFetch } from "./client";

const trackCache = new Map<string, TrackResponse>();

export const getTrack = async (id: string) => {
  if (trackCache.has(id)) {
    return { ok: true, dataRes: trackCache.get(id) };
  };
  const result = await spotifyFetch<TrackResponse>("tracks?", { ids: id });
  if (result.ok) trackCache.set(id, result.dataRes);
  return result;
};