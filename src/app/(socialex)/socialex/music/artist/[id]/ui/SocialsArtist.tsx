import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { ExternalLinksItem } from "@/interfaces/spotify/spotify-artist.interface";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";

const SOCIALS = [
  { name: 'FACEBOOK', icon: <FaFacebook size={24} className="text-white" />, label: 'Facebook' },
  { name: 'TWITTER', icon: <BsTwitterX size={24} className="text-white" />, label: 'X' },
  { name: 'INSTAGRAM', icon: <FaInstagram size={24} className="text-white" />, label: 'Instagram' },
];

interface Props {
  artistLinks: ExternalLinksItem[];
  artistName: string;
  spotifyUrl: string;
}

export const SocialsArtist = ({ artistLinks, artistName, spotifyUrl }: Props) => {
  const socialsAvailable = (socials: { name: string, icon: JSX.Element, label: string }[], linksData: ExternalLinksItem[]) => {
    return linksData.map(link => {
      const socialInfo = socials.find(s => s.name === link.name);
  
      return {
        name: link.name,
        label: socialInfo ? socialInfo.label : '',
        url: link.url,
        icon: socialInfo ? socialInfo.icon : null,
      };
    });
  };
  
  const socialsMap = socialsAvailable(SOCIALS, artistLinks).filter(social => social.icon).map(social => (
    <Link key={social.name} href={social.url} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1">
      {social.icon}
      <span className="text-xs">{social.label}</span>
    </Link>
  ));

  return (
    <div className="flex flex-col gap-4">
      <h3>Sigue a {artistName} en:</h3>
      <div className="flex items-center gap-4">
        <Link href={spotifyUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1">
          <Image src="/icons/spotify.svg" width={24} height={24} alt="Spotify" className="w-6 h-6 aspect-square" />
          <span className="text-xs">Spotify</span>
        </Link>
        {socialsMap}
      </div>
    </div>
  )
};