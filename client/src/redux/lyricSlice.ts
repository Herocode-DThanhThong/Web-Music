import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Words } from "../models/lyric";
import { getLyricApi } from "./../services/lyricApi";

export interface LyricState {
  loading: boolean;
  words: Words[];
}

const initialState: LyricState = {
  loading: false,
  words: [],
};
// Action
export const getLyricSong = createAsyncThunk(
  "lyric/fetchDataLyricSong",
  async (id: string, thunkApi) => {
    const response: Words[] | undefined = await getLyricApi(id);
    return response;
  }
);

// Reducer
const lyricSlice = createSlice({
  name: "lyric",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLyricSong.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getLyricSong.fulfilled,
        (state, action: PayloadAction<Words[] | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.words = action.payload;
          }
        }
      )
      .addCase(getLyricSong.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selecte
export const selectLyric = (state: RootState) => state.lyric;

export default lyricSlice.reducer;
