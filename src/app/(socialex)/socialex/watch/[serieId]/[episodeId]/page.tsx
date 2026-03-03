import { ALL_CONTENT } from "@/config/watch-content";
import { notFound } from "next/navigation";
import { VideoPlayer } from "@/components";
import { BtnBack } from "@/components/btn-back/BtnBack";

interface Props {
  params: Promise<{ serieId: string; episodeId: number }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { serieId, episodeId } = await params;

  const serie = ALL_CONTENT.find((item) => item.id === serieId);
  if (!serie) notFound();

  const episode = serie.caps.find((cap) => cap?.episodeNumber === +episodeId);
  if (!episode) notFound();

  const titleCap = episode.title;

  return {
    title: `${serie.title} - ${titleCap} | Socialex`,
    description: episode.description,
    canonical: `https://next-socialex.vercel.app/socialex/watch/${serieId}/${episodeId}`,
    openGraph: {
      url: `https://next-socialex.vercel.app/socialex/watch/${serieId}/${episodeId}`,
      title:  `${serie.title} - ${titleCap} | Socialex`,
      description: episode.description,
      images: [
        {
          url: `/img/kon/prev-${episode.episodeNumber}cap.png`,
          width: 630,
          height: 630,
          alt: serie.title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title:  `${serie.title} - ${titleCap} | Socialex`,
      description: episode.description,
      images: [
        {
          url: `/img/kon/prev-${episode.episodeNumber}cap.png`,
          width: 630,
          height: 630,
          alt: serie.title,
        }
      ]
    },
  };
};

const WatchEpisodePage = async ({ params }: Props) => {
  const { serieId, episodeId } = await params;

  const serie = ALL_CONTENT.find((item) => item.id === serieId);
  if (!serie) notFound();

  const episode = serie.caps.find((cap) => cap?.episodeNumber === +episodeId);
  if (!episode) notFound();

  const videoUrl = episode.episodeUrl;

  const titleCap = episode.title;

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <BtnBack />
      <h1 className="text-white text-xl font-bold">
        {serie.title}
      </h1>
      <VideoPlayer src={videoUrl} title={`${serie.title} · ${titleCap}`} />
    </div>
  );
};

export default WatchEpisodePage;