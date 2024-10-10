import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../../../services";
import { toast } from "react-toastify";

const priceListObjectSlice = createSlice({
  name: "priceListObject",
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiAllPriceListObject.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiAllPriceListObject.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.isLoading = false;
      });
  },
});

// fetch api all priceObject
const fetchApiAllPriceListObject = createAsyncThunk(
  "priceListObject/fetchApiAllPriceListObject",
  async (queryString) => {
    try {
      const res = await getRequest(
        `danh-sach-doi-tuong-gia/get-all?${queryString}`
      );
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api add priceObject
const fetchApiAddPriceListObject = createAsyncThunk(
  "priceListObject/fetchApiAddPriceListObject",
  async ({values, queryString}) => {
    try {
      const { id, keyId,kyHieu, moTa, donViTinh } = values;

      const res = await postRequest(`danh-sach-doi-tuong-gia/add?${queryString}`, {
        keyId: "",
        kyHieu: kyHieu,
        moTa: moTa,
        donViTinh: donViTinh,
      });
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Thêm thành công.");
      }

      return res.data.data;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }
);

// fetch api update priceObject
const fetchApiUpdatePriceListObject = createAsyncThunk(
  "priceListObject/fetchApiUpdatePriceListObject",
  async (values) => {
    try {
      const { prevKeyId, keyId, moTa, donViTinh, queryString, kyHieu } = values;

      const res = await putRequest(`danh-sach-doi-tuong-gia/update?${queryString}`, {
        keyId: prevKeyId,
        data: {
          keyId: "",
          moTa: moTa,
          kyHieu: kyHieu,
          donViTinh: donViTinh,
        },
      });

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Cập nhật danh mục thành công.");
      }
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api delete priceObject
const fetchApiDeletePriceListObject = createAsyncThunk(
  "priceListObject/fetchApiDeletePriceListObject",
  async (tabListPO) => {
    try {
      const { keyId } = tabListPO;

      const res = await deleteRequest(
        `danh-sach-doi-tuong-gia/delete/${keyId}`,
        // `danh-sach-doi-tuong-gia/delete?id=${id}`,
        null
      );
      toast.success("Xóa thành công.");
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);
// fetch api search PaymentMethod by id
const fetchApiSearchByIdPriceListObject = createAsyncThunk(
  "priceListObject/fetchApiSearchByIdPriceListObject",
  async (idPriceListObject) => {
    try {
      const res = await getRequest(
        `danh-sach-doi-tuong-gia/get-singe?id=${idPriceListObject}`
      );

      console.log("res search", res.data.data);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);
export {
  fetchApiAllPriceListObject,
  fetchApiAddPriceListObject,
  fetchApiUpdatePriceListObject,
  fetchApiDeletePriceListObject,
  fetchApiSearchByIdPriceListObject,
};

export default priceListObjectSlice;
