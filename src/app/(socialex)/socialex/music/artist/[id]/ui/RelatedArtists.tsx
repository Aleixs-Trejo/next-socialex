import { RelatedArtistsItem } from "@/interfaces/spotify/spotify-artist.interface";
import { RelatedArtistsCarousel } from "./RelatedArtistsCarousel";

interface Props {
  artistsRelated: RelatedArtistsItem[];
}

export const RelatedArtists = ({ artistsRelated }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">A los fans también les gusta</h3>
      <RelatedArtistsCarousel artistsRelated={artistsRelated} />
    </div>
  );
};