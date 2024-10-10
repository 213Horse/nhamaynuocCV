import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRequest, postRequest, putRequest } from "../../../services";
import { toast } from "react-toastify";

const masterClockSlice = createSlice({
  name: "masterClock",
  initialState: {
    data: [],
    isLoading: false,
    rowSelected: null, // object
  },
  reducers: {
    setRowSelected: (state, action) => {
      state.rowSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiGetMasterClock.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiGetMasterClock.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        } else {
          state.data = {};
        }
        state.isLoading = false;
      })
      .addCase(fetchApiGetMasterClock.rejected, (state, action) => {
        console.log("ac.pay reject ->");
        state.data = {};
        state.isLoading = false;
      })
      .addCase(fetchApiCreateMasterClock.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        }
      })
      .addCase(fetchApiCreateMasterClock.rejected, (state, action) => {
        toast.error("Không tìm thấy tuyến đọc.");
      });
  },
});

// get (Đồng hồ tổng)
const fetchApiGetMasterClock = createAsyncThunk(
  "masterClock/fetchApiGetMasterClock",
  async (factoryQueryString, { rejectWithValue }) => {
    try {
      if (factoryQueryString) {
        const res = await getRequest(
          `dong-ho-tong/get-by/nha-may-id?${factoryQueryString}`
        );

        console.log("res dh tong ->", res.data);
        console.log("factoryQueryString ->", factoryQueryString);
        if (res?.data?.statusCode === 200) {
          return res.data;
        }
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.Message);
    }
  }
);

// create master clock
const fetchApiCreateMasterClock = createAsyncThunk(
  "masterClock/fetchApiCreateMasterClock",
  async ({ values, nhaMayId }, { rejectWithValue }) => {
    try {
      const {
        tenDongHo,
        trangThaiSuDung,
        keyId,
        loaiDongHo, // ko
        loaiDongHoId, // ko
        seriDongHo,
        ngaySuDung,
        donViHC, // ko
        nguoiQuanLyId,
        tuyenDocId,
        dongHoChaId,
        soThuTu, // ko
        chiSoDau,
        chiSoCuoi,
        seriChi,
        diaChi,
        toaDo, // ko
        kinhDo,
        viDo,
        nuocSX,
        hangSX,
        kieuDongHo,
        duongKinh,
        hopBaoVe,
        viTriLapDat,
        ngayKiemDinh,
        hieuLucKD,
        lyDoKiemDinh, // ko
        vanMotChieu, // ko
        trangThaiDHLap,
        soHieu,
        soPhieuThay,
        lyDoThay,
        lyDoHuy, // ko
        maDHThay, // ko
        nguoiThayId, // ko
        khuyenMai,
        ongDan, // ko
        daiKhoiThuy, // ko
        loaiDiemId, // ko
        hopDongId, // get ở ngoài
        ngayKetThuc,
      } = values;

      const res = await postRequest(`dong-ho-nuoc/add-dong-ho-tong`, {
        nhaMayId: nhaMayId,
        dongHoNuoc: {
          tenDongHo,
          trangThaiSuDung,
          keyId,
          loaiDongHo, // ko
          loaiDongHoId, // ko
          seriDongHo,
          ngaySuDung,
          donViHC, // ko
          nguoiQuanLyId,
          tuyenDocId,
          dongHoChaId,
          soThuTu, // ko
          chiSoDau,
          chiSoCuoi,
          seriChi,
          diaChi,
          toaDo, // ko
          kinhDo,
          viDo,
          nuocSX,
          hangSX,
          kieuDongHo,
          duongKinh,
          hopBaoVe,
          viTriLapDat,
          ngayKiemDinh: hieuLucKD,
          hieuLucKD,
          lyDoKiemDinh, // ko
          vanMotChieu, // ko
          trangThaiDHLap,
          soTem: soHieu,
          soPhieuThay,
          lyDoThay,
          lyDoHuy, // ko
          maDHThay, // ko
          nguoiThayId, // ko
          khuyenMai,
          ongDan, // ko
          daiKhoiThuy, // ko
          loaiDiemId, // ko
          // hopDongId: null, // get ở ngoài
          ngayKetThuc,
        },
      });

      console.log("res ->", res.data);
      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        toast.success("Thêm thành công đồng hồ tổng.");
        return res.data;
      }
    } catch ({ error }) {
      console.log({ error });
      return rejectWithValue(error.response.data.Message);
    }
  }
);

// fetch api update clock
const fetchApiUpdateMasterClock = createAsyncThunk(
  "masterClock/fetchApiUpdateMasterClock",
  async ({ values, rowSelected }) => {
    try {
      const {
        tenDongHo,
        trangThaiSuDung,
        keyId,
        loaiDongHo, // ko
        loaiDongHoId, // ko
        seriDongHo,
        ngaySuDung,
        donViHC, // ko
        nguoiQuanLyId,
        tuyenDocId,
        dongHoChaId,
        soThuTu, // ko
        chiSoDau,
        chiSoCuoi,
        seriChi,
        diaChi,
        toaDo, // ko
        kinhDo,
        viDo,
        nuocSX,
        hangSX,
        kieuDongHo,
        duongKinh,
        hopBaoVe,
        viTriLapDat,
        ngayKiemDinh,
        hieuLucKD,
        lyDoKiemDinh, // ko
        vanMotChieu, // ko
        trangThaiDHLap,
        soHieu,
        soPhieuThay,
        lyDoThay,
        lyDoHuy, // ko
        maDHThay, // ko
        nguoiThayId, // ko
        khuyenMai,
        ongDan, // ko
        daiKhoiThuy, // ko
        loaiDiemId, // ko
        ngayKetThuc,
      } = values;

      const { id, hopDongId } = rowSelected;

      const res = await putRequest(`dong-ho-nuoc/update-dong-ho-tong`, {
        dongHoTongCuId: id,
        dongHoTongMoiModel: {
          tenDongHo,
          trangThaiSuDung,
          keyId,
          loaiDongHo, // ko
          loaiDongHoId, // ko
          seriDongHo,
          ngaySuDung,
          donViHC, // ko
          nguoiQuanLyId,
          tuyenDocId,
          dongHoChaId,
          soThuTu, // ko
          chiSoDau,
          chiSoCuoi,
          seriChi,
          diaChi,
          toaDo, // ko
          kinhDo,
          viDo,
          nuocSX,
          hangSX,
          kieuDongHo,
          duongKinh,
          hopBaoVe,
          viTriLapDat,
          ngayKiemDinh,
          hieuLucKD,
          lyDoKiemDinh, // ko
          vanMotChieu, // ko
          trangThaiDHLap,
          soTem: soHieu,
          soPhieuThay,
          lyDoThay,
          lyDoHuy, // ko
          maDHThay, // ko
          nguoiThayId, // ko
          khuyenMai,
          ongDan, // ko
          daiKhoiThuy, // ko
          loaiDiemId, // ko
          hopDongId, // get ở ngoài
          ngayKetThuc,
        },
      });

      // console.log("res update", res.data);
      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        toast.success("Cập nhật đồng hồ nước thành công.");
        return res.data;
      } else {
        toast.error("Mã đồng hồ đã tồn tại!");
      }
    } catch (error) {
      toast.error("Mã đồng hồ đã tồn tại!");
      console.log({ error });
    }
  }
);

export {
  fetchApiGetMasterClock,
  fetchApiCreateMasterClock,
  fetchApiUpdateMasterClock,
};

export default masterClockSlice;
