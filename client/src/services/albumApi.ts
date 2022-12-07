import { Album } from "../models/albumPage";
import axiosClient from "../utils/axios";

export const getAlbumTop100Api = async () => {
  try {
    const data: Album[] = await axiosClient.get("/top100");
    return data;
  } catch (error) {
    console.log(error);
  }
};
