import { SongInfo } from "../models/Song";
import axiosClient from "../utils/axios";

interface Reponse {
  RTChart: {
    items: SongInfo[];
  };
}
export const getRankSongApi = async () => {
  try {
    const data: Reponse = await axiosClient.get("/charthome");
    return data.RTChart.items;
  } catch (error) {
    console.log(error);
  }
};
