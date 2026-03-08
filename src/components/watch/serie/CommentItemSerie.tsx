"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { deleteCommentWatchContext, updateCommentWatchContext } from "@/actions";
import { CommentWatchBasic } from "@/interfaces";
import { OverlayConfirmAction } from "@/components";
import { toast } from 'sonner';
import Link from "next/link";
import { usePathname } from "next/navigation";

const defaultImage = 'https://res.cloudinary.com/dpap5lqxq/image/upload/v1772501361/socialex/profile-images/socialex/profile-images/user_gj0RnR9zstFGSN2009uFPyLnZwRS1m2A.jpg';

interface Props {
  comment: CommentWatchBasic;
  isOwner: boolean;
}

export const CommentItemSerie = ({ comment, isOwner }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const handleUpdate = () => {
    startTransition(async () => {
      const res = await updateCommentWatchContext(comment.id, editValue, pathname);
      if (res.ok) {
        setIsEditing(false);
        toast.success('Comentario actualizado');
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteCommentWatchContext(comment.id, pathname);
      toast.success('Comentario eliminado');
    });
  };

  return (
    <div className="flex gap-3">
      <Link href={`/socialex/user/${comment.user.id}`} className="shrink-0">
        <Image
          src={comment.user.image || defaultImage}
          alt={comment.user.name || "Usuario"}
          width={36} height={36}
          className="rounded-md object-cover w-9 h-9 shrink-0"
        />
      </Link>
      <div className="flex flex-col gap-1 w-full">
        <Link href={`/socialex/user/${comment.user.id}`} className="text-xs text-gray-300 transition-colors duration-300 hover:text-white hover:underline">{comment.user.name}</Link>
        {isEditing ? (
          <div className="flex flex-col gap-1">
            <textarea
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              maxLength={500}
              className="w-full bg-zinc-800 text-white text-sm rounded-md p-2 resize-none outline-none"
            />
            <div className="flex gap-4 self-end">
              <button onClick={() => setIsEditing(false)} className="text-xs text-gray-400 cursor-pointer transition-colors duration-300 hover:text-gray-200">Cancelar</button>
              <button onClick={handleUpdate} disabled={isPending} className="text-xs text-bright/70 disabled:opacity-50 cursor-pointer transition-colors duration-300 hover:text-bright">Guardar</button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-white select-none">{comment.content}</p>
        )}

        {isOwner && !isEditing && (
          <div className="flex gap-3 mt-1">
            <button onClick={() => setIsEditing(true)} className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors duration-300">Editar</button>
            <button onClick={() => setShowModalDelete(true)} disabled={isPending} className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 cursor-pointer transition-colors duration-300">Eliminar</button>
          </div>
        )}
      </div>
      {showModalDelete && (
        <OverlayConfirmAction onCancel={() => setShowModalDelete(false)}>
          <div className="flex flex-col gap-8">
            <h2 className="text-lg font-normal text-center">
              ¿Seguro que quieres eliminar este comentario?
            </h2>
            <div className="flex items-center justify-center gap-x-4 gap-y-2 flex-wrap w-full">
              <button
                type="button"
                className="cursor-pointer px-6 py-2 text-sm bg-primary rounded-2xl transition-colors duration-300 hover:bg-secondary"
                onClick={handleDelete}
              >
                {isPending ? 'Eliminando...' : 'Eliminar'}
              </button>
              <button
                type="button"
                className="cursor-pointer px-2 py-1 text-sm text-gray-300 transition-colors duration-300 hover:text-white"
                onClick={() => setShowModalDelete(false)}
              >
                {isPending ? 'XD' : 'Cancelar'}
              </button>
            </div>
          </div>
        </OverlayConfirmAction>
      )}
    </div>
  );
};