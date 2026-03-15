import { EventSerie } from "@/interfaces";
import { EventCard } from "./EventCard";

interface Props {
  events: EventSerie[];
}

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg';

export const EventsSerie = ({ events }: Props) => {
  const eventsMap = events.map(event => {
    const { id, slug, title, description, coverImage, serieId } = event;
    return <EventCard key={id} slug={slug} title={title} description={description} coverImage={coverImage || defaultImage} serieId={serieId} />;
  });
  return (
    <div className="p-5 w-full flex flex-col gap-4 rounded-md bg-bg-card">
      <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Eventos</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {eventsMap}
      </div>
    </div>
  )
};