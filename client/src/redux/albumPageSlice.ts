import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Album } from "../models/albumPage";
import { getAlbumTop100Api } from "../services/albumApi";

export interface AlbumState {
  loading: boolean;
  albums: Album[];
}

const initialState: AlbumState = {
  loading: false,
  albums: [],
};

// Action
export const getDataAlbumPage = createAsyncThunk(
  "albumPage/fetchDataAlbumPage",
  async (params, thunkApi) => {
    const response: Album[] | undefined = await getAlbumTop100Api();
    return response;
  }
);

// Reducer
const albumPageSlice = createSlice({
  name: "albumpage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataAlbumPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDataAlbumPage.fulfilled,
        (state, action: PayloadAction<Album[] | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.albums = action.payload;
          }
        }
      )
      .addCase(getDataAlbumPage.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selecte
export const selectAlbumPage = (state: RootState) => state.albumpage;

export default albumPageSlice.reducer;
