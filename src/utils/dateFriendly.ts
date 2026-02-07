export const postDate = (value?: string): string => {
  if (!value) return '';

  const date = new Date(value);
  const now = new Date();

  const postDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (postDay.getTime() === today.getTime()) {
    return `Hoy a las ${hours}:${minutes}`;
  }

  if (postDay.getTime() === yesterday.getTime()) {
    return `Ayer a las ${hours}:${minutes}`;
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return `El ${day} ${month} ${year} a las ${hours}:${minutes}`;
};
