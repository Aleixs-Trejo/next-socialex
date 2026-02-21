export const formatNumber = (num: number) => {
  if (!num || isNaN(num)) return "0";
  const suffixes = ["", "K", "M", "B", "T"];
  let suffixIdx = 0;

  while (num >= 1000 && suffixIdx < suffixes.length - 1) {
    num /= 1000;
    suffixIdx++;
  }

  const formattedValue = num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
  return `${formattedValue}${suffixes[suffixIdx]}`;
};