"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "./PostMediaSwiper.css";
import Image from "next/image";
import { MediaType } from "@/generated/prisma/enums";

interface Props {
  media: { url: string; type: MediaType; order: number }[];
  userName?: string;
  additionalClass?: string;
}

export const PostMediaSwiper = ({ media, userName, additionalClass }: Props) => {
  const swiperRef = useRef<SwiperType>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sortedMedia = [...media].sort((a, b) => a.order - b.order);

  return (
    <div className={`relative group ${additionalClass || ""}`}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        pagination={sortedMedia.length > 1 ? { clickable: true } : false}
        slidesPerView={1}
        className="swiper-post-card"
      >
        {sortedMedia.map((file, index) => (
          <SwiperSlide key={`${file.url}-${index}`}>
            {file.type === MediaType.IMAGE ? (
              <Image
                src={file.url}
                alt={userName ? `${userName} - imagen ${index + 1}` : `Imagen ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                priority={index === 0}
              />
            ) : (
              <video
                src={file.url}
                controls
                className="w-full h-full object-cover"
                preload="metadata"
              >
                Tu navegador no soporta el elemento video
              </video>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {sortedMedia.length > 1 && (
        <>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={currentIndex === 0}
            className="absolute left-1/50 top-1/2 -translate-y-1/2 z-10 
              bg-white text-gray-700 rounded-full p-1.5 shadow-md
              disabled:opacity-0 disabled:pointer-events-none
              hover:bg-gray-100 transition-all duration-200"
            aria-label="Anterior"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10.5 13L5.5 8l5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={currentIndex === sortedMedia.length - 1}
            className="absolute right-1/50 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-700 rounded-full p-1.5 shadow-md disabled:opacity-0 disabled:pointer-events-none hover:bg-gray-100 transition-all duration-200"
            aria-label="Siguiente"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5.5 13l5-5-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="absolute top-3 right-3 bg-quaternary/60 text-white text-xs font-medium px-3 py-1.5 rounded-full z-10">
            {currentIndex + 1} / {sortedMedia.length}
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {sortedMedia.map((_, index) => (
              <div
                key={index}
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-bright' 
                    : 'w-2 bg-secondary/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};