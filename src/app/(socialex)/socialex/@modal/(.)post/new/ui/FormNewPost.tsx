'use client';

import { useForm } from "@tanstack/react-form";
import { newPost } from "@/actions";
import { useRouter } from "next/navigation";
import { IoClose, IoImage, IoVideocam, IoCloudUpload } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";

const MAX_IMAGE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO = 20 * 1024 * 1024; // 20MB

export const FormNewPost = () => {
  const router = useRouter();
  const [previews, setPreviews] = useState<{url: string; type: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

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
      console.log('Form submit: ', result );
      if (!result.ok) {
        setErrorMessage(result.message);
        return;
      }
      previews.forEach(preview => URL.revokeObjectURL(preview.url));
      router.back();
    },
  });

  const isSubmitting = form.state.isSubmitting;

  const handleFileChange = (newFiles: File[], field: any) => {
    setErrorMessage(undefined);
    // Limpiamos prviwews
    const currentFiles = field.state.value;

    // Unir las weas
    const allFiles = [...currentFiles, ...newFiles];

    // Nuevas previewsss
    const newPreviews = newFiles.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));

    setPreviews([...previews, ...newPreviews]);
    field.handleChange(allFiles);
  };

  const removeFile = (idx: number, field: any) => {
    setErrorMessage(undefined);
    const currentFiles = field.state.value;
    const newFiles = currentFiles.filter((_: File, i: number) => i !== idx);

    URL.revokeObjectURL(previews[idx].url);

    const newPreviews = previews.filter((_, i) => i !== idx);
    setPreviews(newPreviews);
    field.handleChange(newFiles);
  };

  return (
    <form onSubmit={e => { e.preventDefault(); form.handleSubmit() }} className="flex flex-col gap-4 px-3">
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
              id="content"
              placeholder="Cuéntame algo interesante"
              className={`input-field-text mx-auto resize-none ${field.state.meta.errors.length ? 'input-field-text-error' : ''}`}
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
          <div className="flex flex-col gap-4">
            <label htmlFor="file" className={`group flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-primary rounded-lg transition-colors duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-bright hover:bg-secondary/40'}`}>
              <IoCloudUpload size={20} className="text-primary group-hover:animate-bounce" />
              <span className="text-sm text-white select-none">Agregar fotos o video</span>
              <input
                type="file"
                id="file"
                multiple
                accept="image/*,video/*"
                onChange={e => handleFileChange(Array.from(e.target.files || []), field)}
                className="hidden"
                disabled={isSubmitting}
              />
            </label>
            {field.state.meta.errors.map(err => (
              <p key={err} className="text-red-500 text-xs">{err}</p>
            ))}

            {/* Previews */}
            {previews.length > 0 && (
              <div className="w-full grow overflow-auto scroll-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {previews.map((preview, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden bg-tertiary/40">
                      {preview.type.startsWith('image') ? (
                        <Image
                          src={preview.url}
                          alt={`Preview ${idx + 1}`}
                          width={128}
                          height={128}
                          className="w-full h-auto object-contain"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <video src={preview.url} className="w-full-h-full object-contain" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <IoVideocam size={32} className="text-white" />
                          </div>
                        </div>
                      )}

                      {/* Eliminar */}
                      <button onClick={() => removeFile(idx, field)} type="button" className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500">
                        <IoClose size={16} />
                      </button>

                      {/* Tipo de archivo */}
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black rounded text-white text-xs flex items-center gap-2">
                        {preview.type.startsWith('image') ? (
                          <><IoImage className="w-3 h-3" /> Imagen</>
                        ) : (
                          <><IoVideocam className="w-3 h-3" /> Video</>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </form.Field>
      {errorMessage && (
        <p className="text-red-500 text-xs">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={!form.state.isValid}
        className={`${isSubmitting ? 'btn-disabled' : 'btn-primary'}`}
      >
        {isSubmitting ? 'Publicando...' : 'Publicar'}
      </button>
    </form>
  );
};