import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  getRequestParams,
} from "../../../services";
import { toast } from "react-toastify";

export const invoiceSlice = createSlice({
  name: "invoiceSlice",
  initialState: {
    invoiceList: {},
    contractList: [],
    waterSituation: [],
    isLoadingInvoiceList: false,
    isLoadingContractList: false,
    isLoadingWaterSituation: false,
    queryInvoiceList: "",
    invoiceDetail: null,
    allInvoiceDetail: null,
  },
  reducers: {
    setQueryInvoiceList: (state, action) => {
      state.queryInvoiceList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListInvoice.pending, (state, action) => {
        state.isLoadingInvoiceList = true;
      })
      .addCase(fetchListInvoice.fulfilled, (state, action) => {
        state.invoiceList = action.payload;
        state.isLoadingInvoiceList = false;
      })
      .addCase(fetchFilterListInvoice.pending, (state, action) => {
        state.isLoadingInvoiceList = true;
      })
      .addCase(fetchFilterListInvoice.fulfilled, (state, action) => {
        state.invoiceList = action.payload;
        state.isLoadingInvoiceList = false;
      })
      .addCase(sendSMS.fulfilled, (state, action) => {
        console.log("send SMS done", action.payload);
      })
      .addCase(fetchInvoiceDetail.fulfilled, (state, action) => {
        state.invoiceDetail = action.payload;
      })
      .addCase(fetchUpdateInvoiceDetail.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(fetchListContract.pending, (state, action) => {
        state.isLoadingContractList = true;
      })
      .addCase(fetchListContract.fulfilled, (state, action) => {
        state.contractList = action.payload;
        state.isLoadingContractList = false;
      })
      .addCase(fetchFilterWaterSituation.pending, (state, action) => {
        state.isLoadingWaterSituation = true;
      })
      .addCase(fetchFilterWaterSituation.fulfilled, (state, action) => {
        state.waterSituation = action.payload;
        state.isLoadingWaterSituation = false;
      })
      .addCase(fetchApiGetAllHoaDon.fulfilled, (state, action) => {
        state.allInvoiceDetail = action.payload;
      });
  },
});

//Fetch list invoice by nhaMayId
export const fetchListInvoice = createAsyncThunk(
  "invoice/getListInvoice",
  async (queryString, userId) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(`hoa-don/get-all?${queryString}`);
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

//Fetch list invoice by nhaMayId
export const fetchFilterListInvoice = createAsyncThunk(
  "invoice/getFilterListInvoice",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(`hoa-don/filter?${queryString}`);
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

//Fetch invoice detail for update
export const fetchInvoiceDetail = createAsyncThunk(
  "invoice/getInvoiceDetail",
  async (invoiceId) => {
    try {
      if (invoiceId) {
        console.log(invoiceId);
        const res = await getRequest(
          `hoa-don/get-hoa-don-for-update/${invoiceId}`
        );
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

//update invoice detail
export const fetchUpdateInvoiceDetail = createAsyncThunk(
  "invoice/updateInvoiceDetail",
  async (formUpdate) => {
    try {
      if (formUpdate) {
        console.log(formUpdate);
        const res = await putRequest(`hoa-don/update`, formUpdate);
        console.log(res.data.data);
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          toast.success("Cập nhật hoá đơn thành công!");
        }
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
      toast.error("Cập nhật hoá đơn không thành công!");
    }
  }
);

//send SMS
export const sendSMS = createAsyncThunk("invoice/sendSMS", async (params) => {
  try {
    if (params) {
      console.log(params);
      const res = await postRequest(`mau-tin-sms/sendsms`, params);
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Gửi SMS thành công.");
      }
      console.log(res.data.data);
      return res.data.data;
    }
  } catch (error) {
    console.log({ error });
    toast.error("Gửi SMS không thành công!");
  }
});

export const fetchListContract = createAsyncThunk(
  "invoice/getListContract",
  async (queryString, userId) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(`hop-dong/get-all?${queryString}`);
        console.log("data contract:", res.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
export const fetchFilterWaterSituation = createAsyncThunk(
  "invoice/filterWaterSituation",
  async (postData) => {
    try {
      console.log("postData", postData);
      const res = await getRequest(
        `chi-so-dong-ho/filter-xem-tinh-hinh-nuoc?SoHopDong=${postData.SoHopDong}&MaKH=${postData.MaKH}&TuNgay=${postData.TuNgay}&DenNgay=${postData.DenNgay}&TenKH=${postData.TenKH}&TuyenDocId=${postData.TuyenDocId}&DiaChi=${postData.DiaChi}&NguoiQuanLyId=${postData.NguoiQuanLyId}&${postData.NhaMayIds}&pageNumber=1&pageSize=10`
      );
      console.log("data tình hình nước:", res.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const approveInvoice = createAsyncThunk("invoice/approveInvoice", async (values) => {
  try {
    if (values) {
      const {thangTaoHoaDon, tenTuyenDoc} = values
      const res = await putRequest(`hoa-don/duyet-hoa-don`, {thangTaoHoaDon, tenTuyenDoc});
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Duyệt Thành Công");
        return res.data.data;
      } else {
        throw new Error(`Request failed with status`);
      }
    }
  } catch (error) {
    console.log({ error });
    toast.error("Duyệt Không Thành Công!");
  }
});

export const paymentInvoice = createAsyncThunk("invoice/paymentInvoice", async (values) => {
  try {
    if (values) {
      const {hoaDonId, nguoiThuTienId, hinhThucThanhToan, ghiChu} = values
      const res = await putRequest(`hoa-don/thanh-toan-hoa-don`, {hoaDonId, nguoiThuTienId, hinhThucThanhToan, ghiChu});
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Thanh Toán Thành Công");
      }
      return res.data.data;
    }
  } catch (error) {
    console.log({ error });
    toast.error("Thanh Toán Không Thành Công!");
  }
});

export const fetchApiGetAllHoaDon = createAsyncThunk(
  "readingIndexSlice/fetchApiGetAllHoaDon",
  async (values) => {
    try {
      if (values) {
        const {
          SoTrang,
          SoLuong,
          NhaMayID,
          ThangHoaDon,
          CanBoThuID,
          TuyenDocID,
          MaHopDong,
          TenKhachHang,
          SeriHoaDonID,
          SoHoaDon_From,
          SoHoaDon_To,
          TrangThaiHoaDon,
          SoDienThoai
        } = values;
        

        const res = await getRequestParams(
          `hoa-don/get-all-hoa-don-ver-2`,
          {
            SoTrang,
            SoLuong,
            NhaMayID,
            ThangHoaDon,
            CanBoThuID,
            TuyenDocID,
            MaHopDong,
            TenKhachHang,
            SeriHoaDonID,
            SoHoaDon_From,
            SoHoaDon_To,
            TrangThaiHoaDon,
            SoDienThoai
          }
        );


        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);
