import { getVideoApi } from "./../services/mvApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { ListParams } from "../models/common";
import { MVDetail, Video } from "../models/mvPage";
import { getMVApi } from "../services/mvApi";
import { ListMV } from "./../models/mvPage";

interface Reponse {
  newCategory: boolean;
  data: ListMV | undefined;
}

export interface MVPageState {
  loading: boolean;
  mvList: MVDetail[];
  total: number;
  hasMore: boolean;
  videoDetail: Video;
}

const initialState: MVPageState = {
  loading: false,
  mvList: [],
  total: 0,
  hasMore: true,
  videoDetail: {
    encodeId: "",
    title: "",
    artistsNames: "",
    artist: {
      id: "",
      name: "",
      alias: "",
      playlistId: "",
      thumbnail: "",
    },
    thumbnailM: "",
    thumbnail: "",
    streamingStatus: "",
    recommends: [],
    streaming: {
      mp4: {},
    },
  },
};

// Action
export const getDataMVPage = createAsyncThunk(
  "mvpage/fetchDataMVPage",
  async (params: ListParams, thunkApi) => {
    const { id, page, count, newCategory } = params;
    const response: ListMV | undefined = await getMVApi(id, page, count);
    const categoryWithReponse: Reponse = {
      newCategory,
      data: response,
    };
    return categoryWithReponse;
  }
);

export const getVideoMV = createAsyncThunk(
  "mvpage/fetchDataVideo",
  async (id: string, thunkApi) => {
    const response: Video | undefined = await getVideoApi(id);
    return response;
  }
);

// Reducer
const mvPageSlice = createSlice({
  name: "mvpage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataMVPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDataMVPage.fulfilled,
        (state, action: PayloadAction<Reponse>) => {
          state.loading = false;
          if (action.payload.data) {
            if (action.payload.newCategory) {
              // When change type mv
              state.mvList = action.payload.data.items;
              state.total = action.payload.data.total;
            } else {
              // Get more data
              if (action.payload.data.items) {
                state.mvList = [...state.mvList, ...action.payload.data.items];
                state.total = action.payload.data.total;
              } else {
                state.hasMore = false;
              }
            }
            if (state.mvList.length === state.total) state.hasMore = false;
          }
        }
      )
      .addCase(getDataMVPage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getVideoMV.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getVideoMV.fulfilled,
        (state, action: PayloadAction<Video | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.videoDetail = action.payload;
          }
        }
      )
      .addCase(getVideoMV.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selecte
export const selectMVPage = (state: RootState) => state.mvpage;

export default mvPageSlice.reducer;
