import type { MerchItem, Latest, LatestType } from '@/interfaces/spotify/spotify-artist.interface';

export type DiscographyTab = 'popular' | 'albums' | 'singles';

export interface NormalizedRelease {
  id: string;
  name: string;
  type: LatestType;
  year: number;
  imageUrl: string;
  spotifyUrl: string;
  isLatest: boolean;
}

export interface MappedDiscography {
  albums: MerchItem[];
  popularReleases: MerchItem[];
  singles: MerchItem[];
  latest: Latest | null;
}

const getImageUrl = (coverArt: MerchItem['coverArt'] | Latest['coverArt']): string => {
  const sources = coverArt?.sources ?? [];
  const sized = sources
    .filter(s => s.width !== null)
    .sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  return sized[0]?.url ?? sources[0]?.url ?? '';
};

const normalizeItem = (item: MerchItem, latestId: string | null): NormalizedRelease => ({
  id: item.id,
  name: item.name,
  type: item.type,
  year: item.date.year,
  imageUrl: getImageUrl(item.coverArt),
  spotifyUrl: item.sharingInfo?.shareUrl ?? `https://open.spotify.com/album/${item.id}`,
  isLatest: item.id === latestId,
});

export interface NormalizedDiscography {
  popular: NormalizedRelease[];
  albums: NormalizedRelease[];
  singles: NormalizedRelease[];
}

export const normalizeDiscography = (raw: MappedDiscography): NormalizedDiscography => {
  const latestId = raw.latest?.id ?? null;

  const sort = (list: NormalizedRelease[]) =>
    [...list].sort((a, b) => Number(b.isLatest) - Number(a.isLatest));

  return {
    popular: sort(raw.popularReleases.map(i => normalizeItem(i, latestId))),
    albums: sort(raw.albums.map(i => normalizeItem(i, latestId))),
    singles: sort(raw.singles.map(i => normalizeItem(i, latestId))),
  };
};