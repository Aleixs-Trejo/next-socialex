import Cropper from "react-easy-crop";
import { useCropper } from "@/hooks/useCropper";
import { OnboardingFormApi } from "@/interfaces";
import { onboardingSchema } from "@/schema/onboarding.schema";
import { skipRegisterOnboarding } from "@/actions";

interface Props {
  form: OnboardingFormApi;
  token?: string;
}

export const ImageStep = ({ form, token }: Props) => {
  const field = form.getFieldValue("image");

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

  const handleConfirmCrop = async () => {
    await confirmCrop();
    if (field && croppedImage) form.setFieldValue("image", croppedImage);
  };

  const handleSubmit = (value: string) => {
    const result = onboardingSchema.shape.image.safeParse(value);

    if (!result.success) {
      return result.error.issues[0].message;
    }
  };

  const skipOboarding = async () => {
    await skipRegisterOnboarding(token || '');
  };

  return (
    <form.Field name="image" validators={{ onSubmit: ({ value }) => handleSubmit(value) }}>
      {field => {

        const handleConfirmCrop = async () => {
          const cropped = await confirmCrop();
          if (!cropped) return;

          field.setValue(cropped);
          console.log("field.value después de handleChange:", field.state.value);
        };

        return (
          <div className="flex flex-col gap-4">
            <input
              id="image"
              ref={fileInputRef}
              name="image"
              type="file"
              accept="image/*"
              hidden
              onChange={onFileChange}
            />
            <button type="button" onClick={openFilePicker} className="text-bright text-start text-sm cursor-pointer">
              {croppedImage ? "Cambiar foto" : "Subir una foto"}
            </button>
            {croppedImage && (
              <div className="w-full flex flex-col gap-2">
                <div className="w-9/10 max-w-96 mx-auto">
                  <img src={croppedImage} alt="Preview" className="w-full h-auto rounded-full object-cover" />
                </div>
                <span className="text-sm text-primary">¿No tenías algo mejor?</span>
              </div>
            )}
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
          </div>
        );
      }}
    </form.Field>
  );
};
