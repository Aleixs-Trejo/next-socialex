import { RelatedArtistsItem } from "@/interfaces/spotify/spotify-artist.interface";
import Image from "next/image";
import Link from "next/link";

export const ArtistRelatedCard = ({ artist }: { artist: RelatedArtistsItem }) => {
  return (
    <Link
      href={`/socialex/music/artist/${artist.id}`}
      className="group flex flex-col gap-3 p-3 rounded-md hover:bg-white/10 transition-colors duration-200 cursor-pointer w-full animate-fade-in"
    >
      <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-lg shrink-0 select-none">
        <Image
          src={artist.visuals?.avatarImage?.sources[0].url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png'}
          alt={artist.profile.name}
          width={200}
          height={200}
          className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-105"
          draggable={false}
        />
      </div>
      <span className="text-sm font-semibold text-white truncate text-center select-none">{artist.profile.name}</span>
    </Link>
  );
};