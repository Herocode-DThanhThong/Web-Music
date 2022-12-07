import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getInfoSong,
  getSrcSong,
  playSong,
  selectAudio,
  setCurrentIdSong,
} from "../../redux/audioSlice";
import { CURRENT_SONG_ID } from "../../utils/types";
import SkeletonCT from "../SkeletonCT";
import Controls from "./Controls";
import SliderSong from "./SliderSong";
import SettingSong from "./SettingSong";

interface Props {
  setAudioApp: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
}

const BarSong = ({ setAudioApp }: Props) => {
  // Redux
  const dispatch = useAppDispatch();
  const {
    url,
    loading,
    infoSong,
    isPlay,
    currentIdSong,
    dataSongIds,
    repeatSong,
    randomSong,
  } = useAppSelector(selectAudio);

  // Handle Logic play,pause,next,prev,random,ended
  const nextSong: () => void = () => {
    const index = dataSongIds.findIndex((id) => id === currentIdSong);
    if (index !== -1) {
      let nextIndexSong: number;
      let nextIdSong: string;
      // Random song
      if (randomSong) {
        nextIndexSong = Math.ceil(Math.random() * dataSongIds.length);
      } else {
        nextIndexSong = index === dataSongIds.length - 1 ? 0 : index + 1;
      }
      nextIdSong = dataSongIds[nextIndexSong];
      // Save current ID to local store
      localStorage.setItem(CURRENT_SONG_ID, JSON.stringify(nextIdSong));
      // Save current id song to redux

      dispatch(setCurrentIdSong(nextIdSong));

      // Get info song
      dispatch(getInfoSong(nextIdSong));

      // Get src Song
      dispatch(getSrcSong(nextIdSong));

      // Play song
      dispatch(playSong());
    }
  };
  const prevSong: () => void = () => {
    const index = dataSongIds.findIndex((id: string) => id === currentIdSong);
    if (index !== -1) {
      let prevIndexSong: number;
      let prevIdSong: string;
      // Random song and no repeat
      if (randomSong) {
        prevIndexSong = Math.ceil(Math.random() * dataSongIds.length);
      } else {
        prevIndexSong = index === 0 ? dataSongIds.length - 1 : index - 1;
      }
      prevIdSong = dataSongIds[prevIndexSong];
      // Save current ID to local store
      localStorage.setItem(CURRENT_SONG_ID, JSON.stringify(prevIdSong));
      // Save current id song to redux

      dispatch(setCurrentIdSong(prevIdSong));

      // Get info song
      dispatch(getInfoSong(prevIdSong));

      // Get src Song
      dispatch(getSrcSong(prevIdSong));

      // Play song
      dispatch(playSong());
    }
  };

  // Handle volumn change
  const [volumnValue, setVolumnValue] = useState(100);

  // Get previous song from localStorage
  useEffect(() => {
    let idSong: string | null = localStorage.getItem(CURRENT_SONG_ID);
    if (idSong) {
      idSong = JSON.parse(idSong);
      dispatch(getInfoSong(idSong as string));
      dispatch(setCurrentIdSong(idSong as string));
    }
  }, [dispatch]);

  return localStorage.getItem(CURRENT_SONG_ID) ? (
    <div className="fixed bottom-0 h-[100px] flex flex-col justify-center  left-0 right-0 z-20 px-8 py-4 glassmorphism-barsong">
      <div className="flex justify-between items-center">
        {/* Info Song */}
        <div className="flex gap-4 items-center">
          {loading ? (
            <SkeletonCT width="60px" height="60px" />
          ) : (
            <img
              src={infoSong.thumbnailM}
              alt=""
              className="w-[60px] h-[60px] rounded-sm"
            />
          )}

          <div className="">
            <h1 className="capitalize text-[18px] w-[200px] font-semibold text-white truncate">
              {loading ? (
                <Skeleton
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
                  variant="text"
                  animation="wave"
                />
              ) : (
                infoSong.title
              )}
            </h1>
            <span className="text-gray-300 text-[12px] capitalize truncate">
              {loading ? (
                <Skeleton
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
                  variant="text"
                  animation="wave"
                />
              ) : (
                infoSong.artistsNames
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {/* Control */}
          <Controls
            url={url}
            isPlay={isPlay}
            nextSong={nextSong}
            prevSong={prevSong}
            repeatSong={repeatSong}
            randomSong={randomSong}
          />

          {/* SlideSong */}
          <SliderSong
            url={url}
            isPlay={isPlay}
            duration={infoSong.duration}
            currentIdSong={currentIdSong}
            dataSongIds={dataSongIds}
            nextSong={nextSong}
            repeatSong={repeatSong}
            volumnValue={volumnValue}
            setAudioApp={setAudioApp}
          />
        </div>

        {/* Volumn + lyric */}
        <SettingSong
          volumnValue={volumnValue}
          setVolumnValue={setVolumnValue}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BarSong;
