import { BackgroundSerie, CommentsSerie, DetailsSerie, EmptyData, SeasonsSerie, SinopsisSerie } from "@/components";
import { BtnBack } from "@/components/btn-back/BtnBack";
import { getSerieById } from "@/actions";
import { connection } from "next/server";

interface Props {
  params: Promise<{ serieId: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  await connection();
  const { serieId } = await params;
  const resSerie = await getSerieById(serieId);

  if (!resSerie.ok || !resSerie.data) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><span className="text-gray-400">Error al obtener series</span></div>;
  const serie = resSerie.data;

  return {
    title: `Ver ${serie.title} | Socialex`,
    description: serie.description,
    canonical: `https://next-socialex.vercel.app/socialex/watch/${serieId}`,
    openGraph: {
      url: `https://next-socialex.vercel.app/socialex/watch/${serieId}`,
      title: `Ver ${serie.title} | Socialex`,
      description: serie.description,
      images: [
        {
          url: 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772764999/k-on-portada-2_pxp7uo.webp',
          width: 640,
          height: 515,
          alt: serie.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${serie.title} | Socialex`,
      description: serie.description,
      images: [
        {
          url: 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772764999/k-on-portada-2_pxp7uo.webp',
          width: 640,
          height: 515,
          alt: serie.title,
        }
      ]
    },
  };
};

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg';

const WatchSeriesPage = async ({ params }: Props) => {
  await connection();

  const { serieId } = await params;
  const resSerie = await getSerieById(serieId);

  if (!resSerie.ok || !resSerie.data) return <EmptyData message="Error al obtener series" />;
  const serie = resSerie.data;

  return (
    <div className="w-full flex flex-col">
      <BackgroundSerie image={serie.coverImage || defaultImage} title={serie.title} genre={serie.genre} />
      <BtnBack additionalClass="my-2" />
      <div className="w-9/10 max-w-5xl mx-auto pb-6 flex flex-col gap-8 lg:flex-row lg:gap-4">
        <DetailsSerie coverImage={serie.coverImage} title={serie.title} serieId={serieId} />
        <div className="w-full flex flex-col gap-6 lg:grow">
          {serie.description && <SinopsisSerie description={serie.description} />}
          <SeasonsSerie seasons={serie.seasons} />
          <CommentsSerie serieId={serieId} />
        </div>
      </div>
    </div>
  );
};

export default WatchSeriesPage;