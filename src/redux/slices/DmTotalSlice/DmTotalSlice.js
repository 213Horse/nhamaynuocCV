import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../../services";
import { toast } from "react-toastify";

const initialState = {
  listManufactuter: [],
  listProducingCountry: [],
  listObjects: [],
  listInstaller: [],
  listMethodPayment: [],
  dsLyDoHuy: [],
  dsLyDoThay: [],
  dsKieuDongHo: [],
  isLoading: false,
};

const DMTotalSlice = createSlice({
  name: "danh_muc_chung",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllDMTotalByType.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllDMTotalByType.fulfilled, (state, action) => {
        state.data = action.payload;
        if (action.payload?.length > 0) {
          if (action.payload[0]?.type === 5) {
            state.listProducingCountry = action.payload;
          } else if (action.payload[0]?.type === 6) {
            state.listManufactuter = action.payload;
          } else if (action.payload[0]?.type === 1) {
            state.listObjects = action.payload;
          } else if (action.payload[0]?.type === 2) {
            state.listInstaller = action.payload;
          } else if (action.payload[0]?.type === 3) {
            state.dsLyDoHuy = action.payload;
          } else if (action.payload[0]?.type === 4) {
            state.dsLyDoThay = action.payload;
          } else if (action.payload[0]?.type === 7) {
            state.dsKieuDongHo = action.payload;
          } else {
            state.listMethodPayment = action.payload;
          }
        }
      });
  },
});

export const getAllDMTotalByType = createAsyncThunk(
  "danh_muc_chung/getAllDMTotalByType",
  async (filterData) => {
    try {
      const res = await getRequest(
        `danh-muc/get-all-by-type?Type=${filterData.type}&${filterData.queryString}`
      );
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const addDMTotalByType = createAsyncThunk(
  "danh_muc_chung/addDMTotalByType",
  async ({ action, keyId, type, value, description, kyHieu, nhaMayId }) => {
    try {
      const res = await postRequest(`danh-muc/actions?${nhaMayId}`, {
        action: action,
        id: null,
        danhMuc: {
          keyId: "",
          type,
          value,
          description,
          kyHieu,
        },
      });
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Thêm thành công");
      }
    } catch (error) {
      console.log({ error });
      toast.error("Thêm thất bại");
    }
  }
);

export const updateDMTotalByType = createAsyncThunk(
  "danh_muc_chung/updateDMTotalByType",
  async ({ action, id, keyId, type, value, description, kyHieu, nhaMayId }) => {
    console.log({ action, id, keyId, type, value, description });
    try {
      const res = await postRequest(`danh-muc/actions?${nhaMayId}`, {
        action: action,
        id: id,
        danhMuc: {
          keyId: "",
          type: type,
          value: value,
          description: description,
          kyHieu: kyHieu,
        },
      });
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Cập nhật thành công");
      }
    } catch (error) {
      console.log({ error });
      // toast.error("Cập nhật thất bại");
    }
  }
);

export const deleteDMTotalByType = createAsyncThunk(
  "danh_muc_chung/deleteDMTotalByType",
  async ({ action, id, keyId, type, kyHieu }) => {
    try {
      const res = await postRequest("danh-muc/actions", {
        action,
        id,
        danhMuc: {
          keyId,
          type,
          value: "string",
          description: "string",
          kyHieu,
        },
      });
      toast.success("Xóa thành công");
    } catch (error) {
      console.log({ error });
      toast.error("Xóa thất bại");
    }
  }
);

export default DMTotalSlice;
