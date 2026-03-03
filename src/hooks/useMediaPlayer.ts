'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseMediaPlayerOptions {
  src: string | null;
  onEnded?: () => void;
  enableKeyboardShortcuts?: boolean;
  seekSeconds?: number;
  volumeStep?: number;
}

interface UseMediaPlayerReturn {
  mediaRef: React.RefObject<HTMLAudioElement | HTMLVideoElement | null>;
  progressRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>; 

  // Estado
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  hoverTime: number | null;
  hoverX: number;
  thumbX: number;
  progress: number;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;

  seekTo: (time: number) => void;
  seekForward: (seconds?: number) => void;
  seekBackward: (seconds?: number) => void;

  setVolume: (volume: number) => void;
  volumeUp: (step?: number) => void;
  volumeDown: (step?: number) => void;
  toggleMute: () => void;

  toggleFullscreen: () => void;

  handleProgressMouseDown: (e: React.MouseEvent) => void;
  handleProgressMouseMove: (e: React.MouseEvent) => void;
  handleProgressMouseLeave: () => void;
  handleProgressClick: (e: React.MouseEvent) => void;
  handleProgressKeyDown: (e: React.KeyboardEvent) => void;
}

export function useMediaPlayer({ src, onEnded, enableKeyboardShortcuts = true, seekSeconds = 5, volumeStep = 0.1 }: UseMediaPlayerOptions): UseMediaPlayerReturn {
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState(0);
  const [thumbX, setThumbX] = useState(0);

  // Inicializar o cambiar el src
  useEffect(() => {
    if (!src) return;

    const media = mediaRef.current;
    if (!media) return;

    media.pause();
    media.src = src;
    setCurrentTime(0);
    setDuration(0);

    const onLoadedMetadata = () => setDuration(media.duration);
    const onTimeUpdate = () => {
      if (!isDragging.current) setCurrentTime(media.currentTime);
    };
    const onEndedHandler = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    media.addEventListener('loadedmetadata', onLoadedMetadata);
    media.addEventListener('timeupdate', onTimeUpdate);
    media.addEventListener('ended', onEndedHandler);

    media.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);

    return () => {
      media.removeEventListener('loadedmetadata', onLoadedMetadata);
      media.removeEventListener('timeupdate', onTimeUpdate);
      media.removeEventListener('ended', onEndedHandler);
      media.pause();
      media.src = '';
    };
  }, [src]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    if (isPlaying) media.play().catch(() => {});
    else media.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (!progressRef.current || isDragging.current) return;
    const pct = duration ? currentTime / duration : 0;
    setThumbX(pct * progressRef.current.getBoundingClientRect().width);
  }, [currentTime, duration]);

  // Pantalla completa para más placer
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const getTimeFromClientX = useCallback(
    (clientX: number): number => {
      if (!progressRef.current) return 0;
      const rect = progressRef.current.getBoundingClientRect();
      const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      return pct * duration;
    },
    [duration],
  );

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  const seekTo = useCallback(
    (time: number) => {
      const media = mediaRef.current;
      if (!media) return;
      const clamped = Math.min(Math.max(time, 0), duration);
      media.currentTime = clamped;
      setCurrentTime(clamped);
      const pct = duration ? clamped / duration : 0;
      const width = progressRef.current?.getBoundingClientRect().width ?? 0;
      setThumbX(pct * width);
    },
    [duration],
  );

  const seekForward = useCallback(
    (seconds = seekSeconds) => seekTo(currentTime + seconds),
    [currentTime, seekTo, seekSeconds],
  );

  const seekBackward = useCallback(
    (seconds = seekSeconds) => seekTo(currentTime - seconds),
    [currentTime, seekTo, seekSeconds],
  );

  const setVolume = useCallback((value: number) => {
    const media = mediaRef.current;
    const clamped = Math.min(Math.max(value, 0), 1);
    setVolumeState(clamped);
    if (media) {
      media.volume = clamped;
      if (clamped > 0) {
        media.muted = false;
        setIsMuted(false);
      }
    }
  }, []);

  const volumeUp = useCallback(
    (step = volumeStep) => setVolume(volume + step),
    [volume, volumeStep, setVolume],
  );

  const volumeDown = useCallback(
    (step = volumeStep) => setVolume(volume - step),
    [volume, volumeStep, setVolume],
  );

  const toggleMute = useCallback(() => {
    const media = mediaRef.current;
    if (!media) return;
    const next = !isMuted;
    media.muted = next;
    setIsMuted(next);
  }, [isMuted]);

  const toggleFullscreen = useCallback(async () => {
    const target = containerRef.current ?? mediaRef.current;
    if (!target) return;
    if (!document.fullscreenElement) {
      await (target as HTMLElement).requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Atajos de tecaldo
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      switch (e.key) {
        case 'k':
        case 'K':
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekBackward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          volumeUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          volumeDown();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enableKeyboardShortcuts,togglePlay,seekForward,seekBackward,volumeUp,volumeDown,toggleFullscreen,toggleMute]);

  const handleProgressMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      const time = getTimeFromClientX(e.clientX);
      setCurrentTime(time);
      const rect = progressRef.current!.getBoundingClientRect();
      setThumbX(Math.min(Math.max(e.clientX - rect.left, 0), rect.width));

      const onMove = (ev: MouseEvent) => {
        const t = getTimeFromClientX(ev.clientX);
        setCurrentTime(t);
        const r = progressRef.current!.getBoundingClientRect();
        setThumbX(Math.min(Math.max(ev.clientX - r.left, 0), r.width));
      };

      const onUp = (ev: MouseEvent) => {
        isDragging.current = false;
        seekTo(getTimeFromClientX(ev.clientX));
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [getTimeFromClientX, seekTo],
  );

  const handleProgressMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!progressRef.current) return;
      const rect = progressRef.current.getBoundingClientRect();
      setHoverX(Math.min(Math.max(e.clientX - rect.left, 0), rect.width));
      setHoverTime(getTimeFromClientX(e.clientX));
    },
    [getTimeFromClientX],
  );

  const handleProgressMouseLeave = useCallback(() => setHoverTime(null), []);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent) => seekTo(getTimeFromClientX(e.clientX)),
    [getTimeFromClientX, seekTo],
  );

  const handleProgressKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        seekForward(3);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        seekBackward(3);
      }
    },
    [seekForward, seekBackward],
  );

  return { mediaRef, progressRef, containerRef, isPlaying, currentTime, duration, volume, isMuted, isFullscreen, hoverTime, hoverX, thumbX, progress: duration ? currentTime / duration : 0, play, pause, togglePlay, seekTo, seekForward, seekBackward, setVolume, volumeUp, volumeDown, toggleMute, toggleFullscreen, handleProgressMouseDown, handleProgressMouseMove, handleProgressMouseLeave, handleProgressClick, handleProgressKeyDown };
}