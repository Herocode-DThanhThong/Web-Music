import { SongInfo } from "../models/Song";
import axiosClient from "../utils/axios";
interface AudioURL {
  128: string;
}
export const getSongApi = async (id: string) => {
  try {
    const url: AudioURL = await axiosClient.get(`/song?id=${id}`);
    return url[128];
  } catch (err) {
    console.log(err);
  }
};
export const getInfoSongApi = async (id: string) => {
  try {
    const data: SongInfo = await axiosClient.get(`/infosong?id=${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
