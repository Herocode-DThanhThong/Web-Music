import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { MVDetail } from "../../models/mvPage";
import {
  toggleModalVideoDetail,
  touchModalVideoDetail,
} from "../../redux/commonSlice";

interface Props {
  mv: MVDetail;
}

const CardMV = ({ mv }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (mv.streamingStatus === 1) {
          // Toggle modal
          dispatch(touchModalVideoDetail());
          dispatch(toggleModalVideoDetail());

          // Css
          document.body.style.overflow = "hidden";

          // Navigate
          navigate(`?id=${mv.encodeId}`);
        }
      }}
      className="z-10 hover:opacity-90 transition-all duration-300 ease-in-out cursor-pointer"
    >
      {/* Img */}
      <div className="w-full relative">
        <img className="w-full rounded-md" src={mv?.thumbnailM} alt="" />
        <div
          className="absolute top-3 w-full h-full bottom-0 z-[-1] bg-cover rounded-full blur-md scale-95"
          style={{
            backgroundImage: `url(${mv?.thumbnailM})`,
          }}
        ></div>
      </div>
      {/* Info */}
      <div className="flex gap-2 items-center mt-2 w-[300px]">
        {/* Avatar */}

        <Avatar alt="Remy Sharp" src={mv?.artist?.thumbnail} />

        {/* Artist */}
        <div className="w-[150px]">
          <h1 className="text-base text-left mt-2 font-semibold text-white truncate">
            {mv?.title}
          </h1>
          <p className="text-sm text-gray-300 leading-7 truncate">
            {mv?.artistsNames}
          </p>
        </div>

        {/* Vip */}
        {mv.streamingStatus !== 1 && (
          <div className="">
            <span className="text-yellow-500">VIP</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardMV;
