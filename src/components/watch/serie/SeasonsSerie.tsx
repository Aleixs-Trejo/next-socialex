import { SeasonBasic } from "@/interfaces/watch/serie.interface";
import { SeasonCard } from "./SeasonCard";

interface Props {
  seasons: SeasonBasic[];
}

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg';

export const SeasonsSerie = ({ seasons }: Props) => {
  const seasonsMap = seasons.map(season => {
    if (!season) return null;
    const route = `/socialex/watch/${season.serieId}/seasons/season-${season.seasonNumber}`;
    const episode1Title = season.episodes[0].title;
    const imgSeason = season.episodes[0].thumbnail || defaultImage;
    const seasonTitle = season.title || '';
    const episodesNumber = season.episodes.length;
    const seasonNumber = season.seasonNumber;

    return <SeasonCard key={season.id} seasonNumber={seasonNumber} episodesNumber={episodesNumber} seasonTitle={seasonTitle} episode1Title={episode1Title} route={route} imgSeason={imgSeason} />;
  });
  
  return (
    <div className="p-5 w-full flex flex-col gap-4 rounded-md bg-bg-card">
      <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Todas las temporadas</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {seasonsMap}
      </div>
    </div>
  )
};