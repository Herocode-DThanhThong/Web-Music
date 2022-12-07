import LyricsIcon from "@mui/icons-material/Lyrics";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { toggleModalLyric, touchModalLyric } from "../../redux/commonSlice";
interface Props {
  volumnValue: number;
  setVolumnValue: React.Dispatch<React.SetStateAction<number>>;
}

const SettingSong = ({ volumnValue, setVolumnValue }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-2 items-center">
      {/* Lyrics */}
      <div
        onClick={() => {
          dispatch(touchModalLyric());
          dispatch(toggleModalLyric());
          document.body.style.overflow = "hidden";
        }}
        className="hover:opacity-80 cursor-pointer"
      >
        <LyricsIcon style={{ color: "#fff" }} />
      </div>

      {/* Volumn */}
      <div className="">
        <VolumeUpIcon style={{ color: "#fff" }} />
      </div>
      <div className="w-[150px] pb-1">
        <input
          style={{
            height: "4px",
          }}
          className="w-[95%] cursor-pointer outline-none"
          id="progress"
          type="range"
          value={volumnValue}
          onChange={(e) => {
            setVolumnValue(Number(e.target.value));
          }}
          step="1"
          min="0"
          max="100"
        />
      </div>
    </div>
  );
};

export default SettingSong;
