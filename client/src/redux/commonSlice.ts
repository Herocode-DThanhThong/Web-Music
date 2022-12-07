import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface CommonState {
  modalVideoDetail: boolean;
  modalLyric: boolean;
  isTochedModalVideoDetail: boolean;
  isTochedModalLyric: boolean;
}

const initialState: CommonState = {
  modalVideoDetail: false,
  isTochedModalVideoDetail: false,
  modalLyric: false,
  isTochedModalLyric: false,
};

// Reducer
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleModalVideoDetail: (state) => {
      state.modalVideoDetail = !state.modalVideoDetail;
    },
    touchModalVideoDetail: (state) => {
      state.isTochedModalVideoDetail = true;
    },
    toggleModalLyric: (state) => {
      state.modalLyric = !state.modalLyric;
    },
    touchModalLyric: (state) => {
      state.isTochedModalLyric = true;
    },
  },
});

// Action
export const {
  toggleModalVideoDetail,
  touchModalVideoDetail,
  toggleModalLyric,
  touchModalLyric,
} = commonSlice.actions;

// Selecte
export const selectCommon = (state: RootState) => state.common;

export default commonSlice.reducer;
