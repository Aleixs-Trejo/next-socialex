'use client';

import Image from 'next/image';
import type { NormalizedRelease } from '@/lib/spotify/mappers/album.mapper';
import Link from 'next/link';

interface DiscographyCardProps {
  release: NormalizedRelease;
}

const TYPE_LABEL: Record<string, string> = {
  ALBUM: 'Álbum',
  EP: 'EP',
  SINGLE: 'Sencillo',
  COMPILATION: 'Compilación',
};

export const DiscographyCard = ({ release }: DiscographyCardProps) => {
  return (
    <Link
      href={`/socialex/music/album/${release.id}`}
      className="group flex flex-col gap-3 p-3 rounded-md hover:bg-white/10 transition-colors duration-200 cursor-pointer w-full animate-fade-in"
    >
      <div className="relative w-full aspect-square rounded-md overflow-hidden shadow-lg shrink-0 select-none">
        <Image
          src={release.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/400px-Spotify_App_Logo.svg.png'}
          alt={release.name}
          width={200}
          height={200}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          draggable={false}
        />

        {release.isLatest && (
          <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-spotify text-black px-2 py-0.5 rounded-full">
            Nuevo
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-semibold text-white truncate">{release.name}</span>
        {release.isLatest && <span className="text-xs font-normal text-gray-300">Último lanzamiento</span>}
        <span className="text-xs text-gray-400">
          {release.year} • {TYPE_LABEL[release.type] ?? release.type}
        </span>
      </div>
    </Link>
  )
};