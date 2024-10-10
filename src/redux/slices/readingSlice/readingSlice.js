import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services";

const readingSlice = createSlice({
  name: "reading",
  initialState: {
    data: [],
    areaAndRegion: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiAllReading.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchApiGetAreaAndRegion.fulfilled, (state, action) => {
        state.areaAndRegion = action.payload;
      });
  },
});

// fetch api all reading
const fetchApiAllReading = createAsyncThunk(
  "reading/fetchApiAllReading",
  async () => {
    try {
      const res = await getRequest("tuyen-doc/get-all");

      console.log("res all reading ->", res.data.data);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get KhuVuc + Vung
const fetchApiGetAreaAndRegion = createAsyncThunk(
  "reading/fetchApiGetAreaAndRegion",
  async (readingKeyId) => {
    try {
      if (readingKeyId) {
        const res = await getRequest(
          `tuyen-doc/get-single-and-relationship/${readingKeyId}`
        );

        console.log("res from id reading ->", res.data.data);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export { fetchApiAllReading, fetchApiGetAreaAndRegion };

export default readingSlice;
