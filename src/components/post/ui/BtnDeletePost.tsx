'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deletePost } from '@/actions';
import { CiTrash } from "react-icons/ci";

interface Props {
  postId: string;
}

export const BtnDeletePost = ({ postId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const handleDeletePost = async () => {
    try {
      setIsLoading(true);
      const result = await deletePost(postId);
      if (result.ok) {
        router.push('/socialex/feed');
      }
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button type="button" className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-700/50 cursor-pointer transition-colors duration-300" onClick={() => setShowModalConfirm(true)}>
        <CiTrash size={16} className="shrink-0" />
        <span className="text-sm text-gray-300 select-none">Eliminar</span>
      </button>
      {showModalConfirm && (
        <div className="overlay-logout-btns fixed inset-0 w-dvw h-dvh bg-black/80 flex items-center justify-center z-50" onClick={() => setShowModalConfirm(false)}>
          <div className="w-9/10 max-w-sm mx-auto bg-accent-dark px-4 py-8 rounded-4xl" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col gap-8">
              <h2 className="text-lg font-normal text-center">¿De verdad quieres eliminarlo? 😿</h2>
              <div className="flex items-center justify-center gap-x-4 gap-y-2 flex-wrap w-full">
                <button type="button" className="cursor-pointer px-2 py-1 text-sm text-gray-300 transition-colors duration-300 hover:text-white" onClick={() => setShowModalConfirm(false)}>No, bromita 😹</button>
                <button type="button" className="cursor-pointer px-6 py-2 text-sm bg-primary rounded-2xl transition-colors duration-300 hover:bg-secondary" onClick={handleDeletePost}>{isLoading ? 'Eliminando...' : '¡Sí! 😾'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};