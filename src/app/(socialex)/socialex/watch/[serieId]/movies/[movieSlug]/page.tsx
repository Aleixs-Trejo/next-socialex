import { connection } from "next/server";
import { getMovieBySlug } from "@/actions";
import { EmptyData } from "@/components";
import { BtnBack } from "@/components/btn-back/BtnBack";
import { WatchMovieContent } from "@/components/watch/movie/WatchMovieContent";

interface Props {
  params: Promise<{ movieSlug: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  await connection();
  const { movieSlug } = await params;
  const resMovie = await getMovieBySlug(movieSlug);
  if (!resMovie.ok || !resMovie.data) return <EmptyData message="Error al obtener película" />;

  const movie = resMovie.data;
  const { slug, title, description, coverImage } = movie;

  return {
    title: `${title} | Socialex`,
    description: description,
    canonical: `https://next-socialex.vercel.app/socialex/watch/${movie.serieId}/movies/${movieSlug}`,
    openGraph: {
      url: `https://next-socialex.vercel.app/socialex/watch/${movie.serieId}/movies/${movieSlug}`,
      title: `${title} | Socialex`,
      description: description,
      images: [
        {
          url: coverImage,
          width: 671,
          height: 527,
          alt: slug,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Socialex`,
      description: description,
      images: [
        {
          url: coverImage,
          width: 671,
          height: 527,
          alt: slug,
        }
      ]
    },
  };
};

const MoviePage = async ({ params }: Props) => {
  await connection();
  const { movieSlug } = await params;

  return (
    <div className="w-full flex flex-col gap-2">
      <BtnBack additionalClass="m-2" />
      <WatchMovieContent movieSlug={movieSlug} />
    </div>
  );
};

export default MoviePage;