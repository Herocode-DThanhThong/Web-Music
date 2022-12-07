import { ReponseHomePage } from "../models/homepage";
import axiosClient from "../utils/axios";

export const getHomepagePlayListApi = async () => {
  try {
    const data: ReponseHomePage = await axiosClient.get("/home");
    const playList = data.items.filter(
      (playlist) => playlist.sectionType === "playlist"
    );
    return playList;
  } catch (error) {
    console.log(error);
  }
};
