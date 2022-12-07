import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { SongsDetailPlaylistPage } from "../models/detailPlaylistPage";
import { getDetailPlaylistApi } from "../services/detailPlaylistApi";

export interface DetailPlaylistState {
  loading: boolean;
  detailPlaylist: SongsDetailPlaylistPage;
}

const initialState: DetailPlaylistState = {
  loading: false,
  detailPlaylist: {
    encodeId: "",
    title: "",
    thumbnailM: "",
    song: {
      items: [],
      total: 0,
    },
    description: "",
    like: 0,
    aliasTitle: "",
  },
};

// Action
export const getDetailPlaylist = createAsyncThunk(
  "homepage/fetchDataDetaiplaylistPage",
  async (idPlaylist: string, thunkApi) => {
    const response: SongsDetailPlaylistPage | undefined =
      await getDetailPlaylistApi(idPlaylist);

    return response;
  }
);

// Reducer
const detailPlaylistPageSlice = createSlice({
  name: "detailPlaylistPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDetailPlaylist.fulfilled,
        (state, action: PayloadAction<SongsDetailPlaylistPage | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.detailPlaylist = action.payload;
          }
        }
      )
      .addCase(getDetailPlaylist.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selecte
export const selectDetailPlaylistPage = (state: RootState) =>
  state.detailPlaylistPage;

export default detailPlaylistPageSlice.reducer;
