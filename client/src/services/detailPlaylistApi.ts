import { SongsDetailPlaylistPage } from "../models/detailPlaylistPage";
import axiosClient from "../utils/axios";

export const getDetailPlaylistApi = async (id: string) => {
  try {
    const data: SongsDetailPlaylistPage = await axiosClient.get(
      `/detailplaylist?id=${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
