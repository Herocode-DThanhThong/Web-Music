export interface PlayList {
  encodeId: string;
  title: string;
  thumbnail: string;
  sortDescription: string;
}

export interface Playlists {
  sectionType: string;
  title: string;
  sectionId: string;
  items: PlayList[];
}

export interface ReponseHomePage {
  items: Playlists[];
}
