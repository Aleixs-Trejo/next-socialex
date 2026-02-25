import { Copyright } from "@/interfaces/spotify/spotify-album.interface";

interface Props {
  copyrights: Copyright[];
  releaseDate: Date;
}

export const DateCopyrightAlbum = ({ copyrights, releaseDate }: Props) => {;
  const date = releaseDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  const copyrightMap = copyrights.map(copyright => <span key={copyright.text} className="text-[10px] leading-4 text-gray-400">{copyright.text}</span>);

  return (
    <div className="w-9/10 max-w-3xl mx-auto py-4">
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs">{date}</span>
        <div className="flex flex-col">{copyrightMap}</div>
      </div>
    </div>
  )
};