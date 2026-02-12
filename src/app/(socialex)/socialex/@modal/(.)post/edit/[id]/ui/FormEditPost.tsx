'use client';

import { useForm } from "@tanstack/react-form";
import { updatePost } from "@/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MediaType } from "@/generated/prisma/enums";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks';

interface Props {
  postId: string;
  content: string;
  defaultValues: {
    content: string;
  };
  media?: {
    id: string;
    url: string;
    type: MediaType;
  }[];
}

export const FormEditPost = ({ postId, content, defaultValues, media = [] }: Props) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [showMarkdown, setShowMarkdown] = useState(false);

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const result = await updatePost(postId, value.content);
      console.log('Form submit: ', result );
      if (!result.ok) {
        setErrorMessage(result.message);
        return;
      }
      router.back();
    },
  });

  const isSubmitting = form.state.isSubmitting;

  const mediaMap = media.map(media => (
    <li key={media.id} className="flex flex-col gap-2 border aspect-square border-tertiary rounded-lg hover:bg-tertiary/40">
      {media.type === 'IMAGE' && (
        <Image
          src={media.url}
          alt={media.id}
          width={128}
          height={128}
          className="w-full h-full object-contain"
        />
      )}
      {media.type === 'VIDEO' && (
        <video src={media.url} className="w-full h-full object-contain" />
      )}
    </li>
  ));

  return (
    <form onSubmit={e => { e.preventDefault(); form.handleSubmit(); }} className="flex flex-col gap-4 px-3">
      <form.Field
        name="content"
        validators={{
          onChange: ({ value }) => {
            if (!value && content.length === 0) {
              return 'Debes agregar contenido entre texto, imágen o video!';
            }
          }
        }}
      >
        {field => (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowMarkdown(false)} className={`px-3 py-1 text-xs rounded cursor-pointer transition-colors duration-300 ${!showMarkdown ? 'bg-primary text-white' : 'bg-secondary/40 text-gray-300'}`}>Editar</button>
              <button type="button" onClick={() => setShowMarkdown(true)} className={`px-3 py-1 text-xs rounded cursor-pointer transition-colors duration-300 ${showMarkdown ? 'bg-primary text-white' : 'bg-secondary/40 text-gray-300'}`}>Vista previa</button>
            </div>
            {!showMarkdown ? (
              <textarea
                value={field.state.value}
                onChange={e => { field.handleChange(e.target.value); setErrorMessage(undefined) }}
                id="content"
                placeholder="¿Quieres agregar algo más?"
                className={`input-field-text mx-auto resize-none min-h-35 field-sizing-content ${field.state.meta.errors.length ? 'input-field-text-error' : ''}`}
              />
            ) : (
              <div className="input-field-text mx-auto min-h-35 prose prose-invert max-w-none">
                {field.state.value ? (<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{field.state.value}</ReactMarkdown>) : (<span className="text-sm text-gray-400 italic">No hay nada oe</span>)}
              </div>
            )}
            {field.state.meta.errors.map(err => (<p key={err} className="text-red-500 text-xs">{err}</p>))}
          </div>
        )}
      </form.Field>
      {errorMessage && (
        <p className="text-red-500 text-xs">{errorMessage}</p>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {mediaMap}
      </ul>
      <button
        type="submit"
        disabled={!form.state.isValid}
        className={`${isSubmitting ? 'btn-disabled' : 'btn-primary'}`}
      >
        {isSubmitting ? 'Cargando...' : 'Actualizar'}
      </button>
    </form>
  )
};