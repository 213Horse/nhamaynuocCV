import { createSlice } from "@reduxjs/toolkit";

const tabListInvoicePrintSlice = createSlice({
  name: "tabListInvoicePrintSlice",
  initialState: {
    tabList: null,
  },
  reducers: {
    btnClickTabListInvoicePrint: (state, action) => {
      state.tabList = action.payload;
    },
  },
});

export default tabListInvoicePrintSlice;
