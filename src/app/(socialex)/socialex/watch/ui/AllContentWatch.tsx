import { getAllLikesAndDislikes, getAllSeries } from "@/actions";
import { CardSerie } from "./CardSerie";
import { EmptyData } from "@/components";

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg'

export const AllContentWatch = async () => {
  const resSeries = await getAllSeries();
  if (!resSeries.ok || !resSeries.data) return <EmptyData message="Error al obtener series" />;

  const series = resSeries.data;

  const serieIds = series.map(s => s.id);
  const resReactions = await getAllLikesAndDislikes('serieId', serieIds);
  const reactionsMap = resReactions.ok ? resReactions.data ?? {} : {};

  const seriesMap = series.map(serie => {
    const { id, title, description, coverImage } = serie;

    const { likes = 0, dislikes = 0 } = reactionsMap[serie.id] ?? {};
    const serieImg = coverImage || defaultImage;

    return <CardSerie key={id} id={id} title={title} description={description} coverImage={serieImg} likes={likes} dislikes={dislikes} />;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {seriesMap}
    </div>
  );
};
