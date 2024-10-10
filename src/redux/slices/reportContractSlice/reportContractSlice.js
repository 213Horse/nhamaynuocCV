import { createSlice } from "@reduxjs/toolkit";

const reportContractSlice = createSlice({
  name: "reportContract",
  initialState: {
    factoryName: null,
  },
  reducers: {
    btnClickOptionFactory: (state, action) => {
      state.factoryName = action.payload;
    },
  },
});

export default reportContractSlice;
