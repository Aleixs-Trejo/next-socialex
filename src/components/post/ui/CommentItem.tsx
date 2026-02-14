// components/post/ui/CommentItem.tsx
'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { deleteComment, updateComment } from '@/actions';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdEdit, MdDelete } from 'react-icons/md';
import { dateFriendly } from '@/utils/dateFriendly';
import Link from 'next/link';
import { ImageCustom } from '@/components/image-custom/ImageCustom';

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface Props {
  comment: Comment;
  currentUserId?: string;
}

export const CommentItem = ({ comment, currentUserId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = currentUserId === comment.user.id;

  const form = useForm({
    defaultValues: {
      content: comment.content,
    },
    onSubmit: async ({ value }) => {
      const result = await updateComment(comment.id, value.content);

      if (result.ok) {
        setIsEditing(false);
      } else {
        console.error(result.message);
      }
    },
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteComment(comment.id);

    if (!result.ok) {
      console.error(result.message);
      setIsDeleting(false);
    }
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
                <Link href={`/socialex/user/${comment.user.id}`} className="font-semibold text-sm text-white">{comment.user.name}</Link>
                <span className="text-xs text-gray-400">{dateFriendly(new Date(comment.createdAt).toISOString())}</span>
              </div>
              {isEditing ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                  className="mt-2"
                >
                  <form.Field
                    name="content"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value.trim()) return 'No puedes dejar un comentario vacío, no seas idiota!';
                      }
                    }}
                  >
                    {field => (
                      <div>
                        <textarea
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="¿Qué piensas de esto?"
                        className={`input-field-text mx-auto resize-none field-sizing-content min-h-11.5 max-h-50 ${field.state.meta.errors.length ? 'input-field-text-error' : ''}`}
                        maxLength={500}
                      />
                      {field.state.meta.errors.map(err => (<p key={err} className="text-red-500 text-xs">{err}</p>))}
                      </div>
                    )}
                  </form.Field>
                  <div className="flex gap-2 mt-2">
                    <form.Subscribe
                      selector={(state) => [state.canSubmit, state.isSubmitting]}
                    >
                      {([canSubmit, isSubmitting]) => (
                        <button
                          type="submit"
                          disabled={!canSubmit || isSubmitting}
                          className="px-3 py-1 cursor-pointer bg-primary text-white rounded text-xs font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors duration-300"
                        >
                          {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </button>
                      )}
                    </form.Subscribe>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        form.reset();
                      }}
                      className="px-3 py-1 cursor-pointer text-white rounded text-xs font-medium hover:bg-tertiary/50 transition-colors duration-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-sm text-gray-200 mt-1 wrap-break-word">{comment.content}</p>
              )}
            </div>

            {isOwner && !isEditing && (
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
                        onClick={() => {
                          setIsEditing(true);
                          setShowMenu(false);
                        }}
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
            )}
          </div>
        </div>
      </div>
      {showModalDelete && (
        <div className="overlay-logout-btns fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowModalDelete(false)}>
          <div className="w-9/10 max-w-sm mx-auto bg-accent-dark px-4 py-8 rounded-4xl" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col gap-8">
              <h2 className="text-lg font-normal text-center">¿Seguro que quieres eliminar este comentario?</h2>
              <div className="flex items-center justify-center gap-x-4 gap-y-2 flex-wrap w-full">
                <button type="button" className="cursor-pointer px-6 py-2 text-sm bg-primary rounded-2xl transition-colors duration-300 hover:bg-secondary" onClick={handleDelete}>{isDeleting ? 'Eliminando...' : 'Elimina esa vaina'}</button>
                <button type="button" className="cursor-pointer px-2 py-1 text-sm text-gray-300 transition-colors duration-300 hover:text-white" onClick={() => setShowModalDelete(false)}>{isDeleting ? 'XD' : 'Cancelar'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};