import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const ImageCustom = ({ src, alt, width, height, className }: Props) => {
  const newSrc = src?.startsWith('http') ? src : '/img/user-profile-default.avif';
  
  return (
    <Image
      src={newSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      draggable={false}
    />
  );
};