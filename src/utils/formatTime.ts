export const formatTime = (s: number): string => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);

  const mm = String(m).padStart(2, '0');
  const ss = String(sec).padStart(2, '0');

  return h > 0
    ? `${h}:${mm}:${ss}`
    : `${m}:${ss}`;
};