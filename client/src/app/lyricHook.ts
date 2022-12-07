import { useEffect, useState } from "react";
import { LineSongLyric, Word, Words } from "../models/lyric";
import { getLyricApi } from "./../services/lyricApi";

const useLyric = (id: string) => {
  // State
  const [lyric, setLyric] = useState<LineSongLyric[]>([]);
  useEffect(() => {
    const getLyricSong = async () => {
      const customLyric: {
        startTime: number;
        endTime: number;
        data: string;
      }[] = [];
      const data: Words[] | undefined = await getLyricApi(id);
      if (data) {
        data.forEach((ws: Words, i: number) => {
          let lineLyric: string = "";
          let sTime: number = 0;
          let eTime: number = 0;
          ws.words.forEach((w: Word, x: number) => {
            if (x === 0) sTime = w.startTime;
            if (x === ws.words.length - 1) eTime = w.endTime;
            lineLyric += w.data + " ";
          });
          customLyric.push({
            startTime: sTime,
            endTime: eTime,
            data: lineLyric,
          });
        });
        setLyric(customLyric);
      }
    };
    getLyricSong();
  }, [id]);
  return lyric;
};

export default useLyric;
