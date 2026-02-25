'use client';

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePlayerStore } from "@/stores";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { formatTime } from "@/utils/formatTime";

export const FooterPlayer = () => {
  const { track, isPlaying, setIsPlaying, clearTrack } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState(0);
  const [thumbX, setThumbX] = useState(0);

  // Render del player este 
  useEffect(() => {
    if (!track) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    const audio = new Audio(track.preview_url);
    audioRef.current = audio;
    setCurrentTime(0);
    setDuration(0);

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => {
      if (!isDragging.current) setCurrentTime(audio.currentTime);
    });
    audio.addEventListener("ended", () => setIsPlaying(false));

    audio.play().catch(() => setIsPlaying(false));

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [track]);

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying]);

  // Posición del thumb
  useEffect(() => {
    if (!progressRef.current || isDragging.current) return;
    const pct = duration ? currentTime / duration : 0;
    setThumbX(pct * progressRef.current.getBoundingClientRect().width);
  }, [currentTime, duration]);

  const getTimeFromEvent = useCallback((clientX: number): number => {
    if (!progressRef.current) return 0;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    return pct * duration;
  }, [duration]);

  const seekTo = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
    const perc = duration ? time / duration : 0; // % del track
    const wi = progressRef.current?.getBoundingClientRect().width ?? 0; // ancho del progreso
    setThumbX(perc * wi);
  };

  // Manejo de barra de tiempo
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    const time = getTimeFromEvent(e.clientX);
    setCurrentTime(time);
    const rect = progressRef.current!.getBoundingClientRect();
    setThumbX(e.clientX - rect.left);

    const onMove = (ev: MouseEvent) => {
      const t = getTimeFromEvent(ev.clientX);
      setCurrentTime(t);
      const r = progressRef.current!.getBoundingClientRect();
      const x = Math.min(Math.max(ev.clientX - r.left, 0), r.width);
      setThumbX(x);
    };

    const onUp = (ev: MouseEvent) => {
      isDragging.current = false;
      seekTo(getTimeFromEvent(ev.clientX));
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    setHoverX(x);
    setHoverTime(getTimeFromEvent(e.clientX));
  };
  const handleMouseLeave = () => setHoverTime(null);
  const handleBarClick = (e: React.MouseEvent) => {
    seekTo(getTimeFromEvent(e.clientX));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      seekTo(Math.min(currentTime + 3, duration));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      seekTo(Math.max(currentTime - 3, 0));
    }
  };
  const progress = duration ? currentTime / duration : 0;
  if (!track) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col border-t border-tertiary bg-black/80 backdrop-blur-md">
    {/* Barra de tiempo */}
    <div ref={progressRef} role="slider" tabIndex={0} aria-label="Progreso de reproducción" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={currentTime} className="relative w-full h-1 cursor-pointer group -mt-px focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={handleBarClick} onKeyDown={handleKeyDown}>
      <div className="absolute inset-0 h-full bg-white/10 group-hover:h-1.5 group-hover:-top-0.5 transition-all duration-150 rounded-full" />
      <div className="absolute left-0 top-0 h-full rounded-full group-hover:h-1.5 group-hover:-top-0.5 bg-spotify" style={{ width: `${progress * 100}%` }}/>
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-spotify shadow-lg pointer-events-none" style={{ left: thumbX }}/>
      { hoverTime !== null && <div className="absolute -top-8 -translate-x-1/2 px-2 py-0.5 rounded text-xs text-white font-medium pointer-events-none select-none bg-black/30 border" style={{ left: hoverX }}>{formatTime(hoverTime)}</div> }
    </div>
      {/* Player */}
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        {/* Info del track */}
        <div className="flex items-center gap-3 min-w-0 flex-1 select-none">
          <div className="relative shrink-0">
            <Image src={track.album.images[0].url} alt={track.name} width={44} height={44} className="rounded-md object-cover" draggable={false} />
            {isPlaying && (
              <div className="absolute inset-0 rounded-md flex items-end justify-center pb-1 gap-0.5 bg-black/30">
                {/* Me robé este SVG de un video de YouTube XD */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1db954" xmlns="http://www.w3.org/2000/svg">
                  <style>
                    {`
                      .equalizer-bar { 
                        animation: equalize 1s infinite; 
                        transform-origin: bottom; 
                      }
                      .bar1 { animation-delay: -0.2s; }
                      .bar2 { animation-delay: -0.5s; }
                      .bar3 { animation-delay: -0.8s; }
                      
                      @keyframes equalize {
                        0%, 100% { transform: scaleY(0.3); }
                        50% { transform: scaleY(1); }
                      }
                    `}
                  </style>
                  <rect className="equalizer-bar bar1" x="2" y="4" width="4" height="16" rx="1" />
                  <rect className="equalizer-bar bar2" x="10" y="4" width="4" height="16" rx="1" />
                  <rect className="equalizer-bar bar3" x="18" y="4" width="4" height="16" rx="1" />
                </svg>
              </div>
            )}
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="text-white text-sm font-medium truncate leading-tight">{track.name}</span>
            <span className="text-white/50 text-xs truncate leading-tight mt-0.5">{track.artists.map(artist => artist.name).join(', ')}</span>
          </div>
        </div>

        <span className="text-gray-400 text-xs shrink-0 hidden sm:flex -tracking-tighter items-center gap-1">{formatTime(currentTime)} / {formatTime(duration)}</span>

        {/* Controles */}
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setIsPlaying(!isPlaying)} className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 bg-spotify cursor-pointer" aria-label={isPlaying ? "Pausar" : "Reproducir"}>{ isPlaying ? <IoMdPause size={16} className="text-white" /> : <FaPlay size={12} className="text-white" /> }</button>
          <button onClick={() => { audioRef.current?.pause(); clearTrack(); }} className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-300 cursor-pointer" aria-label="Cerrar reproductor"><IoClose size={16} className="text-white/40" /></button>
        </div>
      </div>
    </div>
  );
};