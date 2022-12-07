import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardMV from "../../components/Card/CardMV";
import Navbar from "../../components/Navbar/Navbar";
import SkeletonCT from "../../components/SkeletonCT";
import TabCT from "../../components/Tab/TabCT";
import { MVDetail } from "../../models/mvPage";
import { getDataMVPage, selectMVPage } from "../../redux/mvPageSlice";
import { dataCategoryMV } from "../../utils/dataCategoryMV";
interface Props {}

const MVPage = (props: Props) => {
  // Redux
  const dispatch = useAppDispatch();
  const { mvList, hasMore } = useAppSelector(selectMVPage);
  // State
  const [idTypeMV, setIDTypeMV] = useState<string>(dataCategoryMV[0].id);
  const [page, setPage] = useState(1);

  // Effect handle load data
  useEffect(() => {
    const params = {
      id: idTypeMV,
      page: 1,
      count: 12,
      newCategory: true,
    };
    dispatch(getDataMVPage(params));
  }, [dispatch, idTypeMV]);

  // Handle loading data
  const handleFetchData = async () => {
    const params = {
      id: idTypeMV,
      page: page + 1,
      count: 12,
      newCategory: false,
    };
    dispatch(getDataMVPage(params));
    setPage(page + 1);
  };

  const renderData = () => {
    // Handle loading
    if (mvList.length === 0) {
      let jsx = [];
      for (let i = 0; i <= 11; i++) {
        jsx.push(<SkeletonCT width="100%" height="200px" key={i} />);
      }
      return <div className="grid p-4 grid-cols-3 gap-4">{jsx}</div>;
    }

    // Had data
    return (
      <InfiniteScroll
        dataLength={mvList.length}
        next={handleFetchData}
        hasMore={hasMore}
        loader={<h4 className="text-white">Loading...</h4>}
      >
        <div className="grid grid-cols-4 gap-3">
          {mvList.map((mv: MVDetail, idx: number) => (
            <CardMV key={idx} mv={mv} />
          ))}
        </div>
      </InfiniteScroll>
    );
  };
  return (
    <div
      className={`bg-main min-h-screen ml-[250px] overflow-hidden pb-[100px]`}
    >
      {/* Navbar */}
      <Navbar />
      <div className="flex gap-4 items-center pb-4 border-b-[1px] border-gray-700">
        <h1 className="text-3xl px-4 text-white inline-block border-r-[1px] border-gray-700">
          <span className="mr-2">#</span>
          MV
        </h1>
        <TabCT
          categories={dataCategoryMV}
          idTypeMV={idTypeMV}
          setIDTypeMV={setIDTypeMV}
        />
      </div>
      <div className="px-4 mt-4 w-full">{renderData()}</div>
    </div>
  );
};

export default MVPage;
