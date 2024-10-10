import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services";
import { toast } from "react-toastify";
import moment from "moment";

const totalWatchSlice = createSlice({
  name: "totalWatch",
  initialState: {
    listTotalWatch: [],
    listTotalWatchExcel: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiAllTotalWatch.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiAllTotalWatch.fulfilled, (state, action) => {
        state.listTotalWatch = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchApiAllTotalWatchExcel.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiAllTotalWatchExcel.fulfilled, (state, action) => {
        state.listTotalWatchExcel = action.payload;
        state.isLoading = false;
      });
  },
});

// fetch api get all totalWatch
const fetchApiAllTotalWatch = createAsyncThunk(
  "totalWatch/fetchApiAllTotalWatch",
  async () => {
    try {
      const res = await getRequest("dong-ho-nuoc/get-all");
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get single total watch by keyId

const fetchApiSingleTotalWatch = createAsyncThunk(
  "totalWatch/fetchApiSingleTotalWatch",
  async (keyId) => {
    try {
      const res = await getRequest(`dong-ho-nuoc/get-single/${keyId}`);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get single watch by keyId of customer

const fetchApiSingleTotalWatchByCusId = createAsyncThunk(
  "totalWatch/fetchApiSingleTotalWatchByCusId",
  async (keyId) => {
    try {
      const res = await getRequest(`dong-ho-nuoc/get-by/khach-hang/${keyId}`);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get all totalWatch excel

const fetchApiAllTotalWatchExcel = createAsyncThunk(
  "totalWatch/fetchApiAllTotalWatchExcel",
  async () => {
    try {
      const res = await getRequest("dong-ho-nuoc/get-all-to-excel");
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api add totalWatch

const fetchApiAddTotalWatch = createAsyncThunk(
  "totalWatch/fetchApiAddTotalWatch",
  async (values) => {
    try {
      // các field nhập tay trong form input
      let {
        trangThaiSuDung,
        keyId,
        seriDongHo,
        ngayKiemDinh,
        loaiDongHo,
        soThuTu,
        chiSoDau,
        chiSoCuoi,
        diaChi,
        nuocSX,
        hangSX,
        duongKinh,
        hieuLucKD,
      } = values;

      const data = {
        trangThaiSuDung,
        keyId,
        seriDongHo,
        ngaySuDung: "2023-08-23T17:42:25+00:00",
        donViHC: "Xã Liệp Tè",
        loaiDongHo,
        loaiDongHoId: "HoDan",
        nguoiQuanLyId: "ql1",
        tuyenDocId: "292e52d2-36c2-4eb3-acc0-cc4d61c93a90",
        dongHoChaId: "1",
        soThuTu: parseInt(soThuTu),
        chiSoDau: parseInt(chiSoDau),
        chiSoCuoi: parseInt(chiSoCuoi),
        seriChi: "12",
        diaChi,
        toaDo: "1",
        kinhDo: "1",
        viDo: "1",
        nuocSX,
        hangSX,
        kieuDongHo: "actarisd32",
        duongKinh: parseInt(duongKinh),
        hopBaoVe: "BeTong",
        viTriLapDat: "tv",
        ngayKiemDinh: moment(ngayKiemDinh).toDate(),
        hieuLucKD: moment(hieuLucKD).toDate(),
        lyDoKiemDinh: "KhachHang",
        vanMotChieu: true,
        trangThaiDHLap: "DongHoMoi",
        soTem: "1",
        soPhieuThay: "1",
        lyDoThay: "KemChinhXac",
        lyDoHuy: "lydo1",
        maDHThay: "1",
        nguoiThayId: null,
        khuyenMai: 1,
        ongDan: "1",
        daiKhoiThuy: "1",
        hopDongId: "3c994636b6ca4e64849b8d7fde4faa83",
        tuyenDoc: null,
        hopDong: null,
      };

      const res = await postRequest("dong-ho-nuoc/add", data);
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

// fetch api update totalWatch

const fetchApiUpdateTotalWatch = createAsyncThunk(
  "totalWatch/fetchApiUpdateTotalWatch",
  async (values) => {
    try {
      let {
        prevKeyId,
        trangThaiSuDung,
        keyId,
        seriDongHo,
        ngayKiemDinh,
        loaiDongHo,
        soThuTu,
        chiSoDau,
        chiSoCuoi,
        diaChi,
        nuocSX,
        hangSX,
        duongKinh,
        hieuLucKD,
      } = values;

      const data = {
        keyId: prevKeyId,
        data: {
          trangThaiSuDung,
          keyId,
          seriDongHo,
          ngaySuDung: "2023-08-23T17:42:25+00:00",
          donViHC: "Xã Liệp Tè",
          loaiDongHo,
          loaiDongHoId: "HoDan",
          nguoiQuanLyId: "ql1",
          tuyenDocId: "292e52d2-36c2-4eb3-acc0-cc4d61c93a90",
          dongHoChaId: "1",
          soThuTu: parseInt(soThuTu),
          chiSoDau: parseInt(chiSoDau),
          chiSoCuoi: parseInt(chiSoCuoi),
          seriChi: "12",
          diaChi,
          toaDo: "1",
          kinhDo: "1",
          viDo: "1",
          nuocSX,
          hangSX,
          kieuDongHo: "actarisd32",
          duongKinh: parseInt(duongKinh),
          hopBaoVe: "BeTong",
          viTriLapDat: "tv",
          ngayKiemDinh: moment(ngayKiemDinh).toDate(),
          hieuLucKD: moment(hieuLucKD).toDate(),
          lyDoKiemDinh: "KhachHang",
          vanMotChieu: true,
          trangThaiDHLap: "DongHoMoi",
          soTem: "1",
          soPhieuThay: "1",
          lyDoThay: "KemChinhXac",
          lyDoHuy: "lydo1",
          maDHThay: "1",
          nguoiThayId: null,
          khuyenMai: 1,
          ongDan: "1",
          daiKhoiThuy: "1",
          hopDongId: "3c994636b6ca4e64849b8d7fde4faa83",
          tuyenDoc: null,
          hopDong: null,
        },
      };
      const res = await putRequest(`dong-ho-nuoc/update`, data);
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Cập nhật thành công");
      }
      return res.data.data;
    } catch (error) {
      toast.error("Cập nhật thất bại");
      console.log({ error });
    }
  }
);

// fetch api delete totalWatch

const fetchApiDeleteTotalWatch = createAsyncThunk(
  "totalWatch/fetchApiDeleteTotalWatch",
  async (keyId) => {
    try {
      const res = await deleteRequest(`dong-ho-nuoc/delete/${keyId}`);
      toast.success("Xóa thành công");
      console.log(res);
    } catch (error) {
      toast.error("Xóa thất bại");
      console.log({ error });
    }
  }
);

export {
  fetchApiAllTotalWatch,
  fetchApiSingleTotalWatch,
  fetchApiSingleTotalWatchByCusId,
  fetchApiAddTotalWatch,
  fetchApiUpdateTotalWatch,
  fetchApiDeleteTotalWatch,
};

export default totalWatchSlice;
