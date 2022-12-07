import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import albumPageSlice from "../redux/albumPageSlice";
import audioSlice from "../redux/audioSlice";
import commonSlice from "../redux/commonSlice";
import detailPlaylistSlice from "../redux/detailPlaylistSlice";
import homePageSlice from "../redux/homePageSlice";
import lyricSlice from "../redux/lyricSlice";
import mvPageSlice from "../redux/mvPageSlice";
import rankPageSlice from "../redux/rankPageSlice";
import searchPageSlice from "../redux/searchPageSlice";

export const store = configureStore({
  reducer: {
    homepage: homePageSlice,
    detailPlaylistPage: detailPlaylistSlice,
    audio: audioSlice,
    albumpage: albumPageSlice,
    rankpage: rankPageSlice,
    mvpage: mvPageSlice,
    common: commonSlice,
    searchpage: searchPageSlice,
    lyric: lyricSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
