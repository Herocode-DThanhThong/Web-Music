export interface Artist {
  id: string;
  name: string;
  alias: string;
  playlistId: string;
  thumbnail: string;
}
export interface MVDetail {
  encodeId: string;
  title: string;
  alias: string;
  artistsNames: string;
  thumbnailM: string;
  streamingStatus: number;
  duration: string;
  artist: Artist;
}
export interface ListMV {
  items: MVDetail[];
  total: number;
}

export interface QualityVideo {
  mp4: {
    "360p"?: string;
    "480p"?: string;
    "720p"?: string;
  };
}

export interface Video {
  encodeId: string;
  title: string;
  artistsNames: string;
  artist: Artist;
  thumbnailM: string;
  thumbnail: string;
  streamingStatus: string;
  recommends: MVDetail[];
  streaming: QualityVideo;
}
