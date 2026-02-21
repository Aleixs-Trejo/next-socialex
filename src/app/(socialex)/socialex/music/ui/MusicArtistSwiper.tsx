"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import type { ArtistsRelatedSimplified } from "@/lib/spotify/mappers/artist.mapper";

interface Props {
  data: ArtistsRelatedSimplified;
  text: string;
}

export function MusicArtistsSwiper({ data, text }: Props) {
  const swiperRef = useRef<SwiperType>(null);

  const allArtists = [
    { artistName: data.artistName, artistUri: data.artistUri, avatarImage: data.avatarImage },
    ...data.artistsRelated,
  ];

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-lg text-start border-b border-primary select-none">{text}</h2>
      <div className="relative w-full group/carousel">
        <Swiper
          onSwiper={swiper => swiperRef.current = swiper}
          slidesPerView={1.2}
          breakpoints={{
            500: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
          }}
          >
            {allArtists.map((artist) => {
              const [_, type, id] = artist.artistUri.split(":");
              return (
                <SwiperSlide className="w-full pb-4">
                  <Link
                    key={artist.artistUri}
                    href={`/socialex/music/${type}/${id}`}
                    className="flex p-4 w-full rounded-lg group transition-colors duration-300 hover:bg-dark-gray"
                  >
                    <article className="w-full flex flex-col gap-2 overflow-hidden select-none">
                      <div className="w-full aspect-square overflow-hidden">
                        <Image
                          src={artist.avatarImage}
                          width={300}
                          height={300}
                          alt={artist.artistName}
                          className="w-full h-auto object-cover object-center transform group-hover:scale-110 transition-transform duration-300"
                          draggable={false}
                        />
                      </div>
                      <h4 className="text-center text-xs leading-4 select-none group-hover:underline">
                        {artist.artistName}
                      </h4>
                    </article>
                  </Link>
                </SwiperSlide>
              );
            })}
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
    </section>
  );
}