import { getEventBySlug } from "@/actions";
import { EmptyData } from "@/components";
import { BtnBack } from "@/components/btn-back/BtnBack";
import { WatchEventContent } from "@/components/watch/event/WatchEventContent";
import { connection } from "next/server";

interface Props {
  params: Promise<{ eventSlug: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  await connection();
  const { eventSlug } = await params;
  const resEvent = await getEventBySlug(eventSlug);
  if (!resEvent.ok || !resEvent.data) return <EmptyData message="Error al obtener evento" />;

  const event = resEvent.data;
  const { slug, title, description, coverImage } = event;

  return {
    title: `${title} | Socialex`,
    description: description,
    canonical: `https://next-socialex.vercel.app/socialex/watch/${event.serieId}/events/${eventSlug}`,
    openGraph: {
      url: `https://next-socialex.vercel.app/socialex/watch/${event.serieId}/events/${eventSlug}`,
      title: `${title} | Socialex`,
      description: description,
      images: [
        {
          url: coverImage,
          width: 500,
          height: 328,
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
          width: 500,
          height: 328,
          alt: slug,
        }
      ]
    },
  };
};

const EventPage = async ({ params }: Props) => {
  await connection();
  const { eventSlug } = await params;

  return (
    <div className="w-full flex flex-col gap-2">
      <BtnBack additionalClass="m-2" />
      <WatchEventContent eventSlug={eventSlug} />
    </div>
  );
};

export default EventPage;