'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createComment } from '@/actions';
import { ImageCustom } from '@/components/image-custom/ImageCustom';
import { UserBasic, UserWithCommentsPostsAndReactions } from '@/interfaces';
import { useForm } from '@tanstack/react-form';
import { IoSend } from "react-icons/io5";
import { toast } from 'sonner';

interface Props {
  postId: string;
  user: UserBasic | null;
}

export const InputComment = ({ postId, user}: Props) => {
  const form = useForm({
    defaultValues: {
      content: '',
    },
    onSubmit: async ({ value }) => {
      if (!value.content.trim()) return;
      const result = await createComment(postId, value.content);
      if (!result.ok) {
        toast.error(result.message || 'Ocurrió un error al crear el comentario');
        return;
      }

      toast.success('¡Comentario agregado!');
      form.reset();
    },
  });

  const isSubmitting = form.state.isSubmitting;

  if (!user) {
    return (
      <div className="w-full">
        <Link href="/socialex/auth/login" className="text-sm text-gray-400 text-center">Inicia sesión para comentar</Link>
      </div>
    )
  }

  return (
    <form onSubmit={e => { e.preventDefault(); form.handleSubmit(); }} className="w-full flex flex-col gap-2">
      <div className="flex gap-3">
        <div className="shrink-0">
          <ImageCustom
            src={user.image || 'user-profile-default.avif'}
            alt={user.name || 'Usuario'}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1 flex gap-2">
          <form.Field
            name="content"
            validators={{
              onChange: ({ value }) => {
                if (!value.trim()) return 'No puedes dejar un comentario vacío, no seas idiota!';
              }
            }}
          >
            {field => (
              <div className="flex-1">
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="¿Qué piensas de esto?"
                  className={`input-field-text mx-auto resize-none field-sizing-content min-h-11.5 max-h-50 ${field.state.meta.errors.length ? 'input-field-text-error' : ''}`}
                  disabled={isSubmitting}
                  maxLength={500}
                />
                {field.state.meta.errors.map(err => (<p key={err} className="text-red-500 text-xs">{err}</p>))}
              </div>
            )}
          </form.Field>
        </div>
        <button type="submit" disabled={isSubmitting} className='w-10 h-10 cursor-pointer flex items-center justify-center rounded-full hover:bg-primary transition-colors duration-300'><IoSend size={20} className={`${isSubmitting ? 'text-gray-500' : 'text-white'}`} /></button>
      </div>
    </form>
  );
};