import { getSeasonByNumber } from "@/actions";
import { getEpisodesBySeason } from "@/actions";
import { EmptyData } from "@/components";
import { BtnBack } from "@/components/btn-back/BtnBack";
import { BackgroundSeason } from "@/components";
import { DetailsSeason } from "@/components";
import { SinopsisSeason } from "@/components/watch/season/SinopsisSeason";
import { EpisodesSeason } from "@/components/watch/season/EpisodesSeason";
import { CommentsSeason } from "@/components/watch/season/CommentsSeason";
import { connection } from "next/server";

interface Props {
  params: Promise<{ serieId: string; seasonId: string }>;
}

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg'

export const generateMetadata = async ({ params }: Props) => {
  await connection();
  const { serieId, seasonId } = await params;
  const seasonNumber = seasonId.split('-')[1];
  const resSeason = await getSeasonByNumber(serieId, +seasonNumber);
  if (!resSeason.ok || !resSeason.data) return null;
  const season = resSeason.data;

  return {
    title: `Ver ${season.title} | Socialex`,
    description: season.description,
    canonical: `https://next-socialex.vercel.app/socialex/watch/${serieId}/${seasonId}`,
    openGraph: {
      url: `https://next-socialex.vercel.app/socialex/watch/${serieId}/${seasonId}`,
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
  const { serieId, seasonId } = await params;

  const seasonNumber = seasonId.split('-')[1];

  const resSeason = await getSeasonByNumber(serieId, +seasonNumber);
  if (!resSeason.ok) return <EmptyData message="Error al obtener la temporada" />;
  const season = resSeason.data;
  if (!season) return <EmptyData message="Temporada no encontrada" />;

  const resEpisodes = await getEpisodesBySeason(serieId, +seasonNumber);
  if (!resEpisodes.ok || !resEpisodes.data) return <EmptyData message="Error al obtener episodios" />;

  const episodes = resEpisodes.data;

  return (
    <div className="w-full flex flex-col">
      <BackgroundSeason image={season?.coverImage || defaultImage} title={season?.title || ''} />
      <BtnBack additionalClass="my-2" />
      <div className="w-9/10 max-w-5xl mx-auto pb-6 flex flex-col gap-8 lg:flex-row lg:gap-4">
        <DetailsSeason coverImage={season.coverImage} title={season.title || ''} seasonNumber={+seasonNumber} serieId={serieId} />
        <div className="w-full flex flex-col gap-6 lg:grow">
          {season.description && <SinopsisSeason description={season.description} />}
          <EpisodesSeason episodes={episodes} serieId={serieId} seasonNumber={+seasonNumber} />
          <CommentsSeason seasonId={season.id} />
        </div>
      </div>
    </div>
  );
};

export default WatchSeasonPage;