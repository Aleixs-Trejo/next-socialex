'use client';

import Link from 'next/link';
import { dateFriendly } from '@/utils/dateFriendly';
import { ImageCustom, OverlayConfirmAction } from '@/components';
import { Comment } from '@/interfaces';
import { useState, useTransition } from 'react';
import { deleteComment, updateComment } from '@/actions';
import { toast } from 'sonner';

interface Props {
  comment: Comment;
  currentUserId?: string;
  isOwner: boolean;
}

export const CommentItem = ({ comment, currentUserId, isOwner }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    startTransition(async () => {
      const res = await updateComment(comment.id, editValue);
      if (res.ok) {
        setIsEditing(false);
        toast.success('Comentario actualizado');
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteComment(comment.id);
      toast.success('Comentario eliminado');
    });
  };

  return (
    <div className="p-3 hover:bg-quaternary/30 transition-colors relative">
      <div className="flex gap-2">
        <Link href={`/socialex/user/${comment.user.id}`} className="shrink-0">
          <ImageCustom
            src={comment.user.image || '/default-avatar.png'}
            alt={comment.user.name || 'Usuario'}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Link href={`/socialex/user/${comment.user.id}`} className="font-semibold text-sm text-white">
                  {comment.user.name}
                </Link>
                <span className="text-xs text-gray-400">
                  {dateFriendly(new Date(comment.createdAt).toISOString())}
                </span>
                
              </div>
              {isEditing ? (
                <div className="flex flex-col gap-1">
                  <textarea
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    maxLength={500}
                    className="w-full border border-primary text-white text-sm rounded-md p-2 resize-none outline-none"
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
      </div>
    </div>
  );
};