'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import { DiscographyCard } from './DiscographyCard';
import type { NormalizedRelease } from '@/lib/spotify/mappers/album.mapper';

interface DiscographyCarouselProps {
  releases: NormalizedRelease[];
}

export const DiscographyCarousel = ({ releases }: DiscographyCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!releases.length) {
    return <p className="text-sm text-gray-400 py-6">No hay lanzamientos disponibles.</p>;
  }

  return (
    <div className="relative group/carousel">
      <Swiper
        modules={[Navigation]}
        onSwiper={swiper => { swiperRef.current = swiper }}
        slidesPerView={1.2}
        spaceBetween={4}
        breakpoints={{
          480: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
        }}
      >
        {releases.map(release => (
          <SwiperSlide key={release.id}>
            <DiscographyCard release={release} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button onClick={() => swiperRef.current?.slidePrev()} aria-label="Anterior" className="absolute left-0 top-2/5 -translate-y-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-primary shadow-lg flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-secondary cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10.5 13L5.5 8l5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </button>
      <button onClick={() => swiperRef.current?.slideNext()} aria-label="Siguiente" className="absolute right-0 top-2/5 -translate-y-1/2 translate-x-1/2 z-10 w-8 h-8 rounded-full bg-primary shadow-lg flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-secondary cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5.5 13l5-5-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};