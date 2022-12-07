import Box from "@mui/material/Box";
import { useRef } from "react";
import { formatTime } from "../../utils/formatTime";
interface Props {
  currentTimeAudio: number;
  duration: number;
  percentValue: number;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  setCurrentPercent: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTimeAudio: React.Dispatch<React.SetStateAction<number>>;
}
export default function Progress({
  currentTimeAudio,
  duration,
  percentValue,
  setCurrentPercent,
  setCurrentTimeAudio,
  audioRef,
}: Props) {
  const progressRef = useRef<HTMLInputElement | null>(null);
  return (
    <Box sx={{ width: "100%" }}>
      <div className="flex gap-2 items-center">
        <span className="text-white text-sm">
          {formatTime(currentTimeAudio)}
        </span>
        <input
          ref={progressRef}
          style={{
            height: "4px",
          }}
          className="w-[95%] cursor-pointer outline-none"
          id="progress"
          type="range"
          value={Math.ceil(percentValue ? percentValue : 0)}
          onChange={() => {
            if (progressRef.current) {
              if (audioRef.current) {
                let seekTime: number | undefined =
                  (Number(progressRef.current.value) * duration) / 100;
                audioRef.current.currentTime = seekTime;
              }
              setCurrentPercent(Number(progressRef.current.value));
            }
          }}
          step="1"
          min="0"
          max="100"
        />

        <span className="text-white text-sm">{formatTime(duration)}</span>
      </div>
    </Box>
  );
}
