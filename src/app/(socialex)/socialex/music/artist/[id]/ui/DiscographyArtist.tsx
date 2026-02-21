'use client';

import { useState } from 'react';
import { DiscographyCarousel } from './DiscographyCarousel';
import { MappedDiscography, normalizeDiscography } from '@/lib/spotify/mappers/album.mapper';
import { DiscographyTab } from '@/interfaces/spotify/spotify-album-resume.interface';

const TABS: { name: DiscographyTab; text: string }[] = [
  { name: 'popular', text: 'Lanzamientos populares' },
  { name: 'albums', text: 'Álbumes' },
  { name: 'singles', text: 'Sencillos y EP' },
];

interface DiscographyArtistProps {
  rawDiscography: MappedDiscography;
}

export const DiscographyArtist = ({ rawDiscography }: DiscographyArtistProps) => {
  const [activeTab, setActiveTab] = useState<DiscographyTab>('popular');

  const discography = normalizeDiscography(rawDiscography);

  return (
    <>
      <div className="flex flex-wrap gap-2 items-center">
        {TABS.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`rounded-full text-sm px-4 py-2 w-max transition-colors duration-300 cursor-pointer font-medium' ${activeTab === tab.name ? 'bg-white text-accent': 'bg-accent text-white hover:bg-dark-gray'}`}
          >
            {tab.text}
          </button>
        ))}
      </div>

      <DiscographyCarousel key={activeTab} releases={discography[activeTab]} />
    </>
  );
};