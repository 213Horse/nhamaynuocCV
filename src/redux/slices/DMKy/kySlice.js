import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services";
import { toast } from "react-toastify";
import apolloClient from "../../../config/apolloClient";
import { GetKyGhiChiSos } from "../../../graphql/ky/kyQuery";

const initialState = {
  danhSachKy: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
};

export const kySlice = createSlice({
  name: "ky_ghi_chi_so",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllKy.fulfilled, (state, action) => {
        state.danhSachKy = action.payload;
      })
      .addCase(addKy.fulfilled, (state, action) => {
        state.isAddedSuccess = true;
      })
      .addCase(deleteKy.fulfilled, (state, action) => {
        state.isDeletedSuccess = true;
      });
  },
});

// GET ALL
export const getAllKy = createAsyncThunk(
  "ky_ghi_chi_so/getAllKy",
  async (queryString) => {
    try {
      const res = await getRequest(`ky-ghi-chi-so/get-all?${queryString}`);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// ADD
export const addKy = createAsyncThunk("ky_ghi_chi_so/addKy", async (values) => {
  try {
    const { keyId, moTa, ngaySuDungTu, ngaySuDungDen, ngayHoaDon, queryString,kyHieu } =
      values;

    const res = await postRequest(`ky-ghi-chi-so/add?${queryString}`, {
      keyId: "",
      moTa,
      kyHieu,
      ngaySuDungTu,
      ngaySuDungDen,
      ngayHoaDon,
    });
    if (res.data.statusCode === 201) {
      toast.success("Đã thêm mới thành công");
    }
    return res.data.data;
  } catch (err) {
    console.log({ err });
  }
});

// UPDATE
export const updateKy = createAsyncThunk(
  "ky_ghi_chi_so/updateKy",
  async ({dataMain, queryString}) => {
    try {
      // const { keyId , data } = values
      // console.log(keyId , data);
      const res = await putRequest(`ky-ghi-chi-so/update?${queryString}`, dataMain);
      toast.success("Đã cập nhật thành công");
      return res.data.data;
    } catch (err) {
      console.log({ err });
      toast.error("Thêm thất bại.");
    }
  }
);

// DELETE
export const deleteKy = createAsyncThunk(
  "ky_ghi_chi_so/deleteKy",
  async (KeyId) => {
    try {
      const res = await deleteRequest(`ky-ghi-chi-so/delete/${KeyId}`);
      console.log(res);
    } catch (error) {
      console.log({ error });
    }
  }
);

export default kySlice;
