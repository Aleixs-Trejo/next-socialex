import { ALL_CONTENT } from "@/config/watch-content";
import { OverlayModal } from "@/components";
import { notFound } from "next/navigation";
import { VideoPlayer } from "@/components";

interface Props {
  params: Promise<{ serieId: string; episodeId: number }>;
}

const WatchEpisodeModal = async ({ params }: Props) => {
  const { serieId, episodeId } = await params;

  const serie = ALL_CONTENT.find((item) => item.id === serieId);
  if (!serie) notFound();

  const videoUrl = serie.caps.find((cap) => cap?.episodeNumber === +episodeId)?.episodeUrl;
  if (!videoUrl) notFound();

  const titleCap = serie.caps.find((cap) => cap?.episodeNumber === +episodeId)?.title;

  return (
    <OverlayModal additionalClass="max-w-7xl">
      <div className="flex flex-col gap-2">
        <p className="text-center text-white/70 text-sm pt-4 px-4">
          {serie.title}
        </p>
        <VideoPlayer src={videoUrl} title={`${serie.title} · ${titleCap}`} />
      </div>
    </OverlayModal>
  );
};

export default WatchEpisodeModal;