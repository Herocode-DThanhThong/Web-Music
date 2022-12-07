import { Lyric } from "../models/lyric";
import axiosClient from "../utils/axios";

export const getLyricApi = async (id: string) => {
  try {
    const response: Lyric = await axiosClient.get(`/lyric?id=${id}`);
    return response.sentences;
  } catch (error) {}
};
