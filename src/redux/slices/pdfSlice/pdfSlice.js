import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRequestParams } from "../../../services";

const pdfSlice = createSlice({
  name: "pdf",
  initialState: {
    exportPDF: [],
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchApiExportToPdfManagerContract.fulfilled,
      (state, action) => {
        state.exportPDF = action.payload;
      }
    );
  },
});

// fetch api -> export to pdf contract
const fetchApiExportToPdfManagerContract = createAsyncThunk(
  "excel/fetchApiExportToPdfManagerContract",
  async (listNhaMayId) => {
    try {
      if (listNhaMayId) {
        const res = await getRequestParams(
          `hop-dong/get-excel-quan-ly-hop-dong`,
          listNhaMayId
        );

        console.log("res export to pdf", res.data);

        return res.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export { fetchApiExportToPdfManagerContract };

export default pdfSlice;
