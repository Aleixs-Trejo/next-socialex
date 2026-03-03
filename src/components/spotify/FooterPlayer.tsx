'use client';

import Image from "next/image";
import { usePlayerStore } from "@/stores";
import { useMediaPlayer } from "@/hooks/useMediaPlayer";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdForward5, MdReplay5 } from "react-icons/md";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { formatTime } from "@/utils/formatTime";

export const FooterPlayer = () => {
  const { track, clearTrack } = usePlayerStore();

  const { mediaRef, progressRef, isPlaying, currentTime, duration, volume, isMuted, hoverTime, hoverX, thumbX, progress, togglePlay, seekForward, seekBackward, setVolume, toggleMute, handleProgressMouseDown, handleProgressMouseMove, handleProgressMouseLeave, handleProgressClick, handleProgressKeyDown } = useMediaPlayer({ src: track?.preview_url ?? null, onEnded: () => {}, seekSeconds: 5, });

  if (!track) return null;

  return (
    <>
      <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} />
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col border-t border-tertiary bg-black/80 backdrop-blur-md">
        {/* Barra de progreso */}
        <div ref={progressRef} role="slider" tabIndex={0} aria-label="Progreso de reproducción" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={currentTime} className="relative w-full h-1 cursor-pointer group -mt-px focus:outline-none focus-visible:ring-2 focus-visible:ring-spotify" onMouseDown={handleProgressMouseDown} onMouseMove={handleProgressMouseMove} onMouseLeave={handleProgressMouseLeave} onClick={handleProgressClick} onKeyDown={handleProgressKeyDown}>
          <div className="absolute inset-0 h-full bg-white/10 group-hover:h-1.5 group-hover:-top-0.5 transition-all duration-150 rounded-full" />
          <div className="absolute left-0 top-0 h-full rounded-full group-hover:h-1.5 group-hover:-top-0.5 bg-spotify" style={{ width: `${progress * 100}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-spotify shadow-lg pointer-events-none" style={{ left: thumbX }} />
          {hoverTime !== null && (<div className="absolute -top-8 -translate-x-1/2 px-2 py-0.5 rounded text-xs text-white font-medium pointer-events-none select-none bg-black/30 border" style={{ left: hoverX }}>{formatTime(hoverTime)}</div>)}
        </div>
  
        {/* Player */}
        <div className="flex items-center justify-between px-4 py-3 gap-4">
          {/* Info del track */}
          <div className="flex items-center gap-3 min-w-0 flex-1 select-none">
            <div className="relative shrink-0">
              <Image src={track.album.images[0].url} alt={track.name} width={44} height={44} className="rounded-md object-cover" draggable={false} />
              {isPlaying && (
                <div className="absolute inset-0 rounded-md flex items-end justify-center pb-1 gap-0.5 bg-black/30">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1db954" xmlns="http://www.w3.org/2000/svg">
                    <style>{`
                      .equalizer-bar { animation: equalize 1s infinite; transform-origin: bottom; }
                      .bar1 { animation-delay: -0.2s; }
                      .bar2 { animation-delay: -0.5s; }
                      .bar3 { animation-delay: -0.8s; }
                      @keyframes equalize {
                        0%, 100% { transform: scaleY(0.3); }
                        50% { transform: scaleY(1); }
                      }
                    `}</style>
                    <rect className="equalizer-bar bar1" x="2" y="4" width="4" height="16" rx="1" />
                    <rect className="equalizer-bar bar2" x="10" y="4" width="4" height="16" rx="1" />
                    <rect className="equalizer-bar bar3" x="18" y="4" width="4" height="16" rx="1" />
                  </svg>
                </div>
              )}
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-white text-sm font-medium truncate leading-tight">{track.name}</span>
              <span className="text-white/50 text-xs truncate leading-tight mt-0.5">
                {track.artists.map(a => a.name).join(', ')}
              </span>
            </div>
          </div>
          <span className="text-gray-400 text-xs shrink-0 hidden sm:flex -tracking-tighter items-center gap-1">{formatTime(currentTime)} / {formatTime(duration)}</span>

          {/* Controles */}
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => seekBackward()} className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer" aria-label="Retroceder 5 segundos"><MdReplay5 size={18} /></button>
            <button onClick={togglePlay} className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 bg-spotify cursor-pointer" aria-label={isPlaying ? "Pausar" : "Reproducir"}>{isPlaying ? <IoMdPause size={16} className="text-white" /> : <FaPlay size={12} className="text-white" />}</button>
            <button onClick={() => seekForward()} className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer" aria-label="Adelantar 5 segundos"><MdForward5 size={18} /></button>
          </div>

          {/* Volumen + cerrar */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={toggleMute} className="text-white/40 hover:text-white/80 transition-colors cursor-pointer" aria-label={isMuted ? "Activar sonido" : "Silenciar"}>{isMuted || volume === 0 ? <HiSpeakerXMark size={16} /> : <HiSpeakerWave size={16} />}</button>
              <input type="range" min={0} max={1} step={0.01} value={isMuted ? 0 : volume} onChange={e => setVolume(Number(e.target.value))} className="w-20 h-1 accent-spotify cursor-pointer" aria-label="Volumen" />
            </div>
            <button onClick={clearTrack} className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-300 cursor-pointer" aria-label="Cerrar reproductor"><IoClose size={16} className="text-white/40" /></button>
          </div>
        </div>
      </div>
    </>
  );
};