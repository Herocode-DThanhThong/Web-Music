import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MVDetail } from "../../models/mvPage";
import { selectCommon, toggleModalVideoDetail } from "../../redux/commonSlice";
import { getVideoMV, selectMVPage } from "../../redux/mvPageSlice";
import CardRecommendMV from "../Card/CardRecommendMV";
import SkeletonCT from "../SkeletonCT";
import queryString from "query-string";
interface Props {}

const ModalDetailMV = (props: Props) => {
  // Navigate
  const navigate = useNavigate();
  // Redux
  const dispatch = useAppDispatch();
  const { modalVideoDetail, isTochedModalVideoDetail } =
    useAppSelector(selectCommon);
  const { videoDetail, loading } = useAppSelector(selectMVPage);
  // State
  const [quality, setQuality] = useState<string>("360p");

  // Handle Get id
  const { search } = useLocation();
  const { id } = queryString.parse(search);

  // Effect
  useEffect(() => {
    if (id) {
      dispatch(getVideoMV(id as string));
    }
  }, [id, dispatch]);

  // Handle get url acorrding url
  const getUrlQuality: () => string | undefined = () => {
    if (quality === "360p") {
      return videoDetail.streaming.mp4["360p"];
    } else if (quality === "480p") {
      return videoDetail.streaming.mp4["480p"];
    } else {
      return videoDetail.streaming.mp4["720p"];
    }
  };

  const renderData = () => {
    // Handle loading
    if (loading) {
      let jsx = [];
      for (let i = 0; i <= 7; i++) {
        jsx.push(<SkeletonCT width="100%" height="200px" key={i} />);
      }
      return <div className="grid p-4 grid-cols-4 gap-6">{jsx}</div>;
    }

    // Had data
    return (
      <div className="grid grid-cols-4 gap-6">
        {videoDetail.recommends.map((mvRecommend: MVDetail, idx: number) => (
          <CardRecommendMV data={mvRecommend} key={mvRecommend.encodeId} />
        ))}
      </div>
    );
  };
  return (
    <div
      style={{
        backgroundImage: `url(${videoDetail.thumbnailM})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`top-0 left-0 right-0 bottom-0 fixed ${
        isTochedModalVideoDetail
          ? modalVideoDetail
            ? "animate-showUp"
            : "animate-fadeDown translate-y-[100%]"
          : "translate-y-[100%]"
      } z-[999] h-screen`}
    >
      {/* Button hide modal */}
      <div className="absolute z-30 right-4 top-4">
        <button
          onClick={() => {
            dispatch(toggleModalVideoDetail());
            document.body.style.overflow = "overlay";
            navigate("/mv");
          }}
          className="glassmorphism hover:opacity-90"
        >
          <KeyboardArrowDownIcon
            className="text-white"
            sx={{ fontSize: "2rem" }}
          />
        </button>
      </div>
      {/* Component */}
      <div className="bg-[#000000ab] w-full h-full max-h-screen">
        <div className="glassmorphism-modal w-full h-full overflow-auto">
          <div className="py-2 px-6 ">
            {/* Info artics */}
            <div className="flex gap-2 items-center mt-2 w-[300px]">
              {/* Avatar */}
              <Avatar alt="Remy Sharp" src={videoDetail.artist.thumbnail} />
              {/* Artist */}
              <div className="w-[200px]">
                <h1 className="text-base capitalize text-left mt-2 font-semibold text-white truncate">
                  {videoDetail.title}
                </h1>
                <p className="text-sm capitalize text-gray-300 leading-7 truncate">
                  {videoDetail.artistsNames}
                </p>
              </div>
            </div>

            {/* Video player */}
            <div className="flex gap-2 justify-center mt-4 pb-4 max-h-[500px]">
              <div className="w-[60%]">
                {loading ? (
                  <SkeletonCT height="500px" width="100%" />
                ) : (
                  <ReactPlayer
                    playing={modalVideoDetail}
                    controls={true}
                    width="100%"
                    height="100%"
                    url={getUrlQuality() ? getUrlQuality() : ""}
                  />
                )}
              </div>
            </div>

            {/* Category quality */}
            <div className="flex gap-4 my-4 justify-center">
              <Button
                onClick={() => {
                  setQuality("360p");
                }}
                variant={quality === "360p" ? "contained" : "outlined"}
                color="primary"
                sx={{
                  border: "1px solid #3f51b5",
                  bgcolor: quality === "360p" ? "#3f51b5" : "",
                }}
              >
                <span className="text-gray-200 font-semibold">360p</span>
              </Button>
              <Button
                onClick={() => {
                  setQuality("480p");
                }}
                variant={
                  (quality as string) === "480p" ? "contained" : "outlined"
                }
                sx={{
                  border: "1px solid #3f51b5",
                  bgcolor: quality === "480p" ? "#3f51b5" : "",
                }}
              >
                <span className="text-gray-200 font-semibold">480p</span>
              </Button>
              <Button
                onClick={() => {
                  setQuality("720p");
                }}
                sx={{
                  border: "1px solid #3f51b5",
                  bgcolor: quality === "720p" ? "#3f51b5" : "",
                }}
              >
                <span className="text-gray-200 font-semibold">720p</span>
              </Button>
            </div>
          </div>
          {/* Recommend */}
          <div className=" bg-[hsla(0,0%,100%,.10196078431372549)]">
            <div className="p-4">
              <h1 className="text-white text-xl font-semibold capitalize px-4 mb-4">
                liên quan
              </h1>
              {renderData()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailMV;
