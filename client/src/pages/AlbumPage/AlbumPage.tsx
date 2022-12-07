import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardMedium from "../../components/Card/CardPlaylistCol";
import Navbar from "../../components/Navbar/Navbar";
import SkeletonCT from "../../components/SkeletonCT";
import { Album, AlbumDetail } from "../../models/albumPage";
import { getDataAlbumPage, selectAlbumPage } from "../../redux/albumPageSlice";

interface Props {}

const AlbumPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { albums, loading } = useAppSelector(selectAlbumPage);
  useEffect(() => {
    dispatch(getDataAlbumPage());
  }, [dispatch]);
  const renderAlbumList = () => {
    // Handle loading
    if (loading) {
      let jsx = [];
      for (let i = 0; i <= 5; i++) {
        jsx.push(<SkeletonCT width="100%" height="200px" key={i} />);
      }
      return <div className="grid p-4 grid-cols-3 gap-4">{jsx}</div>;
    }

    // Had data
    return albums.map((alb: Album, index: number) => {
      if (index > 0) {
        return (
          <div className="p-4" key={index}>
            <h1 className="font-bold text-white text-3xl mb-6 capitalize">
              {alb.title}
            </h1>
            <div className="grid grid-cols-5 gap-4">
              {alb.items?.map((albDetail: AlbumDetail) => (
                <CardMedium data={albDetail} key={albDetail.encodeId} />
              ))}
            </div>
          </div>
        );
      }
      return "";
    });
  };
  return (
    <div className="bg-main min-h-screen ml-[250px] pb-[100px]">
      {/* Navbar */}
      <Navbar />
      <div className="">{renderAlbumList()}</div>
    </div>
  );
};

export default AlbumPage;
