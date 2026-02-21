export interface ArtistResponse {
  data: Data;
}

export interface Data {
  artist: Artist;
}

export interface Artist {
  id: string;
  uri: string;
  following: boolean;
  sharingInfo: SharingInfo;
  profile: Profile;
  visuals: ArtistVisuals;
  discography: Discography;
  stats: Stats;
  relatedContent: RelatedContent;
  goods: Goods;
}

export interface Discography {
  latest: Latest | null;
  popularReleases: Albums;
  singles: Albums;
  albums: Albums;
  compilations: Albums;
  topTracks: TopTracks;
}

export interface Albums {
  totalCount: number;
  items: AlbumsItem[];
}

export interface AlbumsItem {
  releases: Merch;
}

export interface Merch {
  items: MerchItem[];
}

export interface MerchItem {
  id: string;
  uri: string;
  name: string;
  type: LatestType;
  label: any;
  copyright: Copyright;
  date: PurpleDate;
  coverArt: CoverArt;
  tracks: Tracks;
  playability: Playability;
  sharingInfo: SharingInfo;
}

export interface Copyright {
  items: CopyrightItem[];
}

export interface CopyrightItem {
  type: PurpleType;
  text: string;
}

export enum PurpleType {
  C = 'C',
  P = 'P',
}

export interface CoverArt {
  sources: ItemSource[];
}

export interface ItemSource {
  url: string;
  width: number | null;
  height: number | null;
}

export interface PurpleDate {
  year: number;
  month: number;
  day: number;
  precision: Precision;
}

export enum Precision {
  Day = 'DAY',
}

export interface Playability {
  playable: boolean;
  reason: Reason;
}

export enum Reason {
  Playable = 'PLAYABLE',
}

export interface SharingInfo {
  shareId: string;
  shareUrl: string;
}

export interface Tracks {
  totalCount: number;
}

export enum LatestType {
  Album = 'ALBUM',
  Compilation = 'COMPILATION',
  Ep = 'EP',
  Single = 'SINGLE',
}

export interface Latest {
  id: string;
  uri: string;
  name: string;
  type: LatestType;
  copyright: Copyright;
  date: LatestDate;
  coverArt: CoverArt;
  tracks: Tracks;
  label: any;
  playability: Playability;
}

export interface LatestDate {
  year: number;
}

export interface TopTracks {
  items: TopTracksItem[];
}

export interface TopTracksItem {
  uid: string;
  track: Track;
}

export interface Track {
  id: string;
  uri: string;
  name: string;
  playcount: string;
  discNumber: number;
  duration: Duration;
  playability: Playability;
  contentRating: ContentRating;
  artists: TrackArtists;
  album: Album;
}

export interface Album {
  uri: string;
  coverArt: AlbumCoverArt;
}

export interface AlbumCoverArt {
  sources: PurpleSource[];
}

export interface PurpleSource {
  url: string;
}

export interface TrackArtists {
  items: PurpleItem[];
}

export interface PurpleItem {
  uri: string;
  profile: UserLocation;
}

export interface UserLocation {
  name: string;
}

export interface ContentRating {
  label: ContentRatingLabel;
}

export enum ContentRatingLabel {
  Explicit = 'EXPLICIT',
  None = 'NONE',
}

export interface Duration {
  totalMilliseconds: number;
}

export interface Goods {
  events: Events;
  merch: Merch;
}

export interface Events {
  userLocation: UserLocation;
  concerts: Concerts;
}

export interface Concerts {
  totalCount: number;
  items: ConcertsItem[];
  pagingInfo: PagingInfo;
}

export interface ConcertsItem {
  uri: string;
  id: string;
  title: string;
  category: string;
  festival: boolean;
  nearUser: boolean;
  venue: Venue;
  artists: PurpleArtists;
  partnerLinks: Merch;
  date: FluffyDate;
}

export interface PurpleArtists {
  items: RelatedArtistsItem[];
}

export interface RelatedArtistsItem {
  uri: string;
  id: string;
  profile: UserLocation;
  visuals?: ItemVisuals;
}

export interface ItemVisuals {
  avatarImage: CoverArt;
}

export interface FluffyDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  isoString: string;
  precision: string;
}

export interface Venue {
  name: string;
  location: UserLocation;
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PagingInfo {
  limit: number;
}

export interface Profile {
  name: string;
  verified: boolean;
  pinnedItem: PinnedItem | null;
  biography: Biography;
  externalLinks: ExternalLinks;
  playlists: Playlists;
}

export interface Biography {
  text: string;
}

export interface ExternalLinks {
  items: ExternalLinksItem[];
}

export interface ExternalLinksItem {
  name: string;
  url: string;
}

export interface PinnedItem {
  comment: string;
  type: LatestType;
  item: PinnedItemItem;
}

export interface PinnedItemItem {
  uri: string;
  name: string;
  coverArt: CoverArt;
  type: LatestType;
}

export interface Playlists {
  totalCount: number;
  items: PlaylistsItem[];
}

export interface PlaylistsItem {
  uri: string;
  name: string;
  description: string;
  owner: UserLocation;
  images: Gallery;
}

export interface Gallery {
  items: CoverArt[];
}

export interface RelatedContent {
  appearsOn: AppearsOn;
  featuring: DiscoveredOn;
  discoveredOn: DiscoveredOn;
  relatedArtists: RelatedArtists;
}

export interface AppearsOn {
  totalCount: number;
  items: AppearsOnItem[];
}

export interface AppearsOnItem {
  releases: Releases;
}

export interface Releases {
  totalCount: number;
  items: FluffyItem[];
}

export interface FluffyItem {
  uri: string;
  id: string;
  name: string;
  artists: TrackArtists;
  coverArt: CoverArt;
  date: LatestDate;
  sharingInfo: SharingInfo;
}

export interface DiscoveredOn {
  totalCount: number;
  items: DiscoveredOnItem[];
}

export interface DiscoveredOnItem {
  uri: string;
  id: string;
  owner: UserLocation;
  name: string;
  description: string;
  images: Images;
}

export interface Images {
  totalCount: number;
  items: CoverArt[];
}

export interface RelatedArtists {
  totalCount: number;
  items: RelatedArtistsItem[];
}

export interface Stats {
  followers: number;
  monthlyListeners: number;
  worldRank: number;
  topCities: TopCities;
}

export interface TopCities {
  items: TopCitiesItem[];
}

export interface TopCitiesItem {
  numberOfListeners: number;
  city: string;
  country: string;
  region: string;
}

export interface ArtistVisuals {
  gallery: Gallery;
  avatarImage: RImage;
  headerImage: RImage;
}

export interface RImage {
  sources: ItemSource[];
  extractedColors: ExtractedColors;
}

export interface ExtractedColors {
  colorRaw: ColorRaw;
}

export interface ColorRaw {
  hex: string;
}