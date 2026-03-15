import { getMovieBySlug } from "@/actions";
import { EmptyData } from "@/components";
import { Suspense } from "react";
import { WatchMovieVideo } from "./WatchMovieVideo";
import { CommentsContentWatch } from "../CommentsContentWatch";
import { BtnsReactionVideoPlayerWrapper } from "../BtnsReactionVideoPlayerWrapper";

interface Props {
  movieSlug: string;
}

export const WatchMovieContent = async ({ movieSlug }: Props) => {
  const resMovie = await getMovieBySlug(movieSlug);
  if (!resMovie.ok || !resMovie.data) return <EmptyData message="Error al obtener película" />;

  const movie = resMovie.data;

  return (
    <div className="w-9/10 max-w-5xl mx-auto flex flex-col gap-4 overflow-hidden">
      <Suspense fallback={<div className="h-64" />}>
        <WatchMovieVideo r2Key={movie.r2Key} movieTitle={movie.title} />
      </Suspense>
      <Suspense fallback={<div className="h-10" />}>
        <BtnsReactionVideoPlayerWrapper contentId={movie.id} contextField="movieId" />
      </Suspense>
      {movie.description && (
        <div className="p-5 w-full flex flex-col gap-4 rounded-md bg-bg-card">
          <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Sinopsis</span>
          <p className="text-gray-300 text-sm">{movie.description}</p>
        </div>
      )}
      <Suspense fallback={<div className="h-20" />}>
        <CommentsContentWatch context={{ movieId: movie.id }} />
      </Suspense>
    </div>
  );
};