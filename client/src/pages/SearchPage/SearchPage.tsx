import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Navbar from "../../components/Navbar/Navbar";
import TrackingDetailPlaylist from "../../components/TrackingDetailPlaylist";
import { SongInfo } from "../../models/Song";
import { selectAudio, setListIDAudio } from "../../redux/audioSlice";
import {
  getDataSearchPage,
  selectSearchPage,
} from "../../redux/searchPageSlice";
import queryString from "query-string";

interface Props {}

const SearchPage = (props: Props) => {
  // Redux
  const dispatch = useAppDispatch();
  const { songs, loading } = useAppSelector(selectSearchPage);
  const { currentIdSong } = useAppSelector(selectAudio);

  // Get params
  const { search } = useLocation();

  // Effects
  useEffect(() => {
    const { keyword } = queryString.parse(search);
    if (keyword) {
      dispatch(getDataSearchPage(keyword as string));
    }
  }, [dispatch, search]);

  return (
    <div className="bg-main min-h-screen ml-[250px] pb-[100px]">
      {/* Navbar */}
      <Navbar />
      <div className="px-8">
        <h1 className="text-2xl font-semibold text-white">Kết quả tìm kiếm</h1>
      </div>
      {/* Tracking detail playlist */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress color="primary" />
          </div>
        ) : songs.length > 0 ? (
          songs.map((s: SongInfo, i: number) => (
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
        ) : (
          <div className="">
            <h1 className="text-center text-2xl text-white font-semibold">
              Không có kết quả được tìm thấy
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
