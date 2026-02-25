'use client';

import { DiscographyCarousel } from "@/components/spotify/DiscographyCarousel";
import { Artist } from "@/interfaces/spotify/spotify-artist.interface";
import { normalizeDiscography } from "@/lib/spotify/mappers/album.mapper";
import { mapArtistDiscography } from "@/lib/spotify/mappers/artist.mapper";

interface Props {
  artist: Artist;
}

export const DiscographyArtistAlbum = ({ artist }: Props) => {
  const rawDiscography = mapArtistDiscography(artist.discography);
  const { popular } = normalizeDiscography(rawDiscography);

  return (
    <div className="w-9/10 max-w-3xl mx-auto py-4">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-white">Más de {artist.profile.name}</h3>
        <DiscographyCarousel releases={popular} />
      </div>
    </div>
  )
};