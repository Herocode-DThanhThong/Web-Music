import { SongInfo } from "../models/Song";
import axiosClient from "../utils/axios";
interface Reponse {
  songs: SongInfo[];
}
export const searchSongApi = async (keyword: string) => {
  try {
    const data: Reponse = await axiosClient.get("/search", {
      params: {
        keyword,
      },
    });
    return data.songs;
  } catch (error) {
    console.log(error);
  }
};
