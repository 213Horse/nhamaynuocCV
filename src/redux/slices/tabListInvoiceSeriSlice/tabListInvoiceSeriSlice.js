import { createSlice } from "@reduxjs/toolkit";

const tabListInvoiceSeriSlice = createSlice({
  name: "tabListInvoiceSeriSlice",
  initialState: {
    tabList: null,
  },
  reducers: {
    btnClickTabListInvoiceSeri: (state, action) => {
      state.tabList = action.payload;
    },
  },
});

export default tabListInvoiceSeriSlice;
