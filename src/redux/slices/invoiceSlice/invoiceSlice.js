import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  getRequestParams,
  postRequestParams,
} from "../../../services";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export const invoiceSlice = createSlice({
  name: "invoiceSlice",
  initialState: {
    invoiceList: {},
    invoiceList2: {},
    invoiceListModal: [],
    contractList: [],
    waterSituation: [],
    isLoadingInvoiceList: false,
    isLoadingInvoiceListModal: false,
    isLoadingContractList: false,
    isLoadingWaterSituation: false,
    queryInvoiceList: "",
    invoiceDetail: null,
    allInvoiceDetail: null,
    workStatictis: [],
    workStatictisDetail: [],
    thangNam: null,
    viewInvoiceList: [],
    thangNamInvoice: null,
    thongBaoSMS: [],
    invoiceList2: [],
    isLoadingSMS: false,
    tuyenDocId: null,
    writeIndexList: [],
    dataForMenu: [],
    filterData: [],
    writeIndexDetail: [],
    statisticForChart: null,
    smsTypes:[]
  },
  reducers: {
    setQueryInvoiceList: (state, action) => {
      state.queryInvoiceList = action.payload;
    },
    setThangNamInvoice: (state, action) => {
      state.thangNamInvoice = action.payload;
    },
    setTuyenDocIdInvoice: (state, action) => {
      state.tuyenDocId = action.payload;
    },
    resetSMS: (state) => {
      state.thangNam = null;
      state.invoiceListModal = [];
    },
    setThangNam: (state, action) => {
      state.thangNam = action.payload;
    },
    resetWorkStatistics: (state) => {
      state.workStatictis = [];
      state.workStatictisDetail = [];
    },
    resetWorkStatistics2: (state) => {
      state.workStatictisDetail = [];
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
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
      .addCase(fetchFilterListInvoice2.pending, (state, action) => {
        state.isLoadingInvoiceList = true;
      })
      .addCase(paymentInvoice.fulfilled, (state, action) => {
        state.isLoadingInvoiceList = false;
      })
      .addCase(paymentInvoice.pending, (state, action) => {
        state.isLoadingInvoiceList = true;
      })
      .addCase(fetchFilterListInvoice2.fulfilled, (state, action) => {
        state.invoiceList2 = action.payload;
        state.isLoadingInvoiceList = false;
      })
      .addCase(fetchFilterListInvoiceModal.pending, (state, action) => {
        state.isLoadingInvoiceListModal = true;
      })
      .addCase(fetchFilterListInvoiceModal.fulfilled, (state, action) => {
        state.invoiceListModal = action.payload;
        state.isLoadingInvoiceListModal = false;
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
      })
      .addCase(fetchListWorkStatistic.fulfilled, (state, action) => {
        state.workStatictis = action.payload;
      })
      .addCase(fetchListWriteIndex.fulfilled, (state, action) => {
        state.writeIndexList = action.payload;
      })
      .addCase(fetchViewInvoiceList.fulfilled, (state, action) => {
        state.viewInvoiceList = action.payload;
      })
      .addCase(fetchListWorkStatisticDetail.fulfilled, (state, action) => {
        state.workStatictisDetail = action.payload;
      })
      .addCase(fetchBaoCaoSMS.pending, (state, action) => {
        state.isLoadingSMS = true;
      })
      .addCase(fetchBaoCaoSMS.fulfilled, (state, action) => {
        state.isLoadingSMS = false;
        state.thongBaoSMS = action.payload;
      })
      .addCase(fetchDataForMenuInvoice.fulfilled, (state, action) => {
        state.dataForMenu = action.payload;
      })
      .addCase(fetchListWriteIndexDetail.fulfilled, (state, action) => {
        state.writeIndexDetail = action.payload;
      })
      .addCase(fetchStatisticInvoice.fulfilled, (state, action) => {
        state.statisticForChart = action.payload;
      })
      .addCase(getSMSType.fulfilled, (state, action) => {
        state.smsTypes = action.payload;
      })
  },
});

export const fetchListWorkStatistic = createAsyncThunk(
  "invoice/fetchListWorkStatistic",
  async (values) => {
    try {
      let { UserId, ThangTaoHoaDon, nhaMayIds } = values;
      ThangTaoHoaDon = dayjs(ThangTaoHoaDon).format("MM/YYYY");
      const res = await getRequestParams(
        `hoa-don/get-report-hoa-don-for-mobile`,
        { UserId, ThangTaoHoaDon, nhaMayIds }
      );
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchListWriteIndex = createAsyncThunk(
  "invoice/fetchListWriteIndex",
  async (values) => {
    try {
      let { userId, thangGhi, nhaMayIds } = values;
      thangGhi = dayjs(thangGhi).format("MM/YYYY");
      const res = await getRequestParams(
        `chi-so-dong-ho/get-report-ghi-chi-so`,
        { userId, thangGhi, nhaMayIds }
      );

      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchListWorkStatisticDetail = createAsyncThunk(
  "invoice/fetchListWorkStatisticDetail",
  async (values) => {
    try {
      let { UserId, ThangTaoHoaDon, nhaMayIds } = values;
      // ThangTaoHoaDon = dayjs(ThangTaoHoaDon).format("DD/MM/YYYY")
      const res = await getRequestParams(
        `hoa-don/get-detail-report-hoa-don-for-mobile?`,
        { UserId, ThangTaoHoaDon, nhaMayIds }
      );
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchListWriteIndexDetail = createAsyncThunk(
  "invoice/fetchListWriteIndexDetail",
  async (values) => {
    try {
      let { UserId, date, nhaMayIds } = values;
      // let { date } = values;
      // ThangTaoHoaDon = dayjs(ThangTaoHoaDon).format("DD/MM/YYYY")
      const res = await getRequestParams(
        `chi-so-dong-ho/get-report-detail-for-chi-so-dong-ho?`,
        { UserId, date, nhaMayIds }
      );
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

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

export const fetchFilterListInvoice = createAsyncThunk(
  "invoice/getFilterListInvoice",
  async (queryString) => {
    try {
      if (queryString) {
        let { listHoaDonId } = queryString;
        const res = await getRequest(`hoa-don/filter?${queryString}`, {
          listHoaDonId,
        });
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {}
  }
);

export const fetchStatisticInvoice = createAsyncThunk(
  "invoice/fetchStatisticInvoice",
  async (queryString) => {
    try {
      if (queryString) {
        let { listHoaDonId } = queryString;
        const res = await getRequest(
          `hoa-don/thong-ke-data-filter?${queryString}`,
          {
            listHoaDonId,
          }
        );
        return res.data.data;
      }
    } catch (error) {}
  }
);

export const fetchFilterListInvoice2 = createAsyncThunk(
  "invoice/fetchFilterListInvoice2",
  async (queryString) => {
    try {
      if (queryString) {
        let { listHoaDonId } = queryString;
        const res = await getRequest(`hoa-don/filter?${queryString}`, {
          listHoaDonId,
        });
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {}
  }
);

export const fetchViewInvoiceList = createAsyncThunk(
  "invoice/getViewInvoiceList",
  async (values, thunkAPI) => {
    try {
      if (values) {
        console.log(values);
        // Assuming values is an array or an object with the necessary data
        const res = await postRequest(`hoa-don/get-hoa-don-dong-loat`, values);
        console.log(res.data.data);

        // Assuming res.data.data is an array, if not adjust accordingly
        const responseData = res.data.data.map((data) => {
          // Modify this part based on the structure of values and what you want to extract
          return data.propertyToExtract;
        });

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchFilterListInvoiceModal = createAsyncThunk(
  "invoice/fetchFilterListInvoiceModal",
  async (data) => {
    try {
      if (data) {
        let {
          ThangTaoHoaDon,
          TuyenDocId,
          TenKhachHang,
          TrangThaiHoaDon,
          MaKhachHang,
          NhaMayIds,
        } = data;

        const res = await getRequestParams(`hoa-don/filter`, {
          ThangTaoHoaDon: dayjs(ThangTaoHoaDon).format("MM/YYYY"),
          TuyenDocId,
          TenKhachHang,
          TrangThaiHoaDon,
          MaKhachHang,
          "invoiceParameter.PageSize": 10000,
          NhaMayIds,
        });

        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchFilterListInvoiceModalSingle = createAsyncThunk(
  "invoice/fetchFilterListInvoiceModalSingle",
  async (data) => {
    try {
      if (data) {
        let {
          ThangTaoHoaDon,
          TuyenDocId,
          TenKhachHang,
          TrangThaiHoaDon,
          NhaMayIds,
        } = data;

        const res = await getRequestParams(`hoa-don/filter`, {
          ThangTaoHoaDon: dayjs(ThangTaoHoaDon).format("MM/YYYY"),
          TuyenDocId,
          TenKhachHang,
          TrangThaiHoaDon,
          NhaMayIds,
        });

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

export const getSMSType = createAsyncThunk("invoice/getSMSType", async () => {
  try {
    const res = await getRequest(`mau-tin-sms/get-all`);

    return res.data.data;
  } catch (error) {
    console.log({ error });
    toast.error("Gửi SMS không thành công!");
  }
});
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

export const sendSMSMultiple = createAsyncThunk(
  "invoice/sendSMSMultiple",
  async (values) => {
    try {
      if (values) {
        let {
          listHoaDonId,
          thangTaoSoDoc,
          nhaMayId,
          nguoiGuiId,
          tenNguoiGui,
          guiLai,
          mauTinNhanId,
          mauTieuDeCustom,
          noiDungCustom,
        } = values;
        const res = await postRequest(`mau-tin-sms/sendsms-v2`, {
          listHoaDonId,
          thangTaoSoDoc,
          nhaMayId,
          nguoiGuiId,
          tenNguoiGui,
          guiLai,
          mauTinNhanId,
          mauTieuDeCustom,
          noiDungCustom,
        });
        console.log(res);
        if(res.status === 200){
          toast.success("Gửi SMS thành công")
        }
        return res.data.data;
      }
    } catch (error) {}
  }
);

export const sendSMSSingle = createAsyncThunk(
  "invoice/sendSMSSingle",
  async (values) => {
    try {
      if (values) {
        let { soDocChiSoId, nguoiGuiId, thangTaoSoDoc, nhaMayId } = values;
        const res = await postRequest(`mau-tin-sms/sendsms-by-so-doc-id`, {
          soDocChiSoId: soDocChiSoId[0],
          // loaiMauTin,
          thangTaoSoDoc,
          nhaMayId,
          nguoiGuiId,
        });
        // if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        //   toast.success("Gửi SMS thành công.");
        // }
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      // console.log({ error });
      // toast.error("Gửi SMS không thành công!");
    }
  }
);

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

export const fetchDataForMenuInvoice = createAsyncThunk(
  "invoice/fetchDataForMenuInvoice",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(
          `hoa-don/fetch-data-for-menu-hoa-don?${queryString}`
        );
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

export const approveInvoice = createAsyncThunk(
  "invoice/approveInvoice",
  async (values) => {
    try {
      if (values) {
        const { thangTaoHoaDon, tenTuyenDoc } = values;
        const res = await putRequest(`hoa-don/duyet-hoa-don`, {
          thangTaoHoaDon,
          tenTuyenDoc,
        });
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          toast.success("Duyệt Thành Công");
          return res.data.data;
        } else {
          throw new Error(`${res.data.data}`);
        }
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(`${error}`);
    }
  }
);

export const paymentInvoice = createAsyncThunk(
  "invoice/paymentInvoice",
  async (values) => {
    try {
      if (values) {
        const { hoaDonId, hinhThucThanhToan, nguoiThuTienId, ghiChu } = values;
        const res = await putRequest(`hoa-don/thanh-toan-hoa-don`, {
          hoaDonId,
          hinhThucThanhToan,
          nguoiThuTienId,
          ghiChu,
        });
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          toast.success("Thanh Toán Thành Công");
        }
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
      toast.error("Thanh Toán Không Thành Công!");
    }
  }
);

export const cancelPaymentInvoice = createAsyncThunk(
  "invoice/paymentInvoice",
  async (values) => {
    try {
      if (values) {
        const { hoaDonId, ghiChu } = values;
        const res = await putRequest(
          `hoa-don/update-thanh-toan-hoa-don-to-chua-thanh-toan`,
          { hoaDonId, ghiChu }
        );
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          toast.success("Hủy Thanh Toán Thành Công");
        }
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
      toast.error("Hủy Thanh Toán Không Thành Công!");
    }
  }
);

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
          SoDienThoai,
        } = values;

        const res = await getRequestParams(`hoa-don/get-all-hoa-don-ver-2`, {
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
          SoDienThoai,
        });

        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

export const fetchBaoCaoSMS = createAsyncThunk(
  "invoice/fetchBaoCaoSMS",
  async (values) => {
    try {
      if (values) {
        const { TuNgay, DenNgay, trangthai, nhaMayIds, pageNumber, pageSize } =
          values;
        const res = await postRequest(
          `lich-su-sms/get-report-sms?${TuNgay ? `TuNgay=${TuNgay}` : ""}${
            DenNgay ? `&DenNgay=${DenNgay}` : ""
          }${
            trangthai === null ? "" : `&trangthai=${trangthai}`
          }&${nhaMayIds}&pageNumber=${pageNumber}&pageSize=${pageSize}`
        );

        console.log("res", res);

        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);
