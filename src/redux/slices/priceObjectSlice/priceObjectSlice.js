import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../../../services";
import { toast } from "react-toastify";
const PriceObjectSlice = createSlice({
  name: "priceObject",
  initialState: {
    data: [],
    doiTuongGia:[],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApiAllPriceObject.fulfilled, (state, action) => {
      state.data = action.payload || [];
    })
    builder.addCase(fetchApiAllPriceObject2.fulfilled, (state, action) => {
      state.doiTuongGia = action.payload || [];
    })
  },
});

// fetch api all priceObject
const fetchApiAllPriceObject = createAsyncThunk(
  "priceObject/fetchApiAllPriceObject",
  async (queryString) => {
    try {
      var res = await getRequest(`doi-tuong-gia/get-all?${queryString}`);
      var listPriceObject = await getRequest(`danh-sach-doi-tuong-gia/get-all?${queryString}`);

      res.data.data.forEach((item) => {
        listPriceObject.data.data.forEach((item2) => {
          if (item.danhSachDoiTuongGiaId === item2.id) {
            item.mota = item2.moTa;
            item.keyIdDMPriceObject = item2.keyId;
            item.listPriceObjectId = item2.id;
          }
        });
      });

      console.log("res obj price ->", res.data.data);
      // console.log("res list price ->", listPriceObject.data.data);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

const fetchApiAllPriceObject2 = createAsyncThunk(
  "priceObject/fetchApiAllPriceObject2",
  async (queryString) => {
    try {
      const res = await getRequest(`doi-tuong-gia/get-all?${queryString}`);
     return res.data.data
    } catch (error) {
      console.log({ error });
    }
  }
);
  


// fetch api add priceObject
const fetchApiAddPriceObject = createAsyncThunk(
  "priceObject/fetchApiAddPriceObject",
  async (values) => {
    try {
      const { id, keyId, moTa, donViTinh } = values;

      const res = await postRequest("doi-tuong-gia/add", {
        id,
        keyId,
        moTa,
        donViTinh,
      });
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Thêm mới thành công");
      }
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api update priceObject
const fetchApiUpdatePriceObject = createAsyncThunk(
  "priceObject/fetchApiUpdatePriceObject",
  async (values) => {
    try {
      const { keyId, moTa, donViTinh } = values;

      const res = await putRequest(`doi-tuong-gia/update/${keyId}`, {
        keyId,
        moTa,
        donViTinh,
      });
      toast.success("Cập nhật danh mục thành công.");
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api delete priceObject
const fetchApiDeletePriceObject = createAsyncThunk(
  "priceObject/fetchApiDeletePriceObject",
  async (tabListPO) => {
    try {
      const { keyId } = tabListPO;

      const res = await deleteRequest(
        `doi-tuong-gia/delete/${keyId}`,
        // `doi-tuong-gia/delete?id=${id}`,
        null
      );
      toast.success("Xóa thành công.");
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api list priceObject
const fetchApiListPriceObject = createAsyncThunk(
  "priceObject/fetchApiListPriceObject",
  async () => {
    try {
      const res = await getRequest("danh-sach-doi-tuong-gia/get-all");

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export {
  fetchApiAllPriceObject,
  fetchApiAddPriceObject,
  fetchApiUpdatePriceObject,
  fetchApiDeletePriceObject,
  fetchApiListPriceObject,
  fetchApiAllPriceObject2
};

export default PriceObjectSlice;
