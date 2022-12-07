import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const Redirect = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="hover:bg-gray-900  text-white px-4 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 17l-5-5m0 0l5-5m-5 5h12"
          />
        </svg>
      </button>
      <button
        onClick={() => {
          navigate(+1);
        }}
        className="hover:bg-gray-900 text-white px-4 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default memo(Redirect);
