export const decodeHtmlEntities = (text: string): string => {
  if (typeof window === 'undefined') {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, ' ');
  }

  const doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.body.textContent ?? '';
};