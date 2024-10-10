import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../../../services";
import { toast } from "react-toastify";

const detailPriceSlice = createSlice({
  name: "detailPrice",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDetailPrice.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// fetch api all chi tiet gia
const getAllDetailPrice = createAsyncThunk(
  "detailPrice/getAllDetailPrice",
  async () => {
    try {
      const res = await getRequest("chi-tiet-gia/get-all");
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api add chi tiet gia
const postDetailPrice = createAsyncThunk(
  "detailPrice/postDetailPrice",
  async (values) => {
    try {
      const { keyId, moTaChiTiet, tuSo, denSo, giaCoVat, gia, doiTuongGiaId } =
        values;

      const res = await postRequest("chi-tiet-gia/add", {
        keyId,
        moTaChiTiet,
        tuSo,
        denSo,
        giaCoVat,
        gia,
        doiTuongGiaId,
      });

      toast.success("Thêm chi tiết gia thành công.");

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api update chi tiet gia
const putDetailPrice = createAsyncThunk(
  "detailPrice/putDetailPrice",
  async (values) => {
    try {
      const { keyId, moTaChiTiet, tuSo, denSo, giaCoVat, gia, doiTuongGiaId } =
        values;

      const res = await putRequest("chi-tiet-gia/update", {
        keyId,
        moTaChiTiet,
        tuSo,
        denSo,
        giaCoVat,
        gia,
        doiTuongGiaId,
      });

      toast.success("Cập nhật chi tiết giá thành công.");

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api delete chi tiet gia
const deleteDetailPrice = createAsyncThunk(
  "detailPrice/deleteDetailPrice",
  async (tabBangGia) => {
    try {
      const { keyId } = tabBangGia;

      //   const res = await deleteRequest(`chi-tiet-gia/delete?id=${keyId}`, null);
      const res = await deleteRequest(`chi-tiet-gia/delete/${keyId}`, null);

      toast.success("Xóa đối tượng chi tiết giá thành công.");
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export {
  getAllDetailPrice,
  postDetailPrice,
  putDetailPrice,
  deleteDetailPrice,
};

export default detailPriceSlice;
