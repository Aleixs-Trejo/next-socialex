"use client";

import { useTransition, useRef } from "react";
import { createCommentWatchContext } from "@/actions";
import { toast } from "sonner";

interface Props {
  serieId: string;
}

export const CommentFormSerie= ({ serieId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const content = ref.current?.value ?? "";
    if (content.trim().length === 0) toast.error("Agrega un comentario, no seas idiota");
    startTransition(async () => {
      const res = await createCommentWatchContext({ serieId }, content);
      if (res.ok && ref.current) {
        ref.current.value = "";
        toast.success('Comentario agregado');
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        ref={ref}
        placeholder="¿Qué opinas de esta obra de arte?"
        maxLength={500}
        className="w-full min-h-20 border border-primary text-white text-sm rounded-md p-3 resize-none outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className={`self-end px-4 py-1.5 text-xs bg-primary text-white rounded-md cursor-pointer hover:bg-primary/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isPending ? 'cursor-wait' : ''}`}
      >
        {isPending ? "Enviando..." : "Comentar"}
      </button>
    </div>
  );
};