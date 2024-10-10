import {
  CATEGORY_ACTIONS,
  CATEGORY_TYPE,
  getCategory,
  postCategory,
} from "../../../services/categoryServices";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const watchSlice = createSlice({
  name: "watchSlice",
  initialState: {
    record: null,
    watchList: [],
  },
  reducers: {
    btnClickTableWatch: (state, action) => {
      state.record = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchData.fulfilled, (state, action) => {
        state.watchList = action.payload;
      })
      .addCase(fetchDeleteWatch.fulfilled, (state) => {
        state.record = null;
      })
      .addCase(fetchUpdateWatch.fulfilled, (state, action) => {
        state.record = null;
      });
  },
});

export const fetchWatchData = createAsyncThunk(
  "watchSlice/fetchWatchData",
  async (queryString) => {
    try {
      const res = await getCategory(CATEGORY_TYPE.WATCH, queryString);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchAddWatch = createAsyncThunk(
  "watchSlice/fetchAddWatch",
  async (payload, thunkApi) => {
    try {
      const { keyId, kieuDongHo, kyHieu, queryString } = payload;
      const res = await postCategory(
        CATEGORY_ACTIONS.ADD,
        CATEGORY_TYPE.WATCH,
        {
          danhMuc: {
            keyId: kyHieu,
            value: kieuDongHo,
            kyHieu: kyHieu,
            nhaMayId: queryString,
          },
        }
      );
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Thêm thành công!");
      }
      return res.data.data;
    } catch (error) {
      toast.error(
        error.response.status === 400
          ? "Mã Kiểu Đồng Hồ đã tồn tại."
          : "Thêm thất bại."
      );
    }
  }
);

export const fetchDeleteWatch = createAsyncThunk(
  "watchSlice/fetchDeleteWatch",
  async (payload, thunkApi) => {
    const { keyId, key, kyHieu } = payload;
    try {
      await postCategory(CATEGORY_ACTIONS.DELETE, CATEGORY_TYPE.WATCH, {
        id: key,
        danhMuc: {
          keyId: kyHieu,
          kyHieu: kyHieu,
        },
      });
      toast.success("Xoá thành công");
    } catch (error) {
      toast.error("Xoá thất bại.");
    }
  }
);

export const fetchUpdateWatch = createAsyncThunk(
  "watchSlice/fetchUpdateWatch",
  async (payload, thunkApi) => {
    try {
      const { keyId, kieuDongHo, key, queryString, kyHieu } = payload;

      console.log(key);

      await postCategory(CATEGORY_ACTIONS.MODIFY, CATEGORY_TYPE.WATCH, {
        id: key,
        danhMuc: {
          keyId: kyHieu,
          value: kieuDongHo,
          nhaMayId: queryString,
          kyHieu: kyHieu,
        },
      });

      toast.success("Cập nhật thành công.");
    } catch (error) {
      toast.error("Sửa thất bại.");
    }
  }
);

export default watchSlice;
