// ui/VideoPlayer.tsx
'use client';

import { useMediaPlayer } from "@/hooks/useMediaPlayer";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { MdForward5, MdReplay5 } from "react-icons/md";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { formatTime } from "@/utils/formatTime";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  title: string;
}

export const VideoPlayer = ({ src, title }: Props) => {
  const { containerRef, mediaRef, progressRef, isPlaying, currentTime, duration, volume, isMuted, isFullscreen, hoverTime, hoverX, thumbX, progress, togglePlay, seekForward, seekBackward, setVolume, toggleMute, toggleFullscreen, handleProgressMouseDown, handleProgressMouseMove, handleProgressMouseLeave, handleProgressClick, handleProgressKeyDown } = useMediaPlayer({ src, seekSeconds: 5, enableKeyboardShortcuts: true, });
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetHideTimer = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (isPlaying) hideTimer.current = setTimeout(() => setControlsVisible(false), 3000);
  }, [isPlaying]);

  // Mostra controles al pausrar
  useEffect(() => {
    if (!isPlaying) {
      setControlsVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    } else {
      resetHideTimer();
    }
  }, [isPlaying]);

  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  return (
    <div ref={containerRef} className={`relative min-w-80 w-full bg-black rounded-lg border border-primary overflow-hidden group/player select-none aspect-video ${controlsVisible ? 'cursor-pointer': 'cursor-none'}`} onMouseMove={resetHideTimer} onMouseLeave={() => isPlaying && setControlsVisible(false)}>

      <video ref={mediaRef as React.RefObject<HTMLVideoElement>} className="w-full h-full object-contain cursor-pointer" onClick={togglePlay} />

      {!isPlaying && (
        <button className="absolute inset-0 flex items-center justify-center cursor-pointer transform" onClick={togglePlay}>
          <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm border border-tertiary/20 transform -translate-y-1/3 transition-transform duration-200 hover:scale-110"><FaPlay size={12} className="text-bright" /></div>
        </button>
      )}

      {isPlaying && <button className="absolute inset-0 cursor-pointer opacity-0" onClick={togglePlay}/>}

      <div className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
        <div className="relative p-2 flex flex-col gap-2">
          <span className="text-white/70 text-xs font-medium px-1 truncate">{title}</span>

          <div ref={progressRef} role="slider" tabIndex={0} aria-label="Progreso de reproducción" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={currentTime} className="relative w-full h-1 cursor-pointer group/bar focus:outline-none" onMouseDown={handleProgressMouseDown} onMouseMove={handleProgressMouseMove} onMouseLeave={handleProgressMouseLeave} onClick={handleProgressClick} onKeyDown={handleProgressKeyDown}>
            <div className="absolute inset-0 h-full bg-gray-500/70 group-hover/bar:h-1.25 group-hover/bar:-top-0.5 transition-all duration-150 rounded-full" />
            <div className="absolute left-0 top-0 h-full bg-primary group-hover/bar:h-1.25 group-hover/bar:-top-0.5 transition-all duration-150 rounded-full" style={{ width: `${progress * 100}%` }} />

            <div className="absolute top-1/2 -translate-y-3/5 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg pointer-events-none opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150" style={{ left: thumbX }} />

            { hoverTime !== null && <div className="absolute -top-8 -translate-x-1/2 px-2 py-0.5 rounded text-xs text-white font-medium pointer-events-none select-none bg-black/70 border border-white/10" style={{ left: hoverX }}>{formatTime(hoverTime)}</div> }
          </div>

          {/* Controles */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <button onClick={() => seekBackward()} className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 cursor-pointer" aria-label="Retroceder 5 segundos"><MdReplay5 size={20} /></button>
              <button onClick={togglePlay} className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-150 cursor-pointer" aria-label={isPlaying ? "Pausar" : "Reproducir"}>{ isPlaying ? <IoMdPause size={18} /> : <FaPlay size={14} className="ml-0.5" /> }</button>
              <button onClick={() => seekForward()} className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 cursor-pointer" aria-label="Adelantar 5 segundos"><MdForward5 size={20} /></button>

              <span className="text-white/60 text-xs -tracking-tighter ml-1 hidden sm:block">
                {formatTime(currentTime)}
                <span className="text-white/30 mx-1">/</span>
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1.5 group/vol">
                <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300"><input type="range" min={0} max={1} step={0.01} value={isMuted ? 0 : volume} onChange={e => setVolume(Number(e.target.value))} className="w-20 h-1 accent-primary cursor-pointer align-middle" aria-label="Volumen" /></div>
                <button onClick={toggleMute} className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 cursor-pointer" aria-label={isMuted ? "Activar sonido" : "Silenciar"}>{ isMuted || volume === 0 ? <HiSpeakerXMark size={18} /> : <HiSpeakerWave size={18} /> }</button>
              </div>

              <button onClick={toggleFullscreen} className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 cursor-pointer" aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}> { isFullscreen ? <MdFullscreenExit size={20} /> : <MdFullscreen size={20} /> }</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};