import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services";
import { toast } from "react-toastify";
const initialState = {
  listPhongBan: [],
};
const phongBanSlice = createSlice({
  name: "phongBanSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPhongBan.fulfilled, (state, action) => {
      state.listPhongBan = action.payload;
    });
  },
});

export const fetchPhongBan = createAsyncThunk(
  "phongBanSlice/getPhongBan",
  async () => {
    try {
      const res = await getRequest(`phongban/get-all`);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchCreatePhongBan = createAsyncThunk(
  "phongBanSlice/fetchCreatePhongBan",
  async (values) => {
    try {
      const { name, description } = values;

      await postRequest(`phongban/add`, {
        name,
        description,
      });

      toast.success("Tạo thành công");
    } catch (error) {
      toast.error("Tạo thất bại");
    }
  }
);

export const fetchEditPhongBan = createAsyncThunk(
  "phongBanSlice/fetchEditPhongBan",
  async (value) => {
    try {
      let { id, data } = value;

      const res = await putRequest("phongban/update", {
        id: id,
        data: {
          id: id,
          name: data.name,
          description: data.description,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success("Cập nhật thành công");
      }
      return res.data.data;
    } catch (error) {
      // toast.error("Cập nhật thất bại");
      console.log({ error });
    }
  }
);

export const fetchDeletePhongBan = createAsyncThunk(
  "phongBanSlice/fetchDeletePhongBan",
  async (keyId) => {
    try {
      console.log(keyId);
      await deleteRequest(`phongban/delete/${keyId}`);
      toast.success("Xoá thành công");
    } catch (error) {
      toast.error("Xoá thất bại");
      console.log({ error });
    }
  }
);

export default phongBanSlice;
