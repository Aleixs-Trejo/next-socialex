import { ALL_CONTENT } from "@/config/watch-content";
import { notFound } from "next/navigation";
import { VideoPlayer } from "@/components";
import { BtnBack } from "@/components/btn-back/BtnBack";

interface Props {
  params: Promise<{ serieId: string; episodeId: number }>;
}

const WatchEpisodePage = async ({ params }: Props) => {
  const { serieId, episodeId } = await params;

  const serie = ALL_CONTENT.find((item) => item.id === serieId);
  if (!serie) notFound();

  const videoUrl = serie.caps.find((cap) => cap?.episodeNumber === +episodeId)?.episodeUrl;
  if (!videoUrl) notFound();

  const titleCap = serie.caps.find((cap) => cap?.episodeNumber === +episodeId)?.title;

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