import { useEffect, useRef, useState } from "react";
import useLyric from "../../app/lyricHook";
import Progress from "./Progress";

interface Props {
  isPlay: boolean;
  url: string;
  duration: number;
  currentIdSong: string;
  dataSongIds: string[];
  nextSong: () => void;
  repeatSong: boolean;
  volumnValue: number;
  setAudioApp: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
}

const SliderSong = ({
  isPlay,
  url,
  duration,
  currentIdSong,
  dataSongIds,
  nextSong,
  repeatSong,
  volumnValue,
  setAudioApp,
}: Props) => {
  // State
  const [currentTimeAudio, setCurrentTimeAudio] = useState<number>(0);
  const [currentPercent, setCurrentPercent] = useState<number>(0);
  // Ref El
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Effect
  useEffect(() => {
    if (audioRef.current) setAudioApp(audioRef.current);
    const audioEl = document.querySelector("audio");
    if (isPlay) audioEl?.play();
    else {
      audioEl?.pause();
    }
  }, [isPlay, url]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volumnValue / 100;
  }, [volumnValue]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-[500px]">
          <Progress
            audioRef={audioRef}
            setCurrentTimeAudio={setCurrentTimeAudio}
            setCurrentPercent={setCurrentPercent}
            percentValue={currentPercent}
            currentTimeAudio={currentTimeAudio}
            duration={duration}
          />
        </div>
        <audio
          loop={repeatSong}
          onEnded={() => {
            if (!repeatSong) {
              nextSong();
            }
          }}
          ref={audioRef}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTimeAudio(audioRef.current.currentTime);
              setCurrentPercent(
                Math.ceil((audioRef.current.currentTime / duration) * 100)
              );
            }
          }}
          className="audio-app hidden"
          src={url}
          autoPlay={true}
          onLoadedData={() => {
            if (audioRef.current) {
              audioRef.current.play();
            }
          }}
        />
      </div>
    </>
  );
};

export default SliderSong;
