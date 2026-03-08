export const getAudienceMessage = (likes: number, dislikes: number): string => {
  const total = likes + dislikes;
  if (total === 0) return `Aún no tiene valoraciones`;

  const dominant = likes >= dislikes ? likes : dislikes;
  const label = likes >= dislikes ? 'Le gusta' : 'No le gusta';
  const percentage = Math.round((dominant / total) * 100);

  return `${label} al ${percentage}% de la audiencia`;
};