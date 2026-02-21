import { formatNumber } from "@/utils/formatNumber";
import { VscVerifiedFilled } from "react-icons/vsc";

interface Props {
  artistBg: string;
  artistColor: string;
  verified: boolean;
  artistName: string;
  followers: number;
  monthlyListeners: number;
}

export const BackgroundArtist = ({ artistBg, artistColor, verified, artistName, followers, monthlyListeners }: Props) => {
  return (
    <div
      className="h-[60dvh] w-full bg-cover bg-no-repeat flex bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent, rgba(41, 41, 41, 0.5) 50%, ${artistColor}), url(${artistBg})`,
      }}
    >
      <div className="w-full mt-auto p-4">
        <div className="w-9/10 mx-auto max-w-3xl flex flex-col overflow-hidden">
          {verified && (
            <div className="flex gap-2 items-center">
              <VscVerifiedFilled size={24} className="text-blue-400 shrink-0" />
              <span className="font-light">Artista Verificado</span>
            </div>
          )}
          <h1 className="text-title-main font-semibold leading-20">{artistName}</h1>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span>{formatNumber(followers)} seguidores</span>
            <span className="hidden sm:inline">|</span>
            <span>{formatNumber(monthlyListeners)} oyentes mensuales</span>
          </div>
        </div>
      </div>
    </div>
  )
};