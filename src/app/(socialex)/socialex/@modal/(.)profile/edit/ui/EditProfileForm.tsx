"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@/lib/zod-validator";
import { editProfileSchema } from "@/schema/profile.schema";
import { updateUser } from "@/actions";
import { useRouter } from "next/navigation";
import { useCropper } from "@/hooks/useCropper";
import { IoCamera, IoCloudUploadOutline } from "react-icons/io5";
import Cropper from "react-easy-crop";
import Image from "next/image";

interface Props {
  defaultValues: {
    name: string;
    description: string;
    profession: string;
    birthdate: string;
    image: string;
  };
}

export const EditProfileForm = ({ defaultValues }: Props) => {
  const router = useRouter();

  const {
    fileInputRef,
    imageSrc,
    croppedImage,
    crop,
    zoom,
    isCropOpen,
    openFilePicker,
    onFileChange,
    onCropComplete,
    confirmCrop,
    cancelCrop,
    setCrop,
    setZoom,
  } = useCropper();

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const validationResult = editProfileSchema.safeParse({
        ...value,
        image: croppedImage || value.image,
      });

      if (!validationResult.success) {
        const error = validationResult.error.issues[0].message;
        return {
          ok: false,
          message: error,
          field: validationResult.error.issues[0].path[0],
        };
      }

      const result = await updateUser({
        name: value.name,
        description: value.description,
        profession: value.profession,
        birthdate: value.birthdate,
        image: croppedImage || value.image,
      });

      if (result.ok) {
        router.refresh();
        router.back();
      } else {
        alert(result.message);
      }
    },
  });

  const isSubmitting = form.state.isSubmitting;
  const displayImage = croppedImage || form.state.values.image;

  const handleConfirmCrop = async () => {
    const cropped = await confirmCrop();
    if (cropped) form.setFieldValue('image', cropped);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4 p-4"
    >

      {/* Avtar */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="min-w-12 w-[20dvw] max-w-32 mx-auto aspect-square rounded-full overflow-hidden bg-tertiary">
            <Image
              src={displayImage}
              alt="Foto de perfil"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={openFilePicker}
            className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-bright transition-colors"
            disabled={isSubmitting}
          >
            <IoCamera size={16} className="text-white" />
          </button>
        </div>
        <button
          type="button"
          onClick={openFilePicker}
          className="text-bright text-sm cursor-pointer flex items-center gap-2"
          disabled={isSubmitting}
        >
          <IoCloudUploadOutline size={16} />
          {croppedImage ? "Cambiar foto" : "Subir foto de perfil"}
        </button>
      </div>
      {/* Recorteeee */}
      {isCropOpen && imageSrc && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col w-9/10 max-w-96 mx-auto bg-accent-dark rounded-lg overflow-hidden">
            <div className="bg-white p-4 h-96 relative">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex h-full items-center justify-center gap-6 py-6">
              <button type="button" onClick={cancelCrop} className="btn-cancel">
                Cancelar
              </button>
              <button type="button" onClick={handleConfirmCrop} className="btn-primary">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nombre */}
      <form.Field
        name="name"
        validators={{
          onChange: zodValidator(editProfileSchema.shape.name),
        }}
      >
        {field => (
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="label-text">
              Nombre completo *
            </label>
            <input
              id="name"
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={`input-field-text ${
                field.state.meta.errors.length ? 'input-field-text-error' : ''
              }`}
              placeholder="Ej: Juan Pérez"
              disabled={isSubmitting}
            />
            {field.state.meta.errors.map((err) => (
              <p key={err} className="text-red-500 text-xs">
                {err}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      {/* Descripción */}
      <form.Field
        name="description"
        validators={{
          onChange: zodValidator(editProfileSchema.shape.description),
        }}
      >
        {field => (
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="label-text">
              Descripción
            </label>
            <textarea
              id="description"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={`input-field-text resize-none ${
                field.state.meta.errors.length ? 'input-field-text-error' : ''
              }`}
              placeholder="¿Qué haces de bueno por la vida?"
              maxLength={255}
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center">
              <div>
                {field.state.meta.errors.map((err) => (
                  <p key={err} className="text-red-500 text-xs">
                    {err}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </form.Field>

      {/* Profesión */}
      <form.Field
        name="profession"
        validators={{
          onChange: zodValidator(editProfileSchema.shape.profession),
        }}
      >
        {field => (
          <div className="flex flex-col gap-1">
            <label htmlFor="profession" className="label-text">
              Profesión
            </label>
            <input
              id="profession"
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={`input-field-text ${
                field.state.meta.errors.length ? 'input-field-text-error' : ''
              }`}
              placeholder="Ej: Odontólogo de gallos de pelea"
              disabled={isSubmitting}
            />
            {field.state.meta.errors.map((err) => (
              <p key={err} className="text-red-500 text-xs">
                {err}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      {/* Fecha de nacimiento */}
      <form.Field
        name="birthdate"
        validators={{
          onChange: zodValidator(editProfileSchema.shape.birthdate),
        }}
      >
        {field => (
          <div className="flex flex-col gap-2">
            <label htmlFor="birthdate" className="label-text">
              Fecha de nacimiento *
            </label>
            <input
              id="birthdate"
              type="date"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={`input-field-text ${
                field.state.meta.errors.length ? 'input-field-text-error' : ''
              }`}
              disabled={isSubmitting}
            />
            {field.state.meta.errors.map((err) => (
              <p key={err} className="text-red-500 text-xs">
                {err}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      {/* Botones */}
      <div className="flex gap-4 justify-end pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 text-white hover:bg-quaternary rounded-4xl transition-colors text-sm cursor-pointer"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!form.state.isValid || isSubmitting}
          className={isSubmitting ? 'btn-disabled' : 'btn-primary'}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};
