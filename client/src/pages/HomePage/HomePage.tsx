import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Navbar from "../../components/Navbar/Navbar";
import SkeletonCT from "../../components/SkeletonCT";
import { PlayList } from "../../models/homepage";
import { getDataHomePage, selectHomePage } from "../../redux/homePageSlice";
import CardMedium from "../../components/Card/CardPlaylistCol";
import CardSimple from "../../components/Card/CardPlaylistRow";

interface Props {}

const HomePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { playlists, loading } = useAppSelector(selectHomePage);
  useEffect(() => {
    dispatch(getDataHomePage());
  }, [dispatch]);
  const renderTopData = () => {
    // Handle loading
    if (loading) {
      let jsx = [];
      for (let i = 0; i <= 5; i++) {
        jsx.push(<SkeletonCT width="100%" height="110px" key={i} />);
      }
      return <div className="grid p-4 grid-cols-3 gap-4">{jsx}</div>;
    }

    // Had data
    return (
      <div className="p-4">
        <h1 className="font-bold text-white text-3xl mb-6 capitalize">
          {playlists[0]?.title}
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {playlists[0]?.items?.map((pls: PlayList) => (
            <CardSimple data={pls} key={pls.encodeId} />
          ))}
        </div>
      </div>
    );
  };
  const renderRemainData = () => {
    // Handle loading
    if (loading) {
      let jsx = [];
      for (let i = 0; i <= 5; i++) {
        jsx.push(<SkeletonCT width="100%" height="200px" key={i} />);
      }
      return <div className="grid p-4 grid-cols-3 gap-4">{jsx}</div>;
    }

    // Had data
    return playlists.map((pls, index) => {
      if (index > 0) {
        return (
          <div className="p-4" key={pls.sectionId}>
            <h1 className="font-bold text-white text-3xl mb-6 capitalize">
              {pls.title}
            </h1>
            <div className="grid grid-cols-5 gap-4">
              {pls.items?.map((pls: PlayList) => (
                <CardMedium data={pls} key={pls.encodeId} />
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
      <div className="bg-gradient-to-b from-purpleCT to-main mt-[-80px]">
        {/* Greet music */}
        <div className="pt-[80px]">{renderTopData()}</div>
      </div>

      {renderRemainData()}
    </div>
  );
};

export default HomePage;
