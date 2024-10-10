import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../../services";
import { toast } from "react-toastify";
import { message } from "antd";

const priceObjectSlice = createSlice({
  name: "priceObject",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPriceObject.fulfilled, (state, action) => {
        state.ListPriceOject = action.payload;
      })
      .addCase(postPriceObject.fulfilled, (state, action) => {
        state.isAddedSuccess = action.payload;
      })
      .addCase(deletePriceObject.fulfilled, (state, action) => {
        state.isDeletedSuccess = true;
      });
  },
});

// fetch api all bang gia
const getAllPriceObject = createAsyncThunk(
  "priceObject/getAllPriceObject",
  async () => {
    try {
      const res = await getRequest("doi-tuong-gia/get-all");
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api add region
const postPriceObject = createAsyncThunk(
  "priceObject/postPriceObject",
  async (values) => {
    try {
      const {
        keyId,
        ngayBatDau,
        ngayKetThuc,
        vat,
        bvmt,
        phiBvmt,
        dtTinhGia,
        kieuTinh,
        coToiThieu,
        tinhTu,
        toiThieu,
        phiDuyTriId,
        danhSachDoiTuongGiaId,
      } = values;

      const res = await postRequest("doi-tuong-gia/add", {
        keyId,
        ngayBatDau,
        ngayKetThuc,
        vat,
        bvmt,
        phiBvmt,
        dtTinhGia,
        kieuTinh,
        coToiThieu,
        tinhTu,
        toiThieu,
        phiDuyTriId,
        danhSachDoiTuongGiaId,
      });

      toast.success("Thêm đối tượng giá thành công.");

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api update region
const putPriceObject = createAsyncThunk(
  "priceObject/putPriceObject",
  async (values) => {
    try {
      const {
        keyId,
        ngayBatDau,
        ngayKetThuc,
        vat,
        bvmt,
        phiBvmt,
        dtTinhGia,
        kieuTinh,
        coToiThieu,
        tinhTu,
        toiThieu,
        phiDuyTriId,
        danhSachDoiTuongGiaId,
      } = values;

      const res = await postRequest("doi-tuong-gia/update", {
        keyId,
        ngayBatDau,
        ngayKetThuc,
        vat,
        bvmt,
        phiBvmt,
        dtTinhGia,
        kieuTinh,
        coToiThieu,
        tinhTu,
        toiThieu,
        phiDuyTriId,
        danhSachDoiTuongGiaId,
      });

      toast.success("Cập nhật đổi tượng giá thành công.");

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api delete region
const deletePriceObject = createAsyncThunk(
  "priceObject/deletePriceObject",
  async (keyId) => {
    try {
      const res = await postRequest(`doi-tuong-gia/delete/${keyId}`);
      console.log(res);
      if (res.data.statusCode === 202)
        message.success({ content: "Xóa thành công" });
    } catch (error) {
      console.log({ error });
    }
  }
);

export {
  getAllPriceObject,
  postPriceObject,
  putPriceObject,
  deletePriceObject,
};

export default priceObjectSlice;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getRequest, postRequest } from "../../../services";
// import { toast } from "react-toastify";
// import { message } from "antd";

// const initialState = {
//   ListPriceOject: [],
//   isAddedSuccess: false,
//   isDeletedSuccess: false,
// };
// const priceObjectSlice = createSlice({
//   name: "PriceObject",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllPriceObject.fulfilled, (state, action) => {
//         state.ListPriceOject = action.payload;
//       })
//       .addCase(postPriceObject.fulfilled, (state, action) => {
//         state.isAddedSuccess = action.payload;
//       })
//       .addCase(deletePriceObject.fulfilled, (state, action) => {
//         state.isDeletedSuccess = true;
//       });
//   },
// });

// // fetch api all bang gia
// const getAllPriceObject = createAsyncThunk(
//   "PriceObject/getAllPriceObject",
//   async () => {
//     try {
//       const res = await getRequest("doi-tuong-gia/get-all");
//       return res.data.data;
//     } catch (error) {
//       console.log({ error });
//     }
//   }
// );

// // fetch api add region
// const postPriceObject = createAsyncThunk(
//   "PriceObject/postPriceObject",
//   async (values) => {
//     try {
//       const {
//         keyId,
//         ngayBatDau,
//         ngayKetThuc,
//         vat,
//         bvmt,
//         phiBvmt,
//         dtTinhGia,
//         kieuTinh,
//         coToiThieu,
//         tinhTu,
//         toiThieu,
//         phiDuyTriId,
//         danhSachDoiTuongGiaId,
//       } = values;

//       const res = await postRequest("doi-tuong-gia/add", {
//         keyId,
//         ngayBatDau,
//         ngayKetThuc,
//         vat,
//         bvmt,
//         phiBvmt,
//         dtTinhGia,
//         kieuTinh,
//         coToiThieu,
//         tinhTu,
//         toiThieu,
//         phiDuyTriId,
//         danhSachDoiTuongGiaId,
//       });

//       toast.success("Thêm đối tượng giá thành công.");

//       return res.data.data;
//     } catch (error) {
//       console.log({ error });
//     }
//   }
// );

// // fetch api update region
// const putPriceObject = createAsyncThunk(
//   "PriceObject/putPriceObject",
//   async (values) => {
//     try {
//       const {
//         keyId,
//         ngayBatDau,
//         ngayKetThuc,
//         vat,
//         bvmt,
//         phiBvmt,
//         dtTinhGia,
//         kieuTinh,
//         coToiThieu,
//         tinhTu,
//         toiThieu,
//         phiDuyTriId,
//         danhSachDoiTuongGiaId,
//       } = values;

//       const res = await postRequest("doi-tuong-gia/update", {
//         keyId,
//         ngayBatDau,
//         ngayKetThuc,
//         vat,
//         bvmt,
//         phiBvmt,
//         dtTinhGia,
//         kieuTinh,
//         coToiThieu,
//         tinhTu,
//         toiThieu,
//         phiDuyTriId,
//         danhSachDoiTuongGiaId,
//       });

//       toast.success("Cập nhật đổi tượng giá thành công.");

//       return res.data.data;
//     } catch (error) {
//       console.log({ error });
//     }
//   }
// );

// // fetch api delete region
// const deletePriceObject = createAsyncThunk(
//   "PriceObject/deletePriceObject",
//   async (keyId) => {
//     try {
//       const res = await postRequest(`doi-tuong-gia/delete/${keyId}`);
//       console.log(res);
//       if (res.data.statusCode === 202)
//         message.success({ content: "Xóa thành công" });
//     } catch (error) {
//       console.log({ error });
//     }
//   }
// );

// export {
//   getAllPriceObject,
//   postPriceObject,
//   putPriceObject,
//   deletePriceObject,
// };

// export default priceObjectSlice;
