import React from "react";
import { Link } from "react-router-dom";
import { PlayList } from "../../models/homepage";

interface Props {
  data: PlayList;
}

const CardPlaylistCol = ({ data }: Props) => {
  return (
    <Link to={`/playlist/${data.encodeId}`}>
      <div className="glassmorphism-card-song cursor-pointer flex flex-col gap-2 px-2 py-2  rounded-lg">
        <div className="pt-4 px-2 relative">
          <div className="group">
            <img
              loading="lazy"
              src={data.thumbnail}
              className="object-cover w-[250px] h-[200px] rounded-md"
              alt=""
            />
            <div
              className="absolute top-3 w-full h-full z-[-1] bg-cover rounded-full blur-md scale-95"
              style={{
                backgroundImage: `url(${data.thumbnail})`,
              }}
            ></div>
          </div>
          <img
            loading="lazy"
            src={data.thumbnail}
            className="absolute w-[50px] h-[50px] rounded-md bottom-[-12px] left-[0]"
            alt=""
          />
        </div>
        <div className="px-4">
          <h1 className="text-xl text-left mt-2 font-semibold text-white truncate">
            {data.title}
          </h1>
          <p className="text-sm text-gray-300 mt-2 leading-7 truncate">
            {data.sortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardPlaylistCol;
