import { createSlice } from "@reduxjs/toolkit";

export const tabListPriceObjSlice = createSlice({
  name: "tabListPriceObjSlice",
  initialState: {
    rowSelected: null,
    isDeleteBtn: false,
  },
  reducers: {
    btnClickTabListPriceObj: (state, action) => {
      state.rowSelected = action.payload;
    },
    btnDelete: (state, action) => {
      state.isDeleteBtn = action.payload;
    },
  },
});

export const { btnClickTabListPriceObj, btnDelete } =
  tabListPriceObjSlice.actions;
export default tabListPriceObjSlice;
