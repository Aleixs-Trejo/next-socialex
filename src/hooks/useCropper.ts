import { useState, useRef } from "react";
import { getCroppedImg } from "@/utils/get-cropped-img";

export const useCropper = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);

  const openFilePicker = () => fileInputRef.current?.click(); // Abre el explotador

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsCropOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = (_: any, croppedPixels: any) => setCroppedAreaPixels(croppedPixels);

  const confirmCrop = async (): Promise<string | null> => {
    if (!imageSrc || !croppedAreaPixels) return null;
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(cropped);
    setIsCropOpen(false);
    return cropped;
  };

  const getCroppedFile = async (): Promise<File | null> => {
    if (!croppedImage) return null;
    const res = await fetch(croppedImage);
    const blob = await res.blob();
    const file = new File([blob], 'avatar.png', { type: blob.type });
    return file;
  };

  const cancelCrop = () => {
    setImageSrc(null);
    setIsCropOpen(false);
  };

  return {
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
    getCroppedFile,
  };
};
