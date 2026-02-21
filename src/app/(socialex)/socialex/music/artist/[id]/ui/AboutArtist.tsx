import { decodeHtmlEntities } from "@/lib/decodeHtmlEntities";
import Image from "next/image";

interface Props {
  artistName: string;
  artistAboutText: string;
  artistImage: string;
}

export const AboutArtist = ({ artistName, artistAboutText, artistImage }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Acerca de</h3>
      <div className="w-full relative">
        <Image
          src={artistImage}
          width={400}
          height={264}
          className="img-artist-about w-full h-auto object-cover object-center transform group-hover:scale-110 transition-transform duration-300 user-select-none"
          alt={artistName}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mt-auto max-h-3/5 overflow-y-auto">
            <p className="text-base font-normal leading-5 text-white p-4 sm:p-6 md:p-8">{decodeHtmlEntities(artistAboutText || '')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};