'use client';

import { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdEdit, MdDelete } from 'react-icons/md';
import { deleteComment } from '@/actions';
import { OverlayConfirmAction } from '@/components';
import { toast } from 'sonner';

interface Props {
  commentId: string;
}

export const CommentActions = ({ commentId }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    setShowMenu(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteComment(commentId);
    setShowModalDelete(false);

    if (!result.ok) {
      toast.error(result.message || 'Ocurrió un error al eliminar el comentario');
      setIsDeleting(false);
      return;
    }
    
    toast.success('¡Comentario eliminado!');
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 hover:bg-tertiary rounded-full cursor-pointer transition-colors duration-300"
          disabled={isDeleting}
        >
          <HiDotsHorizontal className="w-4 h-4 text-gray-400" />
        </button>
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-6 -top-4 bg-tertiary rounded-lg shadow-lg overflow-hidden z-20 min-w-30">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-secondary flex items-center gap-2 transition-colors duration-300 cursor-pointer"
              >
                <MdEdit className="w-3.5 h-3.5" />
                Editar
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowModalDelete(true);
                }}
                disabled={isDeleting}
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-secondary flex items-center gap-2 disabled:opacity-50 transition-colors duration-300 cursor-pointer"
              >
                <MdDelete className="w-3.5 h-3.5" />
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </>
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
                {isDeleting ? 'Eliminando...' : 'Elimina esa vaina'}
              </button>
              <button
                type="button"
                className="cursor-pointer px-2 py-1 text-sm text-gray-300 transition-colors duration-300 hover:text-white"
                onClick={() => setShowModalDelete(false)}
              >
                {isDeleting ? 'XD' : 'Cancelar'}
              </button>
            </div>
          </div>
        </OverlayConfirmAction>
      )}
    </>
  );
};