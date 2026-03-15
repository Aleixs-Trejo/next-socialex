import { getSeasonByNumber } from "@/actions";
import { getEpisodesBySeason } from "@/actions";
import { EmptyData } from "@/components";
import { BtnBack } from "@/components/btn-back/BtnBack";
import { BackgroundContentWatch } from "@/components/watch/BackgroundContentWatch";
import { CommentsContentWatch } from "@/components/watch/CommentsContentWatch";
import { DetailsContentWatch } from "@/components/watch/DetailsContentWatch";
import { EpisodesSeason } from "@/components/watch/season/EpisodesSeason";
import { SinopsisContentWatch } from "@/components/watch/SinopsisContentWatch";
import { connection } from "next/server";

interface Props {
  params: Promise<{ serieId: string; seasonNumber: string }>;
}

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg'

export const generateMetadata = async ({ params }: Props) => {
  await connection();
  const { serieId, seasonNumber } = await params;
  const getseasonNumber = seasonNumber.split('-')[1];
  const resSeason = await getSeasonByNumber(serieId, +getseasonNumber);
  if (!resSeason.ok || !resSeason.data) return null;
  const season = resSeason.data;

  return {
    title: `Ver ${season.title} | Socialex`,
    description: season.description,
    canonical: `https://next-socialex.vercel.app/socialex/watch/${serieId}/${seasonNumber}`,
    openGraph: {
      url: `https://next-socialex.vercel.app/socialex/watch/${serieId}/${seasonNumber}`,
      title: `Ver ${season.title} | Socialex`,
      description: season.description,
      images: [
        {
          url: season.coverImage,
          width: 640,
          height: 515,
          alt: season.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${season.title} | Socialex`,
      description: season.description,
      images: [
        {
          url: season.coverImage,
          width: 640,
          height: 515,
          alt: season.title,
        }
      ]
    },
  };
};

const WatchSeasonPage = async ({ params }: Props) => {
  await connection();
  const { serieId, seasonNumber } = await params;

  const getseasonNumber = seasonNumber.split('-')[1];

  const resSeason = await getSeasonByNumber(serieId, +getseasonNumber);
  if (!resSeason.ok) return <EmptyData message="Error al obtener la temporada" />;
  const season = resSeason.data;
  if (!season) return <EmptyData message="Temporada no encontrada" />;

  const resEpisodes = await getEpisodesBySeason(serieId, +getseasonNumber);
  if (!resEpisodes.ok || !resEpisodes.data) return <EmptyData message="Error al obtener episodios" />;

  const episodes = resEpisodes.data;
  const seasonId = season.id;

  return (
    <div className="w-full flex flex-col">
      <BackgroundContentWatch image={season?.coverImage || defaultImage} title={season?.title || ''} />
      <BtnBack additionalClass="my-2" />
      <div className="w-9/10 max-w-5xl mx-auto pb-6 flex flex-col gap-8 lg:flex-row lg:gap-4">
        <DetailsContentWatch coverImage={season.coverImage} title={season.title || ''} context={{ seasonId }} contentId={seasonId} />
        <div className="w-full flex flex-col gap-6 lg:grow">
          {season.description && <SinopsisContentWatch description={season.description} />}
          <EpisodesSeason episodes={episodes} serieId={serieId} seasonNumber={+getseasonNumber} />
          <CommentsContentWatch context={{ seasonId }} />
        </div>
      </div>
    </div>
  );
};

export default WatchSeasonPage;