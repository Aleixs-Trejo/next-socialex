'use client';

import { getTrack } from "@/lib/spotify/get-track";
import { usePlayerStore } from "@/stores";

interface Props {
  trackId: string;
  title?: string;
  children: React.ReactNode;
}

export const TrackPreview = ({ trackId, title, children }: Props) => {
  const setTrack = usePlayerStore(state => state.setTrack);

  const handleClickTrack = async () => {
    const result = await getTrack(trackId);
    if (!result.ok) return;
    const t = result.dataRes?.tracks[0];
    if (!t?.preview_url) return;

    setTrack({
      id: t.id,
      name: t.name,
      artists: t.artists,
      album: t.album,
      preview_url: t.preview_url
    })
  };

  return <button className="w-full flex items-center gap-4 rounded-lg py-2 px-4 transition-colors cursor-pointer hover:bg-secondary/40" onClick={handleClickTrack} title={title}>{children}</button>
};