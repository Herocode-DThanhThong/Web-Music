import { PauseCircle } from "@mui/icons-material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ReplayIcon from "@mui/icons-material/Replay";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useAppDispatch } from "../../app/hooks";
import {
  getSrcSong,
  pauseSong,
  playSong,
  setRandomSong,
  setRepeatSong,
} from "../../redux/audioSlice";
import { CURRENT_SONG_ID } from "../../utils/types";

interface Props {
  isPlay: boolean;
  url: string;
  nextSong: () => void;
  prevSong: () => void;
  repeatSong: boolean;
  randomSong: boolean;
}

const Controls = ({
  isPlay,
  url,
  nextSong,
  prevSong,
  repeatSong,
  randomSong,
}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-4 mb-2">
      <Tooltip title="Repeat">
        <IconButton
          size="small"
          onClick={() => {
            dispatch(setRepeatSong());
          }}
        >
          <ReplayIcon
            style={{
              color: !repeatSong ? "grey" : "#2563eb",
              fontSize: "1.8rem",
            }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Previous" onClick={prevSong}>
        <IconButton size="small">
          <SkipPreviousIcon style={{ color: "grey", fontSize: "1.8rem" }} />
        </IconButton>
      </Tooltip>
      {!isPlay && (
        <Tooltip title="Play">
          <IconButton
            onClick={() => {
              if (url) {
                // When choose song
                dispatch(playSong());
              } else {
                // When load page and hasn't get url
                const id: string = localStorage.getItem(CURRENT_SONG_ID)
                  ? JSON.parse(localStorage.getItem(CURRENT_SONG_ID) as string)
                  : "";
                dispatch(getSrcSong(id));

                // Toggle icon
                dispatch(playSong());
              }
            }}
            size="small"
          >
            <PlayCircleIcon style={{ color: "#fff", fontSize: "2.5rem" }} />
          </IconButton>
        </Tooltip>
      )}
      {isPlay && (
        <Tooltip title="Pause">
          <IconButton
            size="small"
            onClick={() => {
              dispatch(pauseSong());
            }}
          >
            <PauseCircle style={{ color: "#fff", fontSize: "2.5rem" }} />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Next">
        <IconButton size="small" onClick={nextSong}>
          <SkipNextIcon style={{ color: "grey", fontSize: "1.8rem" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Random">
        <IconButton
          size="small"
          onClick={() => {
            dispatch(setRandomSong());
          }}
        >
          <SwapCallsIcon
            style={{
              color: !randomSong ? "grey" : "#2563eb",
              fontSize: "1.8rem",
            }}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Controls;
