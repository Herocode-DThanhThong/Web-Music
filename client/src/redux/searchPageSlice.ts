import { SongInfo } from "./../models/Song";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { searchSongApi } from "../services/searchApi";

export interface SearchState {
  loading: boolean;
  songs: SongInfo[];
}

const initialState: SearchState = {
  loading: false,
  songs: [],
};
// Action
export const getDataSearchPage = createAsyncThunk(
  "searchpage/fetchDataSearchPage",
  async (keyword: string, thunkApi) => {
    const response: SongInfo[] | undefined = await searchSongApi(keyword);
    return response;
  }
);

// Reducer
const searchPageSlice = createSlice({
  name: "searchpage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataSearchPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDataSearchPage.fulfilled,
        (state, action: PayloadAction<SongInfo[] | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.songs = action.payload;
          }
        }
      )
      .addCase(getDataSearchPage.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selecte
export const selectSearchPage = (state: RootState) => state.searchpage;

export default searchPageSlice.reducer;
