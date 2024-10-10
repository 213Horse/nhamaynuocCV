import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../../services";
import { toast } from "react-toastify";

const initialState = {};
export const waterLossSlice = createSlice({
  name: "waterLossSlice",
  initialState,
  dataWaterLoss: [],
  loadingWaterLoss: false,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllWaterLoss.pending, (state) => {
        state.loadingWaterLoss = true;
      })
      .addCase(fetchGetAllWaterLoss.fulfilled, (state, action) => {
        state.dataWaterLoss = action.payload;
        state.loadingWaterLoss = false;
      })
      .addCase(fetchGetAllWaterLoss.rejected, (state, action) => {
        state.loadingWaterLoss = false;
      });
  },
});
export const addThatThoatDongHoBlock = createAsyncThunk(
  "waterLossSlice/addThatThoatDongHoBlock",
  async (values) => {
    try {
      let { thangTaoThatThoat, maDongHo } = values;
      const res = await postRequest(`that-thoat/add-cho-dong-ho-block`, {
        maDongHo,
        thangTaoThatThoat,
      });
      const data = await res.data;
      if (data?.statusCode === 200) {
        toast.success("Thêm thành công");
      } else {
        throw new Error("faild");
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm thất bại");
    }
  }
);
export const addThatThoatDongHoTong = createAsyncThunk(
  "waterLossSlice/addThatThoatDongHoTong",
  async (values) => {
    try {
      let { thangTaoThatThoat, maDongHo } = values;
      const res = await postRequest(`that-thoat/add-cho-dong-ho-tong`, {
        maDongHo,
        thangTaoThatThoat,
      });
      const data = await res.data;
      if (data?.statusCode === 200) {
        toast.success("Thêm thành công");
      } else {
        throw new Error("faild");
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm thất bại");
    }
  }
);

export const fetchGetAllWaterLoss = createAsyncThunk(
  "waterLossSlice/fetchGetAllWaterLoss",
  async (queryString, { rejectWithValue }) => {
    try {
      const res = await getRequest(
        `that-thoat/get-all?${queryString}&pageNumber=1&pageSize=12`
      );
      console.log("Response data Water Loss:", res.data);

      return res.data.data;
    } catch (err) {
      console.error("Error during data fetching:", err);

      // Use rejectWithValue to include the error message in the payload
      return rejectWithValue(err.message);
    }
  }
);

export default fetchGetAllWaterLoss;
