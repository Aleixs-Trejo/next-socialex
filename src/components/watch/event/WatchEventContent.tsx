import { getEventBySlug } from "@/actions";
import { EmptyData } from "@/components/empty-data/EmptyData";
import { Suspense } from "react";
import { BtnsReactionVideoPlayerWrapper } from "../BtnsReactionVideoPlayerWrapper";
import { CommentsContentWatch } from "../CommentsContentWatch";
import { WatchEventVideo } from "./WatchEventVideo";

interface Props {
  eventSlug: string;
}

export const WatchEventContent = async ({ eventSlug }: Props) => {
  const resEvent = await getEventBySlug(eventSlug);
  if (!resEvent.ok || !resEvent.data) return <EmptyData message="Error al obtener evento" />;

  const event = resEvent.data;

  return (
    <div className="w-9/10 max-w-5xl mx-auto flex flex-col gap-4 overflow-hidden">
      <Suspense fallback={<div className="h-64" />}>
        <WatchEventVideo r2Key={event.r2Key} eventTitle={event.title} />
      </Suspense>
      <Suspense fallback={<div className="h-10" />}>
        <BtnsReactionVideoPlayerWrapper contentId={event.id} contextField="eventId" />
      </Suspense>
      {event.description && (
        <div className="p-5 w-full flex flex-col gap-4 rounded-md bg-bg-card">
          <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Sinopsis</span>
          <p className="text-gray-300 text-sm">{event.description}</p>
        </div>
      )}
      <Suspense fallback={<div className="h-20" />}>
        <CommentsContentWatch context={{ eventId: event.id }} />
      </Suspense>
    </div>
  );
};