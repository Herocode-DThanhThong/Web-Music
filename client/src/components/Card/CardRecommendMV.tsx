import { useNavigate } from "react-router-dom";
import { MVDetail } from "../../models/mvPage";

interface Props {
  data: MVDetail;
}

const CardRecommendMV = ({ data }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`?id=${data.encodeId}`);
      }}
      className="z-10 hover:opacity-90 transition-all duration-300 ease-in-out cursor-pointer"
    >
      {/* Img */}
      <div className="w-full relative">
        <img className="w-full rounded-md" src={data.thumbnailM} alt="" />
      </div>
      {/* Info */}
      <div className="flex gap-2 items-center mt-2 w-[200px]">
        {/* Artist */}
        <div className="w-[200px]">
          <h1 className="text-base text-left mt-2 font-semibold text-white truncate">
            {data.title}
          </h1>
          <p className="text-sm text-gray-300 leading-7 truncate">
            {data.artistsNames}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardRecommendMV;
