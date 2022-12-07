import React from "react";
import { NavLink } from "react-router-dom";
interface Props {}

const Sidebar = (props: Props) => {
  return (
    <div className="w-[250px] z-10 fixed top-0 left-0 bottom-0 bg-black p-4">
      {/* Logo */}
      <NavLink to={"/"}>
        <div className="flex gap-2 shadow-lg rounded-md shadow-cyan-500/50 p-2">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </span>
          <h1 className="font-extrabold uppercase  text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Music app
          </h1>
        </div>
      </NavLink>
      {/* Category */}
      <div className="p-2 mt-6">
        <NavLink
          to={"/"}
          className="group"
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#c6c6c6",
          })}
        >
          <div className="text-ewhite flex gap-4 items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <p className="text-[18px] font-semibold group-hover:text-white transition-all ease-in-out duration-300">
              Trang chủ
            </p>
          </div>
        </NavLink>
        <NavLink
          to={"/rank"}
          className="group "
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#c6c6c6",
          })}
        >
          <div className=" flex gap-4 items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:text-white transition-all ease-in-out duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <p className="text-[18px] group-hover:text-white transition-all ease-in-out duration-300">
              Bảng xếp hạng
            </p>
          </div>
        </NavLink>
        <NavLink
          to={"/album"}
          className="group"
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#c6c6c6",
          })}
        >
          <div className="flex gap-4 items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 group-hover:text-white transition-all ease-in-out duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <p className="text-[18px] group-hover:text-white transition-all ease-in-out duration-300">
              Album
            </p>
          </div>
        </NavLink>
        <NavLink
          to={"/mv"}
          className="group"
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#c6c6c6",
          })}
        >
          <div className="flex gap-4 items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:text-white transition-all ease-in-out duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-[18px] group-hover:text-white transition-all ease-in-out duration-300">
              MV
            </p>
          </div>
        </NavLink>
      </div>
      {/* Features */}
      <div className="px-2 py-4 border-b-[1px] border-gray-500">
        <div className="flex gap-4 opacity-80 hover:opacity-100 transition-all ease-in-out duration-300 cursor-pointer">
          <button className="bg-gradient-to-r from-gray-500 to-white text-black p-1 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <p className="text-white text-base font-semibold">Tạo playlist</p>
        </div>
        <div className="flex gap-4 mt-6 opacity-80 hover:opacity-100 transition-all ease-in-out duration-300 cursor-pointer">
          <button className="p-1 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <p className="text-white text-base font-semibold">Bài hát đã thích</p>
        </div>
        <div className="flex gap-4 mt-6 opacity-80 hover:opacity-100 transition-all ease-in-out duration-300 cursor-pointer">
          <button className="p-1 rounded-md bg-gradient-to-r from-violet-800 to-green-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </button>
          <p className="text-white text-base font-semibold">MV yêu thích</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
