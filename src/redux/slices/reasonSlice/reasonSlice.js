import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  CATEGORY_ACTIONS,
  CATEGORY_TYPE,
  getCategory,
  postCategory,
} from "../../../services/categoryServices";

const reasonSlice = createSlice({
  name: "reasonSlice",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReasonData.fulfilled, (state, action) => {
      state.data = action?.payload || [];
    });
  },
});

export const fetchReasonData = createAsyncThunk(
  "reasonSlice/fetchReasonData",
  async (queryString) => {
    try {
      const res = await getCategory(CATEGORY_TYPE.REASON, queryString);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchAddReason = createAsyncThunk(
  "reasonSlice/fetchAddReason",
  async (payload) => {
    try {
      const { maLDT: keyId, tenLDT, maKyHieu, queryString } = payload;

      const res = await postCategory(
        CATEGORY_ACTIONS.ADD,
        CATEGORY_TYPE.REASON,
        {
          danhMuc: {
            keyId: maKyHieu,
            value: tenLDT,
            kyHieu: maKyHieu,
            nhaMayId: queryString,
          },
        }
      );

      toast.success("Thêm thành công.");

      return res.data.data;
    } catch (error) {
      // toast.error("lý do hủy đã tồn tại!");
      // if (error.response && error.response.status === 400) {
      //   toast.error(error.response.data.Message);
      // }
      console.log({ error });
    }
  }
);

export const fetchDeleteReason = createAsyncThunk(
  "reasonSlice/fetchDeleteReason",
  async (payload) => {
    const { maLDT: keyId, key, kyHieu } = payload;

    try {
      await postCategory(CATEGORY_ACTIONS.DELETE, CATEGORY_TYPE.REASON, {
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

export const fetchUpdateReason = createAsyncThunk(
  "reasonSlice/fetchUpdateReason",
  async (payload) => {
    try {
      const { maLDT: keyId, tenLDT, key, kyHieu, queryString } = payload;

      console.log(payload);

      await postCategory(CATEGORY_ACTIONS.MODIFY, CATEGORY_TYPE.REASON, {
        id: key,
        danhMuc: {
          keyId: kyHieu,
          value: tenLDT,
          kyHieu: kyHieu,
          nhaMayId: queryString,
        },
      });

      toast.success("Cập nhật thành công.");
    } catch (error) {
      toast.error("Sửa thất bại.");
    }
  }
);

export default reasonSlice;
