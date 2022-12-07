import { ListMV, Video } from "../models/mvPage";
import axiosClient from "../utils/axios";

export const getMVApi = async (id: string, page: number, count: number) => {
  try {
    const data: ListMV = await axiosClient.get("/listmv", {
      params: {
        id,
        page,
        count,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoApi = async (id: string) => {
  try {
    const data: Video = await axiosClient.get(`/video?id=${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
