import {
  CATEGORY_ACTIONS,
  CATEGORY_TYPE,
  getCategory,
  postCategory,
} from "../../../services/categoryServices";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getRequest, postRequest, putRequest } from "../../../services";
import { deleteRequest } from "../../../services";



const seriSlice = createSlice({
  name: "seriSlice",
  initialState: {
    record: null,
    seriList: [],
    danhSachSeri: [],
  },
  reducers: {
    btnClickTableSeri: (state, action) => {
      state.record = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSeriInvoice.fulfilled, (state, action) => {
        state.danhSachSeri = action.payload;
      })
      .addCase(fetchDeleteSeri.fulfilled, (state) => {
        state.record = null;
      })
      .addCase(fetchUpdateSeriHoaDon.fulfilled, (state, action) => {
        state.record = null;
      });
  },
});

export const getAllSeriInvoice = createAsyncThunk(
  "seriSlice/getAllSeriInvoice",
  async (queryString) => {
    try {
      const res = await getRequest(
        `danh-muc-seri-hoa-don/get-all?${queryString}`
      );
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchAddSeriInvoice = createAsyncThunk(
  "seriSlice/fetchAddSeriInvoice",
  async ({ values, nhaMayId }) => {
    try {
      const { soHoaDon, soLuongHoaDon } = values;

      const res = await postRequest(`danh-muc-seri-hoa-don/add?${nhaMayId}`, {
        keyId: "",
        soHoaDon: soHoaDon,
        soLuongHoaDon: soLuongHoaDon,
      });
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

export const fetchDeleteSeri = createAsyncThunk(
  "seriSlice/fetchDeleteSeri",
  async (listSeriData, thunkApi) => {
    const { keyId} = listSeriData;
    try {
    await deleteRequest(`danh-muc-seri-hoa-don/delete/${keyId}`);
    toast.success("Xóa thành công.");
    } catch (error) {
      toast.error("Xoá thất bại.");
    }
  }
);

export const fetchUpdateSeriHoaDon = createAsyncThunk(
  "seriSlice/fetchUpdateSeriHoaDon",
  async ({ values, nhaMayId, keyId }) => {
    try {
      const { soHD, soLuongHoaDon } = values;

      await putRequest(`danh-muc-seri-hoa-don/update?${nhaMayId}`, {
        keyId: keyId,
        data: {
          keyId: keyId,
          soLuongHoaDon: soLuongHoaDon,
          soHoaDon: soHD,
        },
      });

      toast.success("Cập nhật thành công.");
    } catch (error) {
      toast.error("Sửa thất bại.");
    }
  }
);

export default seriSlice;
