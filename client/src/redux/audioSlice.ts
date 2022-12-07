import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { SongInfo } from "../models/Song";
import { getInfoSongApi, getSongApi } from "../services/songApi";
import {
  IS_RANDOM_SONG_MUSIC_APP,
  IS_REPEAT_SONG_MUSIC_APP,
} from "../utils/types";
export interface AudioState {
  loading: boolean;
  url: string;
  isPlay: boolean;
  infoSong: SongInfo;
  dataSongIds: string[];
  dataVipSongIds: string[];
  currentIdSong: string;
  currentIndexSong: number;
  nextIndexSong: number;
  prevIndexSong: number;
  repeatSong: boolean;
  randomSong: boolean;
}
const initialState: AudioState = {
  loading: false,
  url: "",
  isPlay: false,
  infoSong: {
    encodeId: "",
    title: "",
    artistsNames: "",
    thumbnailM: "",
    duration: 0,
    streamingStatus: 1,
  },
  dataSongIds: [],
  dataVipSongIds: [],
  currentIdSong: "",
  currentIndexSong: 0,
  nextIndexSong: 0,
  prevIndexSong: 0,
  repeatSong: localStorage.getItem(IS_REPEAT_SONG_MUSIC_APP)
    ? JSON.parse(localStorage.getItem(IS_REPEAT_SONG_MUSIC_APP) || "")
    : false,
  randomSong: localStorage.getItem(IS_RANDOM_SONG_MUSIC_APP)
    ? JSON.parse(localStorage.getItem(IS_RANDOM_SONG_MUSIC_APP) || "")
    : false,
};

// Thunk Action
export const getInfoSong = createAsyncThunk(
  "audio/fetchInfoSong",
  async (idSong: string, thunkApi) => {
    // Get src audio
    const responseInfoSong: SongInfo | undefined = await getInfoSongApi(idSong);
    return responseInfoSong;
  }
);

export const getSrcSong = createAsyncThunk(
  "audio/fetchSrcSong",
  async (idSong: string, thunkApi) => {
    const responseURLAudioSong: string | undefined = await getSongApi(idSong);
    return responseURLAudioSong;
  }
);

// Reducer
const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    playSong: (state) => {
      state.isPlay = true;
    },
    pauseSong: (state) => {
      state.isPlay = false;
    },
    setListIDAudio: (state, action: PayloadAction<string[]>) => {
      state.dataSongIds = action.payload;
    },
    setCurrentIdSong: (state, action: PayloadAction<string>) => {
      state.currentIdSong = action.payload;
    },
    setRandomSong: (state) => {
      state.randomSong = !state.randomSong;
      localStorage.setItem(
        IS_RANDOM_SONG_MUSIC_APP,
        JSON.stringify(state.randomSong)
      );
    },
    setRepeatSong: (state) => {
      state.repeatSong = !state.repeatSong;
      localStorage.setItem(
        IS_REPEAT_SONG_MUSIC_APP,
        JSON.stringify(state.repeatSong)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSrcSong.pending, (state) => {})
      .addCase(
        getSrcSong.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          if (action.payload) {
            state.url = action.payload;
          }
        }
      )
      .addCase(getSrcSong.rejected, (state) => {})
      .addCase(getInfoSong.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getInfoSong.fulfilled,
        (state, action: PayloadAction<SongInfo | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.infoSong = action.payload;
          }
        }
      )
      .addCase(getInfoSong.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Simple Action
export const {
  playSong,
  pauseSong,
  setListIDAudio,
  setCurrentIdSong,
  setRandomSong,
  setRepeatSong,
} = audioSlice.actions;

// Selecte
export const selectAudio = (state: RootState) => state.audio;

export default audioSlice.reducer;
