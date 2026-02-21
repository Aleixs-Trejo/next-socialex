export interface AlbumResponse {
  albums: Album[];
}

export interface Album {
  album_type: string;
  total_tracks: number;
  is_playable: boolean;
  external_urls: ExternalUrls;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: Artist[];
  tracks: Tracks;
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  genres: any[];
  label: string;
  popularity: number;
}

export interface Artist {
  external_urls: ExternalUrls;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface ExternalIDS {
  upc: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Tracks {
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
  items: Item[];
}

export interface Item {
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  id: string;
  is_playable: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}