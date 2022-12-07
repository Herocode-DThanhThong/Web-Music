import { Link, NavLink } from "react-router-dom";

interface Props {}

const NotFound = (props: Props) => {
  return (
    <div className="bg-main min-h-screen fixed top-0 left-0 right-0 bottom-0 z-30">
      <div className="flex justify-center items-center h-full flex-col">
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
        {/* Content */}
        <div className="my-8">
          <h1 className="text-5xl text-white font-bold">
            Không tìm thấy trang
          </h1>
          <p className="text-center mt-6 text-white text-[18px]">
            Trang bạn đang tìm không tồn tại.
          </p>
          <Link to={"/"}>
            <button className="bg-white mt-8 mx-auto block texl-3xl hover:opacity-90 font-bold rounded-full px-12 py-4">
              Trang chủ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
