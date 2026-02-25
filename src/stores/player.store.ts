import { Track } from "@/interfaces/spotify/spotify-track.interface";
import { create } from "zustand";

export type PlayerTrack = Pick<Track, 'id' | 'name' | 'artists' | 'album' | 'preview_url'>;

interface PlayerState {
  track: PlayerTrack | null;
  isPlaying: boolean;

  setTrack: (track: PlayerTrack) => void;
  setIsPlaying: (playing: boolean) => void;
  clearTrack: () => void;
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  track: null,
  isPlaying: false,

  setTrack: (track) => set({ track, isPlaying: true }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  clearTrack: () => set({ track: null, isPlaying: false }),
}));