'use client';

import { useState } from 'react';
import { updateComment } from '@/actions';
import { Comment } from '@/interfaces';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

interface Props {
  comment: Comment;
}

export const CommentContent = ({ comment }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    defaultValues: {
      content: comment.content,
    },
    onSubmit: async ({ value }) => {
      const result = await updateComment(comment.id, value.content);

      if (!result.ok) {
        toast.error(result.message || 'Ocurrió un error al actualizar el comentario');
        return;
      }
      
      toast.success('¡Comentario actualizado!');
      setIsEditing(false);
    },
  });


  if (!isEditing) {
    return <p className="text-sm text-gray-200 mt-1 wrap-break-word">{comment.content}</p>;
  }

  return (
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
            if (!value.trim()) return 'No puedes dejar un comentario vacío!';
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
            {field.state.meta.errors.map(err => (
              <p key={err} className="text-red-500 text-xs">{err}</p>
            ))}
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
  );
};