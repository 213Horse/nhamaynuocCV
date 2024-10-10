import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services";
import { toast } from "react-toastify";
import apolloClient from "../../../config/apolloClient";
import { GetWardQuery } from "../../../graphql/wards/wardQuery";

const wardSlice = createSlice({
  name: "ward",
  initialState: {
    data: [],
    isLoading: false,
    getDistrictById: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiAllWard.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiAllWard.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.isLoading = false;
      })
      .addCase(fetchApiGetDistrictById.fulfilled, (state, action) => {
        state.getDistrictById = action.payload;
      });
  },
});

// fetch api all Ward
const fetchApiAllWard = createAsyncThunk("ward/fetchApiAllWard", async () => {
  try {
    const { data } = await apolloClient.query({
      query: GetWardQuery,
      variables: {
        first: 100,
      },
    });

    console.log(data);

    return data?.GetPhuongXas?.nodes || [];
  } catch (error) {
    console.log({ error });
  }
});

// fetch api add Ward
const fetchApiAddWard = createAsyncThunk(
  "ward/fetchApiAddWard",
  async (values) => {
    try {
      const { keyId, ten, quanHuyenId } = values;

      const res = await postRequest("xa/add", {
        keyId,
        ten,
        code: keyId,
        codename: keyId,
        cap: keyId,
        shortCodename: keyId,
        quanHuyenId,
      });
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Thêm thành công.");
      }
      return res.data.data;
    } catch (error) {
      toast.error("Tên phường/xã đã tồn tại!");
      console.log({ error });
    }
  }
);

// fetch api update Ward
const fetchApiUpdateWard = createAsyncThunk(
  "ward/fetchApiUpdateWard",
  async (values) => {
    try {
      const { keyId, ten, quanHuyenId, prevKeyId } = values;

      const res = await putRequest(`xa/update`, {
        keyId: prevKeyId,
        data: {
          keyId,
          ten,
          code: keyId,
          codename: keyId,
          cap: keyId,
          shortCodename: keyId,
          quanHuyenId,
        },
      });
      toast.success("Cập nhật thành công.");

      return res.data.data;
    } catch (error) {
      toast.error("Cập nhật thất bại.");
      console.log({ error });
    }
  }
);

// fetch api delete Ward
const fetchApiDeleteWard = createAsyncThunk(
  "ward/fetchApiDeleteWard",
  async (keyId) => {
    try {
      const res = await deleteRequest(`xa/delete/${keyId}`);

      toast.success("Xóa thành công.");

      return res.data.data;
    } catch (error) {
      toast.error("Xóa thất bại.");
      console.log({ error });
    }
  }
);

// fetch api search Ward by id
const fetchApiSearchByIdWard = createAsyncThunk(
  "ward/fetchApiSearchByIdWard",
  async (idWard) => {
    try {
      const res = await getRequest(`xa/get-singe?id=${idWard}`);

      console.log("res search", res.data.data);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// get huyen by id
const fetchApiGetDistrictById = createAsyncThunk(
  "ward/fetchApiGetDistrictById",
  async (districtId) => {
    try {
      if (districtId) {
        const res = await getRequest(`xa/get-by-huyenid/${districtId}`);

        console.log("res xa by id ->", res.data.data);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export {
  fetchApiAllWard,
  fetchApiAddWard,
  fetchApiUpdateWard,
  fetchApiDeleteWard,
  fetchApiSearchByIdWard,
  fetchApiGetDistrictById,
};

export default wardSlice;
