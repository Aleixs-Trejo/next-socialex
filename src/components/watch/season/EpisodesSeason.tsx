import { EpisodeBasic } from "@/interfaces/watch/serie.interface";
import { EpisodeCard } from "./EpisodeCard";

interface Props {
  episodes: EpisodeBasic[];
  serieId: string;
  seasonNumber: number;
}

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg';

export const EpisodesSeason = ({ episodes, serieId, seasonNumber }: Props) => {
  return (
    <div className="p-5 w-full flex flex-col gap-4 rounded-md bg-bg-card">
      <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Episodios</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {episodes.map(ep => {
          if (!ep) return null;
          const route = `/socialex/watch/${serieId}/season-${seasonNumber}/${ep.episodeNumber}`;
          const epImg = ep.thumbnail || defaultImage;
          const epTitle = ep.title || '';
          const description = ep.description || '';
          const epNumber = ep.episodeNumber;
          const tag = ep.tags[0];

          return <EpisodeCard key={ep.id} route={route} epImg={epImg} epNumber={epNumber} epTitle={epTitle} description={description} tag={tag} />;
        })}
      </div>
    </div>
  )
};