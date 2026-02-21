import { notFound } from "next/navigation";
import { getArtist } from "@/lib/spotify/get-artists";
import { BackgroundArtist } from "./ui/BackgroundArtist";
import { SocialsArtist } from "./ui/SocialsArtist";
import { PopularTracksArtist } from "./ui/PopularTracksArtist";
import { DiscographyArtist } from "./ui/DiscographyArtist";
import { mapArtistDiscography } from "@/lib/spotify/mappers/artist.mapper";
import { AboutArtist } from "./ui/AboutArtist";
import { RelatedArtists } from "./ui/RelatedArtists";
import { BtnBack } from "@/components/btn-back/BtnBack";

interface Props {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;
  const result = await getArtist(id);
  if (!result.ok) notFound();
  const artist = result.dataRes.data.artist;

  return {
    title: `${artist.profile.name} | Socialex Music`,
    description: artist.profile.biography.text,
    openGraph: {
      title: `${artist.profile.name} | Socialex Music`,
      description: artist.profile.biography.text,
      images: [artist.visuals.avatarImage.sources[0].url]
    }
  };
};

const ArtistPage = async ({ params }: Props) => {
  const { id } = await params;
  const artistRes = await getArtist(id);
  if (!artistRes.ok) notFound();

  const artist = artistRes.dataRes.data.artist;
  const artistBg = artist.visuals.avatarImage.sources[0].url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png';
  const artistColor = artist.visuals.avatarImage.extractedColors.colorRaw["hex"];
  const verified = artist.profile.verified;
  const artistName = artist.profile.name || 'Sin Nombre';
  const followers = artist.stats.followers;
  const monthlyListeners = artist.stats.monthlyListeners;
  const spotifyUrl = artist.sharingInfo.shareUrl;
  const artistLinks = artist.profile.externalLinks.items;
  const artistTracks = artist.discography.topTracks.items;
  const artistDiscography = mapArtistDiscography(artist.discography);
  const artistAboutText = artist.profile.biography.text;
  const artistImage = artist.visuals.gallery.items.length ? artist.visuals.gallery.items[0].sources[0].url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png';
  const artistsRelated = artist.relatedContent.relatedArtists.items;

  return (
    <div className="w-full flex flex-col">
      <BackgroundArtist artistBg={artistBg} artistColor={artistColor} artistName={artistName} followers={followers} monthlyListeners={monthlyListeners} verified={verified} />
      <BtnBack additionalClass="my-2" />
      <div className="w-9/10 max-w-3xl mx-auto flex flex-col gap-8 py-4">
        <SocialsArtist artistLinks={artistLinks} artistName={artistName} spotifyUrl={spotifyUrl} />
        <PopularTracksArtist artistTracks={artistTracks} />
      </div>
      <div className="w-9/10 max-w-3xl mx-auto flex flex-col gap-8 py-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-white">Discografía</h3>
          <DiscographyArtist rawDiscography={artistDiscography} />
        </div>
      </div>
      {artistAboutText && (
        <div className="w-9/10 max-w-3xl mx-auto flex flex-col gap-8 py-4">
          <AboutArtist artistAboutText={artistAboutText} artistImage={artistImage} artistName={artistName} />
        </div>
      )}
      {artist.relatedContent.relatedArtists && (
        <div className="w-9/10 max-w-3xl mx-auto flex flex-col gap-8 py-4">
          <RelatedArtists artistsRelated={artistsRelated} />
        </div>
      )}
    </div>
  );
};

export default ArtistPage;
