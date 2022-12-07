import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Playlists } from "../models/homepage";
import { getHomepagePlayListApi } from "../services/homeApi";

export interface HomePageState {
  loading: boolean;
  playlists: Playlists[];
}

const initialState: HomePageState = {
  loading: false,
  playlists: [],
};

// Action
export const getDataHomePage = createAsyncThunk(
  "homepage/fetchDataHomePage",
  async (params, thunkApi) => {
    const response: Playlists[] | undefined = await getHomepagePlayListApi();
    return response;
  }
);

// Reducer
const homePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataHomePage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDataHomePage.fulfilled,
        (state, action: PayloadAction<Playlists[] | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.playlists = action.payload;
          }
        }
      )
      .addCase(getDataHomePage.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selecte
export const selectHomePage = (state: RootState) => state.homepage;

export default homePageSlice.reducer;
