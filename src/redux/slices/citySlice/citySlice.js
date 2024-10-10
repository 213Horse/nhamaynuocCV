import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services";
import { toast } from "react-toastify";

const initialState = {
  listCities: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
};

export const citySlice = createSlice({
  name: "tinh",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCities.fulfilled, (state, action) => {
        state.listCities = action.payload || [];
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.isAddedSuccess = true;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.isDeletedSuccess = true;
      });
  },
});

export const getAllCities = createAsyncThunk("tinh/getAllCity", async () => {
  try {
    const res = await getRequest(`tinh/get-all`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const addCity = createAsyncThunk("tinh/addCity", async (values) => {
  try {
    const { keyId, ten } = values;
    console.log("🚀 ~ file: citySlice.js:50 ~ values:", values);
    const res = await postRequest(`tinh/add`, {
      id: keyId,
      keyId: keyId,
      ten: ten,
      code: keyId,
      codeName: keyId,
      cap: keyId,
      phoneCode: keyId,
    });
    if (res.data.statusCode === 200 || res.data.statusCode === 201) {
      toast.success("Thêm mới thành công");
    }
    return res.data.data;
  } catch (error) {
    toast.error("Thêm mới thất bại");
    console.log(error);
  }
});

export const updateCity = createAsyncThunk(
  "tinh/updateCity",
  async (values) => {
    try {
      const { codeName, keyId, ten } = values;
      console.log(values);
      const res = await putRequest(`tinh/update`, {
        keyId: keyId,
        data: {
          id: keyId,
          keyId: keyId,
          ten: ten,
          code: keyId,
          codeName: codeName,
          cap: keyId,
          phoneCode: keyId,
        },
      });
      toast.success("Đã cập nhật thành công");
      return res.data.data;
    } catch (error) {
      toast.error("Cập nhật thất bại");
      console.log(error);
    }
  }
);

export const deleteCity = createAsyncThunk("tinh/deleteCity", async (keyId) => {
  try {
    const res = await deleteRequest(`tinh/delete/${keyId}`);
    toast.success("Xoá thành công");
    console.log(res);
  } catch (error) {
    toast.error("Xoá thất bại");
    console.log(error);
  }
});

export default citySlice;
