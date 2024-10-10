import { createSlice } from "@reduxjs/toolkit";

export const tabListReadingSlice = createSlice({
  name: "tabListReadingSlice",
  initialState: {
    rowSelected: null,
    isDeleteBtn: false,
  },
  reducers: {
    btnClickTabListReading: (state, action) => {
      state.rowSelected = action.payload;
    },
    btnDelete: (state, action) => {
      state.isDeleteBtn = action.payload;
    }
  },
});

export const { btnClickTabListReading, btnDelete } = tabListReadingSlice.actions;
export default tabListReadingSlice;
