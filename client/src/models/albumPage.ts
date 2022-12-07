export interface AlbumDetail {
  encodeId: string;
  title: string;
  thumbnail: string;
  sortDescription: string;
  thumbnailM: string;
}
export interface Album {
  sectionType: string;
  title: string;
  items: AlbumDetail[];
}
