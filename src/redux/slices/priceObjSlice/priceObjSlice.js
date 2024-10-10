import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services";

const priceObjSlice = createSlice({
  name: "priceObj",
  initialState: {
    data: [],
    priceListData: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApiAllPriceObj.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
  reducers: {
    AddListPriceListData(state, action) {
      state.priceListData = action.payload;
    },
    UpdateListPriceListData(state, action) {
      state.priceListData.splice(action.payload.stt);
      state.priceListData.unshift(action.payload.newIems);
    },
  },
});

// fetch api all price obj
const fetchApiAllPriceObj = createAsyncThunk(
  "priceObj/fetchApiAllPriceObj",
  async () => {
    try {
      const res = await getRequest("doi-tuong-gia/get-all");

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export { fetchApiAllPriceObj };
export const { AddListPriceListData, UpdateListPriceListData } =
  priceObjSlice.actions;
export default priceObjSlice;
