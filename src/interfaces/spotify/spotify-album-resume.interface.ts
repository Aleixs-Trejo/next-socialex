import { CoverArt, MerchItem } from "./spotify-artist.interface";

export type ReleaseType = 'ALBUM' | 'EP' | 'SINGLE';

export type DiscographyTab = 'popular' | 'albums' | 'singles';

export interface RawDiscography {
  albums: MerchItem[];
  popularReleases: MerchItem[];
  singles: MerchItem[];
  latest: Omit<MerchItem, 'sharingInfo'> | null;
}

export interface NormalizedRelease {
  id: string;
  name: string;
  type: ReleaseType;
  year: number;
  imageUrl: string;
  spotifyUrl: string;
  isLatest?: boolean;
}