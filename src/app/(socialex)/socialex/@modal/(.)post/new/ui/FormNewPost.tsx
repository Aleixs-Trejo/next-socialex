'use client';

import { useForm } from "@tanstack/react-form";
import { newPost } from "@/actions";
import { useRouter } from "next/navigation";

const MAX_IMAGE = 5 * 1024 * 1024;
const MAX_VIDEO = 20 * 1024 * 1024;

export const FormNewPost = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      content: '',
      media: [] as File[],
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      formData.append('content', value.content);
      value.media.forEach(file => formData.append('media', file));

      const result = await newPost(formData);
      if (result.ok) {
        router.back();
      }
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }} className="flex flex-col gap-4">
      <form.Field
        name="content"
        validators={{
          onChange: ({ value, fieldApi }) => {
            const media = fieldApi.form.getFieldValue('media');
            if (!value && media.length === 0) {
              return 'Debes agregar contenido entre texto, imágen o video!';
            }
          },
        }}
      >
        {field => (
          <>
            <textarea
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              placeholder="Cuéntame algo interesante"
              className={`input-field-text resize-none ${field.state.meta.errors.length ? 'input-field-text-error' : ''}`}
            />
            {field.state.meta.errors.map(err => (
              <p key={err} className="text-red-500 text-xs">
                {err}
              </p>
            ))}
          </>
        )}
      </form.Field>
      <form.Field
        name="media"
        validators={{
          onChange: ({ value }) => {
            let images = 0;
            let videos = 0;

            for (const file of value) {
              if (file.type.startsWith('image')) {
                images++;
                if (file.size > MAX_IMAGE) return 'Imagen muy pesada';
              }

              if (file.type.startsWith('video')) {
                videos++;
                if (file.size > MAX_VIDEO) return 'Video muy pesado';
              }
            }

            if (videos > 1) return 'Solo se permite un video';
          },
        }}
      >
        {field => (
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={e =>field.handleChange(Array.from(e.target.files || []))}
          />
        )}
      </form.Field>

      <button
        type="submit"
        disabled={!form.state.isValid}
        className="btn-primary"
      >
        Publicar
      </button>
    </form>
  );
};