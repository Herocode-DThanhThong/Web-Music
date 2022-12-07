import React from "react";
import { Link } from "react-router-dom";
import { PlayList } from "../../models/homepage";

interface Props {
  data: PlayList;
}

const CardPlaylistRow = ({ data }: Props) => {
  return (
    <Link to={`/playlist/${data.encodeId}`}>
      <div className="h-[110px] cursor-pointer glassmorphism-card-song flex items-center gap-2">
        <img
          loading="lazy"
          src={data?.thumbnail}
          className="h-full object-cover w-[30%]"
          alt=""
        />
        <div className="px-2 w-[70%]">
          <h1 className="text-xl font-semibold text-white">{data.title}</h1>
          <p className="text-sm text-gray-300 mt-2 leading-7 truncate">
            {data.sortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardPlaylistRow;
