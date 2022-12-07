import React, { memo, useEffect, useRef } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  getInfoSong,
  getSrcSong,
  playSong,
  setCurrentIdSong,
} from "../redux/audioSlice";
import { formatTime } from "../utils/formatTime";
import { CURRENT_SONG_ID } from "../utils/types";

interface Props {
  id: string;
  thumbnail: string;
  title: string;
  artistName: string;
  duration: number;
  number: number;
  currentID: string;
  vip: boolean;
}

const TrackingDetailPlaylist = ({
  id,
  thumbnail,
  title,
  artistName,
  duration,
  number,
  currentID,
  vip,
}: Props) => {
  const dispatch = useAppDispatch();
  const trackingActive = useRef<HTMLDivElement | null>(null);
  const handleClickPlay = () => {
    if (!vip) {
      // Save current ID to local store
      localStorage.setItem(CURRENT_SONG_ID, JSON.stringify(id));

      // Save current id song to redux
      dispatch(setCurrentIdSong(id));

      // Get info song
      dispatch(getInfoSong(id));

      // Get src song
      dispatch(getSrcSong(id));

      // Play song
      dispatch(playSong());
    }
  };

  useEffect(() => {
    if (trackingActive.current) {
      if (id === currentID) {
        trackingActive.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentID]);

  return (
    <div
      ref={trackingActive}
      onClick={handleClickPlay}
      style={{
        backgroundColor: id === currentID ? "rgba(255, 255, 255, 0.1)" : "",
      }}
      className={`p-2 flex justify-between items-center mt-4 hover:bg-gray-800 rounded-md cursor-pointer text-white`}
    >
      <div className="flex gap-4 p-1 items-center">
        <p className="text-gray-500 text-base">{number}</p>
        <img src={thumbnail} className="w-[50px] h-[50px]" alt="" />
        <div className="">
          <h1 className="font-semibold">{title}</h1>
          <p className="text-gray-400">{artistName}</p>
        </div>
      </div>

      <div className="">
        <p>
          {vip && (
            <span className="text-yellow-500 font-semibold mr-2">VIP</span>
          )}
          {formatTime(duration)}
        </p>
      </div>
    </div>
  );
};

export default memo(TrackingDetailPlaylist);
