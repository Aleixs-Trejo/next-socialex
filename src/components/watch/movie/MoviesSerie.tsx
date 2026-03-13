import { Movie } from "@/interfaces/watch/serie.interface";
import { MovieCard } from "./MovieCard";

interface Props {
  movies: Movie[];
}

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg';

export const MoviesSerie = ({ movies }: Props) => {
  const moviesMap = movies.map(movie => {
    const { id, slug, title, description, coverImage, serieId } = movie;
    return <MovieCard key={id} slug={slug} title={title} description={description} coverImage={coverImage || defaultImage} serieId={serieId} />;
  });
  return (
    <div className="p-5 w-full flex flex-col gap-4 rounded-md bg-bg-card">
      <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Todas las películas</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {moviesMap}
      </div>
    </div>
  )
};