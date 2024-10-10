import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, getRequestParams } from "../../../services";

const factorySlice = createSlice({
  name: "factory",
  initialState: {
    data: [],
    factoryId: {},
    dataByNhaMay: {},
  },
  reducers: {
    btnClickGetFactoryId: (state, action) => {
      state.factoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiAllFactory.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchDataByFactory.fulfilled, (state, action) => {
        state.dataByNhaMay = action.payload;
      });
  },
});

// fetch api all factory
const fetchApiAllFactory = createAsyncThunk(
  "factory/fetchApiAllFactory",
  async () => {
    try {
      const res = await getRequest(`nha-may/get-all`);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);
export const fetchDataByFactory = createAsyncThunk(
  "factory/fetchDataByFactory",
  async (nhaMayId) => {
    try {
      const res = await getRequest(`nha-may/get-single/${nhaMayId}`);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api all factory
const fetchApiFollowDongHoNhaMayID = async (params) => {
  try {
    console.log(params);
    const res = await getRequestParams(
      `chi-so-dong-ho/get-chi-so-dong-ho-by-nha-may-id?${params}`
    );

    return res.data.data;
  } catch (error) {
    console.log({ error });
  }
};
export { fetchApiAllFactory, fetchApiFollowDongHoNhaMayID };

export default factorySlice;
