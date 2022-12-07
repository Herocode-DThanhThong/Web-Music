import { Button, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Navbar from "../../components/Navbar/Navbar";
import TrackingDetailPlaylist from "../../components/TrackingDetailPlaylist";
import { SongInfo } from "../../models/Song";
import {
  getInfoSong,
  getSrcSong,
  playSong,
  selectAudio,
  setCurrentIdSong,
  setListIDAudio,
} from "../../redux/audioSlice";
import { getDataRankPage, selectRankPage } from "../../redux/rankPageSlice";
import { CURRENT_SONG_ID } from "../../utils/types";

interface Props {}

const RankPage = (props: Props) => {
  // Redux
  const dispatch = useAppDispatch();
  const { rankSongs, loading } = useAppSelector(selectRankPage);
  const { currentIdSong, dataSongIds } = useAppSelector(selectAudio);

  // Effects
  useEffect(() => {
    dispatch(getDataRankPage());
  }, [dispatch]);

  useEffect(() => {
    if (rankSongs.length > 0) {
      const dataIDs: string[] = [];
      for (let i = 0; i < rankSongs.length; i++) {
        if (rankSongs[i].streamingStatus === 1)
          dataIDs.push(rankSongs[i].encodeId);
      }
      dispatch(setListIDAudio(dataIDs));
    }
  }, [rankSongs.length]);

  // Handle click play rank page
  const handlePlaySongRanks = () => {
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
    <div className="bg-main min-h-screen ml-[250px] pb-[100px]">
      {/* Navbar */}
      <Navbar />
      {/* Info */}
      <div className="px-4">
        <h1 className="text-3xl mb-6 text-white"># Bảng xếp hạng</h1>

        <div className="flex gap-4 items-center ">
          <span className="text-white text-xl capitalize">Bài hát</span>
          <Button
            disabled={loading}
            onClick={handlePlaySongRanks}
            variant="outlined"
            color="primary"
          >
            Play
          </Button>
        </div>
      </div>
      {/* Tracking detail playlist */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress color="primary" />
          </div>
        ) : (
          rankSongs.map((s: SongInfo, i: number) => (
            <TrackingDetailPlaylist
              key={s.encodeId}
              id={s.encodeId}
              thumbnail={s.thumbnailM}
              title={s.title}
              artistName={s.artistsNames}
              duration={s.duration}
              number={i + 1}
              currentID={currentIdSong}
              vip={s.streamingStatus === 1 ? false : true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RankPage;
