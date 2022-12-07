export interface SongPlayListPage {
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnailM: string;
  duration: number;
  streamingStatus: number;
}

export interface SongsDataType {
  items: SongPlayListPage[];
  total: number;
}

export interface SongsDetailPlaylistPage {
  encodeId: string;
  title: string;
  thumbnailM: string;
  song: SongsDataType;
  description: string;
  like: number;
  aliasTitle: string;
}
