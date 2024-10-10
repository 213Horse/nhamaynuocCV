import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    data: null,
  },
  reducers: {
    btnClickSidebarMenu: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default sidebarSlice;
