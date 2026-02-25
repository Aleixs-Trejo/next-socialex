import { getAlbum } from "@/lib/spotify/get-albums";
import { notFound } from "next/navigation";
import { HeaderAlbum } from "./ui/HeaderAlbum";
import { TracksAlbum } from "./ui/TracksAlbum";
import { DateCopyrightAlbum } from "./ui/DateCopyrightAlbum";
import { DiscographyArtistAlbum } from "./ui/DiscographyArtistAlbum";
import { getArtist } from "@/lib/spotify/get-artists";
import { BtnBack } from "@/components/btn-back/BtnBack";

interface Props {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;
  const result = await getAlbum(id);
  if (!result.ok) notFound();
  const album = result.dataRes.albums[0];
  const albumDate = album.release_date;
  const albumYear = new Date(albumDate).getFullYear();
  const artistsAlbum = album.artists.map(artist => artist.name).join(', ');
  const albumDescription = `${artistsAlbum} • ${albumYear} • ${album.total_tracks} canciones`;

  return {
    title: `Album: ${album.name} | Socialex Music`,
    description: albumDescription,
    canonical: `https://next-socialex.vercel.app/socialex/music/album/${id}`,
    openGraph: {
      url: `https://next-socialex.vercel.app/socialex/music/album/${id}`,
      title: `${album.name} | Socialex Music`,
      description: albumDescription,
      images: [
        {
          url: album.images[0].url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png',
          width: 630,
          height: 630,
          alt: album.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${album.name} | Socialex Music`,
      description: albumDescription,
      images: [
        {
          url: album.images[0].url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png',
          width: 630,
          height: 630,
          alt: album.name
        }
      ]
    },
  };
};

const AlbumPage = async ({ params }: Props) => {
  const { id } = await params;
  const result = await getAlbum(id);
  if (!result.ok) notFound();
  const album = result.dataRes.albums[0];
  const albumType = album.album_type;
  const albumImage = album.images[0].url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png';
  const albumName = album.name;
  const artists = album.artists;
  const tracksAlbum = album.total_tracks;
  const albumDate = album.release_date;
  const albumYear = new Date(albumDate).getFullYear();
  const totalTimeTracksAlbum = album.tracks.items.reduce((acc, curr) => acc + curr.duration_ms, 0);
  const tracks = album.tracks.items;
  const copyrights = album.copyrights;
  const releaseDate = new Date(album.release_date);
  const resArtist = await getArtist(artists[0].id);
  if (!resArtist.ok) notFound();
  const artist = resArtist.dataRes.data.artist;

  return (
    <div className="flex flex-col">
      <HeaderAlbum albumType={albumType} albumImage={albumImage} albumName={albumName} artists={artists} tracksAlbum={tracksAlbum} albumYear={albumYear} totalTimeTracksAlbum={totalTimeTracksAlbum} />
      <BtnBack additionalClass="my-2" />
      <TracksAlbum tracks={tracks} albumImage={albumImage} />
      <DateCopyrightAlbum copyrights={copyrights} releaseDate={releaseDate} />
      <DiscographyArtistAlbum artist={artist} />
    </div>
  )
}

export default AlbumPage;