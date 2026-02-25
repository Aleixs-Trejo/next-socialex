import { Artist } from "@/interfaces/spotify/spotify-album.interface";
import { formatAlbumType } from "@/utils/formatAlbumType";
import { formatMillisecondsInMinutesAndSeconds } from "@/utils/formatMillisecondsInMinutesAndSeconds";
import Image from "next/image";
import Link from "next/link";

interface Props {
  albumType : string;
  albumImage : string;
  albumName : string;
  artists : Artist[];
  tracksAlbum : number;
  albumYear : number;
  totalTimeTracksAlbum : number;
}

export const HeaderAlbum = ({ albumType, albumImage, albumName, artists, tracksAlbum, albumYear, totalTimeTracksAlbum }: Props) => {
  const artistsMap = artists.map(artist => <Link key={artist.id} href={`/socialex/music/artist/${artist.id}`} className="text-white font-semibold underline">{artist.name}</Link>);

  return (
    <div className="h-header-album w-full p-4 bg-bg-card">
      <div className="w-full flex items-center justify-center overflow-hidden">
        <div className="w-full flex flex-col md:flex-row gap-4 sm:gap-4 lg:gap-6">
          <div className="w-1/2 mx-auto md:mx-0 aspect-square max-w-58 shrink-0">
            <Image
              src={albumImage}
              width={120}
              height={120}
              className="w-full h-full object-cover object-center select-none"
              alt={albumName}
              draggable={false}
            />
          </div>
          <div className="flex flex-col md:w-0 md:grow md:justify-end">
            <span className="text-xs text-gray-300">{formatAlbumType(albumType)}</span>
            <h1 className="text-title-main font-semibold leading-20">{albumName}</h1>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <div className="flex items-center">
                {artistsMap}
              </div>
              <span>•</span>
              <span>{albumYear}</span>
              <span>•</span>
              <span>{tracksAlbum} canciones, {formatMillisecondsInMinutesAndSeconds(totalTimeTracksAlbum)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};