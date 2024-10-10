import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services";
import apolloClient from "../../../config/apolloClient";
import { GetQuanHuyens } from "../../../graphql/district/districtQuery";
import { toast } from "react-toastify";

const districtSlice = createSlice({
  name: "district",
  initialState: {
    data: [],
    getByThanhPhoId: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiGetAllDistrict.fulfilled, (state, action) => {
        state.data = action.payload || [];
      })
      .addCase(fetchApiGetCityById.fulfilled, (state, action) => {
        state.getByThanhPhoId = action.payload || [];
      });
  },
});

// get all (huyện)
const fetchApiGetAllDistrict = createAsyncThunk(
  "district/fetchApiGetAllDistrict",
  async () => {
    try {
      const { data } = await apolloClient.query({
        query: GetQuanHuyens,
        variables: {
          first: 100,
        },
      });
      return data.GetQuanHuyens.nodes;
    } catch (error) {
      console.log({ error });
    }
  }
);

// get tinh by id
const fetchApiGetCityById = createAsyncThunk(
  "district/fetchApiGetCityById",
  async (cityId) => {
    try {
      // const formatId = cityId.split("\r\n");

      // console.log("formatId", formatId);
      // console.log("formatId", cityId);

      if (cityId) {
        const res = await getRequest(`huyen/get-by-tinhid/${cityId}`);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchAddDistrict = createAsyncThunk(
  "fetchAddDistrict",
  async (values) => {
    try {
      const { keyId, ten, tinhThanhId } = values;
      const res = await postRequest("huyen/add", {
        keyId: keyId,
        ten: ten,
        code: keyId,
        codename: keyId,
        cap: keyId,
        shortCodename: keyId,
        tinhThanhId: tinhThanhId,
      });
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Thêm thành công");
      }
      return res.data.data;
    } catch (error) {
      toast.error("Thêm thất bại");
      console.log({ error });
    }
  }
);

export const fetchEditDistrict = createAsyncThunk(
  "fetchEditDistrict",
  async (values) => {
    try {
      const { prevKeyId, keyId, ten, tinhThanhId } = values;
      console.log(values);
      const res = await putRequest("huyen/update", {
        keyId: prevKeyId,
        data: {
          keyId: keyId,
          ten: ten,
          code: keyId,
          codename: keyId,
          cap: keyId,
          shortCodename: keyId,
          tinhThanhId: tinhThanhId,
        },
      });

      toast.success("Cập nhật thành công");
      return res.data.data;
    } catch (error) {
      toast.error("Cập nhật thất bại");
      console.log({ error });
    }
  }
);

export const fetchDeleteDistrict = createAsyncThunk(
  "fetchDeleteDistrict",
  async (keyId) => {
    try {
      console.log(keyId);
      await deleteRequest(`huyen/delete/${keyId}`);
      toast.success("Xoá thành công");
    } catch (error) {
      toast.error("Xoá thất bại");
      console.log({ error });
    }
  }
);

export { fetchApiGetAllDistrict, fetchApiGetCityById };

export default districtSlice;
