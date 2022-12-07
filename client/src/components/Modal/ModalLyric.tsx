import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAudio } from "../../redux/audioSlice";
import { selectCommon, toggleModalLyric } from "../../redux/commonSlice";
import Lyric from "../BarSong/Lyric";
interface Props {
  audioApp: HTMLAudioElement | null;
}

const ModalLyric = ({ audioApp }: Props) => {
  // Redux
  const dispatch = useAppDispatch();
  const { modalLyric, isTochedModalLyric } = useAppSelector(selectCommon);
  const { infoSong } = useAppSelector(selectAudio);

  return (
    <div
      style={{
        backgroundImage: `url(${infoSong.thumbnailM})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`top-0 left-0 right-0 bottom-0 fixed ${
        isTochedModalLyric
          ? modalLyric
            ? "animate-showUp"
            : "animate-fadeDown translate-y-[100%]"
          : "translate-y-[100%]"
      } z-[999] h-screen`}
    >
      {/* Button hide modal */}
      <div className="absolute z-30 right-4 top-4">
        <button
          onClick={() => {
            dispatch(toggleModalLyric());
            document.body.style.overflow = "overlay";
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
          <div className="grid grid-cols-2 my-auto gap-4 px-16 py-8 w-full h-full">
            {/* Thumnail artist */}
            <div className="m-auto">
              <img
                className="w-[500px] h-[500px] rounded-md"
                src={infoSong.thumbnailM}
                alt=""
              />
            </div>
            {/* Lyric */}
            <Lyric audioApp={audioApp} modalLyric={modalLyric} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLyric;
