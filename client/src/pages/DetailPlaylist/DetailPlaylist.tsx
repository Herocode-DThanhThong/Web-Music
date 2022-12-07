import { CircularProgress } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Navbar from "../../components/Navbar/Navbar";
import { SongPlayListPage } from "../../models/detailPlaylistPage";
import { selectAudio, setListIDAudio } from "../../redux/audioSlice";
import {
  getDetailPlaylist,
  selectDetailPlaylistPage,
} from "../../redux/detailPlaylistSlice";
import { dataBgClass } from "../../utils/dataBg";
import PlaylistInfo from "./components/PlaylistInfo";
import TrackingDetailPlaylist from "../../components/TrackingDetailPlaylist";
interface DataColor {
  start: string;
  end: string;
}
interface Props {}

const DetailPlaylist = (props: Props) => {
  // Random color bg
  let dataColor = useMemo<DataColor>(() => {
    return dataBgClass[Math.floor(Math.random() * dataBgClass.length)];
  }, []);
  // Params
  const { id } = useParams();
  // Redux
  const dispatch = useAppDispatch();
  const { loading, detailPlaylist } = useAppSelector(selectDetailPlaylistPage);
  const { currentIdSong, dataSongIds } = useAppSelector(selectAudio);
  // Handle playlist change
  useEffect(() => {
    if (id) dispatch(getDetailPlaylist(id));
  }, [dispatch, id]);
  // Handle set data id songs on redux -> Purpose handle features: next,prev,audio ended
  useEffect(() => {
    if (detailPlaylist.song.total > 0) {
      let dataIDs: string[] = [];
      for (let i = 0; i < detailPlaylist.song.items.length; i++) {
        if (detailPlaylist.song.items[i].streamingStatus === 1)
          dataIDs.push(detailPlaylist.song.items[i].encodeId);
      }

      dispatch(setListIDAudio(dataIDs));
    }
  }, [dispatch, detailPlaylist.encodeId]);
  return (
    <div className="bg-main min-h-screen ml-[250px] pb-[100px]">
      {/* Navbar */}
      <Navbar />
      {/* Short Info playlsit */}
      <div
        className="mt-[-80px]"
        style={{
          backgroundImage: `linear-gradient(to bottom,${dataColor.start} , ${dataColor.end})`,
        }}
      >
        {/* Playlist Info */}
        <div className="p-4 pt-[80px]">
          <PlaylistInfo
            loading={loading}
            title={detailPlaylist.title}
            like={detailPlaylist.like}
            thumbnail={detailPlaylist.thumbnailM}
            desc={detailPlaylist.description}
            totalSong={detailPlaylist.song?.total}
            aliasTitle={detailPlaylist.aliasTitle}
            dataSongIds={dataSongIds}
          />
        </div>
      </div>
      {/* Tracking detail playlist */}
      <div className="p-4">
        <h1 className="text-3xl text-white">Bài hát</h1>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress color="primary" />
          </div>
        ) : (
          detailPlaylist.song.items.map((s: SongPlayListPage, i: number) => (
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

export default DetailPlaylist;
