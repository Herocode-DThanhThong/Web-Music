import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { getRankSongApi } from "../services/rankApi";
import { SongInfo } from "./../models/Song";

export interface RankState {
  loading: boolean;
  rankSongs: SongInfo[];
}

const initialState: RankState = {
  loading: false,
  rankSongs: [],
};

// Action
export const getDataRankPage = createAsyncThunk(
  "albumPage/fetchDataRankPage",
  async (params, thunkApi) => {
    const response: SongInfo[] | undefined = await getRankSongApi();
    return response;
  }
);

// Reducer
const rankPageSlice = createSlice({
  name: "rankpage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataRankPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDataRankPage.fulfilled,
        (state, action: PayloadAction<SongInfo[] | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.rankSongs = action.payload;
          }
        }
      )
      .addCase(getDataRankPage.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selecte
export const selectRankPage = (state: RootState) => state.rankpage;

export default rankPageSlice.reducer;
