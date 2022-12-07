import SearchIcon from "@mui/icons-material/Search";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props {}

const Search = (props: Props) => {
  // State
  const [keyword, setKeyWord] = useState("");
  // Redux
  const naviate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    naviate(`/search?keyword=${keyword}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 rounded-md flex gap-2 w-[250px]  items-center text-white bg-black opacity-60 focus:opacity-100"
    >
      <SearchIcon className="" />
      <input
        value={keyword}
        onChange={(e) => {
          setKeyWord(e.target.value);
        }}
        type="text"
        className="bg-transparent  rounded-md outline-none"
        placeholder="Tìm kiếm theo tên bài hát..."
      />
    </form>
  );
};

export default memo(Search);
