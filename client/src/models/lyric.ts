export interface Word {
  startTime: number;
  endTime: number;
  data: string;
}
export interface Words {
  words: Word[];
}
export interface Lyric {
  sentences: Words[];
}

export interface LineSongLyric {
  startTime: number;
  endTime: number;
  data: string;
}
