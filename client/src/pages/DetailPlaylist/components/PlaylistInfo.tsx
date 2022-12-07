import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button, Skeleton } from "@mui/material";
import { memo } from "react";
import { useAppDispatch } from "../../../app/hooks";
import SkeletonCT from "../../../components/SkeletonCT";
import {
  getInfoSong,
  getSrcSong,
  playSong,
  setCurrentIdSong,
} from "../../../redux/audioSlice";
import { CURRENT_SONG_ID } from "../../../utils/types";
interface Props {
  title: string;
  like: number;
  thumbnail: string;
  desc: string;
  totalSong: number;
  aliasTitle: string;
  loading: boolean;
  dataSongIds: string[];
}

const PlaylistInfo = ({
  title,
  like,
  thumbnail,
  desc,
  totalSong,
  aliasTitle,
  loading,
  dataSongIds,
}: Props) => {
  const dispatch = useAppDispatch();
  const handlePlaySongPlaylist = () => {
    const firstSongId = dataSongIds[0];
    // Save current ID to local store
    localStorage.setItem(CURRENT_SONG_ID, JSON.stringify(firstSongId));
    // Save current id song to redux

    dispatch(setCurrentIdSong(firstSongId));

    // Get info song
    dispatch(getInfoSong(firstSongId));

    // Get src Song
    dispatch(getSrcSong(firstSongId));

    // Play song
    dispatch(playSong());
  };
  return (
    <>
      <div className="flex gap-4 items-center mt-6">
        {/* Img */}
        <div className="relative z-[1] rounded-md ">
          {loading ? (
            <SkeletonCT width="350px" height="350px" />
          ) : (
            <>
              <img src={thumbnail} alt="" className="rounded-md" />
              <div
                className="absolute top-3 w-full h-full z-[-1] bg-cover blur-md scale-95 rounded-md"
                style={{
                  backgroundImage: `url(${thumbnail})`,
                }}
              ></div>
            </>
          )}
        </div>
        {/* Info */}
        <div className="">
          <h1 className="font-semibold text-white text-6xl capitalize mb-4">
            {loading ? <Skeleton width={"600px"} variant="text" /> : title}
          </h1>
          <p className="text-white mb-4 leading-6">
            {loading ? <Skeleton width={"600px"} variant="text" /> : desc}
          </p>
          <p className="text-white mb-4">
            {loading ? (
              <Skeleton width={"600px"} variant="text" />
            ) : (
              <>
                Tổng số bài hát: {totalSong} Songs ❤️ {like}
              </>
            )}
          </p>
          <p className="text-white mb-4">
            {loading ? <Skeleton width={"600px"} variant="text" /> : aliasTitle}
          </p>
          <Button
            onClick={handlePlaySongPlaylist}
            disabled={loading}
            variant="outlined"
            startIcon={<PlayArrowIcon />}
          >
            Play
          </Button>
        </div>
      </div>
    </>
  );
};

export default PlaylistInfo;
