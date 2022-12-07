import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import useLyric from "../../app/lyricHook";
import { LineSongLyric } from "../../models/lyric";
import { selectAudio } from "../../redux/audioSlice";

interface Props {
  audioApp: HTMLAudioElement | null;
  modalLyric: boolean;
}

const Lyric = ({ audioApp, modalLyric }: Props) => {
  // Redux
  const { currentIdSong } = useAppSelector(selectAudio);
  // State
  const [currentTimeAudio, setCurrentTimeAudio] = useState<number>(0);
  const timerIdRef = useRef<any>(null);
  // Custom hook
  const lyric = useLyric(currentIdSong);
  // Effect handle lyric
  useEffect(() => {
    if (audioApp && modalLyric) {
      timerIdRef.current = global.setInterval(() => {
        setCurrentTimeAudio(audioApp.currentTime);
      }, 300);
    } else {
      global.clearInterval(timerIdRef.current);
    }
  }, [audioApp, modalLyric]);

  const getActiveClassName: (x: number, y: number, index: number) => string = (
    sTime,
    eTime,
    index
  ) => {
    if (audioApp) {
      if (
        sTime <= currentTimeAudio * 1000 &&
        currentTimeAudio * 1000 <= eTime
      ) {
        const lineEl = document.querySelector(`.line-${index}`);
        lineEl?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return "glassmorphism";
      } else {
        return "";
      }
    }
    return "";
  };

  return (
    <div className="max-h-screen overflow-auto">
      {lyric.map((lineSong: LineSongLyric, index: number) => (
        <div
          key={index}
          className={`${getActiveClassName(
            lineSong.startTime,
            lineSong.endTime,
            index
          )} line-${index} text-3xl text-center text-white py-4 my-2 leading-10`}
        >
          {lineSong.data}
        </div>
      ))}
    </div>
  );
};

export default Lyric;
