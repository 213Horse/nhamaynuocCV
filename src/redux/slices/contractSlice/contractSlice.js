import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  deleteRequest,
  getRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services";
import { GetTinhAndHuyenByXaId } from "../../../graphql/wards/wardQuery";
import apolloClient from "../../../config/apolloClient";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { btnClickGetFactoryIdSelector } from "../../selector";
import dayjs from "dayjs";

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    data: [],
    contractW: [],
    newContractId: null,
    newContractFilter: null,
    isLoading: false,
    tinh: [],
    huyen: [],
    xa: [],
    tinhAndHuyen: null,
    detailHopDong: [],
    printData: null,
    tuyenDoc: [],
    tuyenDocDataForOthers: [],
    dataForMenu: [],
    dataForMenuCreate: [],
    dataForMenuKeKhachHang: [],
    dataForMenuPhatTrienKhachHang: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiCreateContract.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchApiCreateContract.rejected, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchApiGetContractIdNew.fulfilled, (state, action) => {
        state.newContractId = action.payload;
      })
      .addCase(fetchTuyenDocDataForOther.fulfilled, (state, action) => {
        state.tuyenDocDataForOthers = action.payload;
      })
      .addCase(getTinhAndHuyenByXaId.fulfilled, (state, action) => {
        state.tinhAndHuyen = action.payload;
      })
      .addCase(fetchApiGetContract.fulfilled, (state, action) => {
        state.contractW = action.payload;
      })
      .addCase(fetchApiGetContractFilter.fulfilled, (state, action) => {
        state.newContractFilter = action.payload;
      })
      .addCase(fetchApiTinh.fulfilled, (state, action) => {
        state.tinh = action.payload;
      })
      .addCase(fetchApiHuyen.fulfilled, (state, action) => {
        state.huyen = action.payload;
      })
      .addCase(fetchApiXa.fulfilled, (state, action) => {
        state.xa = action.payload;
      })
      .addCase(getDetailHopDong.fulfilled, (state, action) => {
        state.detailHopDong = action.payload;
      })
      .addCase(fetchTuyenDoc.fulfilled, (state, action) => {
        state.tuyenDoc = action.payload;
      })
      .addCase(printHopDong.fulfilled, (state, action) => {
        state.printData = action.payload;
      })
      .addCase(fetchDataForMenuContract.fulfilled, (state, action) => {
        state.dataForMenu = action.payload;
      })
      .addCase(fetchDataForMenuContractCreate.fulfilled, (state, action) => {
        state.dataForMenuCreate = action.payload;
      })
      .addCase(fetchDataDSKeKhachHang.fulfilled, (state, action) => {
        state.dataForMenuKeKhachHang = action.payload;
      })
      .addCase(fetchDataDSPhatTrienKhachHang.fulfilled, (state, action) => {
        state.dataForMenuPhatTrienKhachHang = action.payload;
      });
  },
});

// fetch api create contract
// const fetchApiCreateContract = createAsyncThunk(
//   "contract/fetchApiCreateContract",
//   async (values, { rejectWithValue }) => {
//     try {
//       const {
//         // files
//         fileDinhKemModels,
//         // Info Customer
//         keyIdOfCustomer,
//         nhaMayIdOfCustomer,
//         nguonNuoc,
//         loaiKhachHang,
//         tenKhachHang,
//         tenThuongGoi,
//         soHo,
//         email,
//         dienThoai,
//         soCmnd,
//         noiCapCmnd,
//         maSoThue,
//         ghiChu,
//         doiTuong,
//         soKhau,
//         nguoiDaiDien,
//         ngayCapCmnd,
//         addressOfCustomer,
//         // Info Contract
//         keyIdOfContract,
//         maVach,
//         doiTuongGiaId,
//         // tuyenDocIdOfContract,
//         nhaMayIdOfContract,
//         phuongThucThanhToanId,
//         khuVucThanhToan,
//         ngayKyHopDong,
//         ngayLapDat,
//         nguoiLapDatId,
//         ngayNopTien,
//         tienLapDat,
//         nguoiNop,
//         tienDatCoc, //tienCoc,
//         ngayDatCoc,
//         camKetSuDungNuoc,
//         khoiLuongCamKet,
//         ghiChuOfContract,
//         kinhDo,
//         viDo,
//         ngayCoHieuLuc,
//         mucDichSuDung,
//         // Info Detail clock
//         trangThaiSuDung, // to number
//         tuyenDocId,
//         keyIdOfClockDetail,
//         seriDongHo,
//         ngaySuDung,
//         donViHC,
//         vungId,
//         khuVucId,
//         hinhThucXL,
//         nguoiQuanLyId,
//         phamViId,
//         dongHoChaId,
//         soThuTu,
//         chiSoDau,
//         chiSoCuoi,
//         seriChi,
//         diachiOfDetailClock,
//         ngayLapDatOfDetailClock,
//         lyDoHuy,
//         nuocSXId,
//         hangSXId,
//         loaiDongHo,
//         kieuDongHoId,
//         toaDoDHN,
//         kinhDoDHN,
//         viDoDHN,
//         loaiDiemId,
//         duongKinh,
//         hopBaoVe, // to number
//         viTriLapDat,
//         ngayKiemDinh,
//         hieuLucKD,
//         lyDoKiemDinh, // to number
//         vanMotChieu,
//         soTem,
//         soPhieuThay,
//         lyDoThay,
//         maDHThay,
//         nguoiThayId,
//         khuyenMai, // to number
//         ongDan,
//         daiKhoiThuy,
//         trangThaiDHLap,
//       } = values;

//       console.log("nguoiQuanLyId ->", nguoiQuanLyId);

//       // convert String to Number
//       const formatTienLapDat = Number(tienLapDat);
//       const formatTienDatCoc = Number(tienDatCoc);

//       const res = await postRequest(`hop-dong/add-hop-dong-voi-ba-model`, {
//         khachHang: {
//           keyId: keyIdOfCustomer,
//           nhaMayId: nhaMayIdOfCustomer,
//           nguonNuoc,
//           loaiKhachHang,
//           tenKhachHang,
//           tenThuongGoi,
//           soHo,
//           email,
//           dienThoai,
//           soCmnd,
//           noiCapCmnd,
//           maSoThue,
//           ghiChu,
//           doiTuong,
//           soKhau: soKhau || undefined,
//           nguoiDaiDien,
//           ngayCapCmnd: ngayCapCmnd,
//           diaChi: addressOfCustomer,
//         },
//         hopDong: {
//           keyId: "HD." + keyIdOfContract,
//           maVach: "HD." + maVach,
//           doiTuongGiaId,
//           nhaMayId: nhaMayIdOfContract,
//           phuongThucThanhToanId,
//           khuVucThanhToan,
//           ngayKyHopDong: ngayKyHopDong || new Date(),
//           ngayLapDat: ngayLapDat || new Date(),
//           nguoiLapDatId,
//           ngayNopTien: ngayNopTien || new Date(),
//           tienLapDat: formatTienLapDat || 0,
//           nguoiNop,
//           tienDatCoc: formatTienDatCoc || 0, //tienCoc,
//           ngayDatCoc: ngayDatCoc || new Date(),
//           camKetSuDungNuoc,
//           khoiLuongCamKet,
//           ghiChu: ghiChuOfContract,
//           kinhDo: kinhDo || "0",
//           viDo: viDo || "0",
//           ngayCoHieuLuc,
//           mucDichSuDung,
//           // deletedTime: null,
//           // fileDinhKemModels: fileDinhKemModels || [],
//         },
//         dongHoNuoc: {
//           trangThaiSuDung, // to number
//           keyId: "DH." + keyIdOfClockDetail,
//           loaiDongHo,
//           seriDongHo,
//           vungId,
//           khuVucId,
//           hinhThucXL,
//           ngaySuDung: ngaySuDung || new Date(),
//           donViHC,
//           nguoiQuanLyId: nguoiQuanLyId,
//           tuyenDocId,
//           dongHoChaId,
//           soThuTu,
//           chiSoDau,
//           chiSoCuoi,
//           seriChi,
//           diaChi: diachiOfDetailClock,
//           ngayLapDat: ngayLapDatOfDetailClock || new Date(),
//           toaDo: toaDoDHN,
//           kinhDo: kinhDoDHN || "0",
//           viDo: viDoDHN || "0",
//           nuocSXId,
//           hangSXId,
//           kieuDongHoId,
//           duongKinh,
//           hopBaoVe, // to number
//           viTriLapDat,
//           ngayKiemDinh: ngayKiemDinh || new Date(),
//           hieuLucKD: hieuLucKD || new Date(),
//           lyDoKiemDinh, // to number
//           vanMotChieu,
//           trangThaiDHLap,
//           soTem,
//           soPhieuThay,
//           lyDoThay,
//           lyDoHuy,
//           maDHThay,
//           nguoiThayId,
//           khuyenMai, // to number
//           ongDan,
//           daiKhoiThuy,
//           loaiDiemId,
//           // hopDongId: keyIdOfContract,
//           phamViId, //ko
//         },
//         // fileDinhKemModels: [],
//       });

//       // console.log("res create contract ->", res.data);
//       if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
//         toast.success("Tạo hợp đồng thành công.");

//         return res.data.data;
//       }
//     } catch (error) {
//       // toast.error("Mã khách hàng đã tồn tại. Vui lòng làm mới lại mã!");
//       // toast.error(error.response.data.message);
//       console.log({ error });
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

const fetchApiCreateContract = createAsyncThunk(
  "contract/fetchApiCreateContract",
  async (values, { rejectWithValue }) => {
    try {
      const {
        // files
        // fileDinhKemModels,
        // Info Customer
        // keyIdOfCustomer,
        nhaMayIdOfCustomer,
        // nguonNuoc,
        loaiKhachHang,
        tenKhachHang,
        tenThuongGoi,
        soHo,
        email,
        dienThoai,
        soCMND,
        noiCapCMND,
        maSoThue,
        ghiChuOfCustomer,
        doiTuong,
        soKhau,
        nguoiDaiDien,
        ngayCapCMND,
        addressOfCustomer,
        idTheDienLuc,
        // Info Contract
        keyIdOfContract,
        maVach,
        doiTuongGiaId,
        // tuyenDocIdOfContract,
        nhaMayIdOfContract,
        phuongThucThanhToanId,
        khuVucThanhToan,
        ngayKyHopDong,
        ngayLapDat,
        nguoiLapDatID,
        ngayNopTien,
        tienLapDat,
        nguoiNop,
        tienDatCoc,
        ngayDatCoc,
        camKetSuDungNuoc,
        khoiLuongNuocCamKet,
        ghiChuOfContract,
        kinhDo,
        viDo,
        ngayCoHieuLuc,
        mucDichSuDung,
        trangThaiSuDung,
        tuyenDocId,
        keyIdOfClockDetail,
        seriDongHo,
        ngaySuDung,
        donViHC,
        vungId,
        khuVucID,
        hinhThucXL,
        nguoiQuanLyId,
        phamViId,
        dongHoChaId,
        soThuTu,
        chiSoDau,
        chiSoCuoi,
        seriChi,
        diachiOfDetailClock,
        ngayLapDatOfDetailClock,
        lyDoHuy,
        ngayHuy,
        nuocSXId,
        hangSXId,
        loaiDongHo,
        kieuDongHoId,
        toaDo,
        loaiDiemId,
        duongKinh,
        hopBaoVe, // to number
        viTriLapDat,
        ngayKiemDinh,
        hieuLucKD,
        lyDoKiemDinh, // to number
        vanMotChieu,
        soTem,
        soPhieuThay,
        lyDoThay,
        maDHThay,
        nguoiThayId,
        khuyenMai, // to number
        loaiKM,
        chipDongHoNuocId,
        ongDan,
        daiKhoiThuy,
        trangThaiDHLap,
        maHopDong,
      } = values;

      // convert String to Number
      const formatTienLapDat = Number(tienLapDat);
      const formatTienDatCoc = Number(tienDatCoc);

      const ngayKyHDDH =
        ngayKyHopDong !== null
          ? dayjs(ngayKyHopDong).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayLapDatDH =
        ngayLapDat !== null
          ? dayjs(ngayLapDat).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayNopTienDH =
        ngayNopTien !== null
          ? dayjs(ngayNopTien).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayDatCocDH =
        ngayDatCoc !== null
          ? dayjs(ngayDatCoc).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayDatDetailDH =
        ngayLapDatOfDetailClock !== null
          ? dayjs(ngayLapDatOfDetailClock).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngaySuDungDH =
        ngaySuDung !== null
          ? dayjs(ngaySuDung).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayKDDH =
        ngayKiemDinh !== null
          ? dayjs(ngayKiemDinh).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const hieuKDDH =
        hieuLucKD !== null
          ? dayjs(hieuLucKD).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayHuyKDDH =
        ngayHuy !== null
          ? dayjs(ngayHuy).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;

      const res = await postRequest(`hop-dong/tao-hop-dong-ver-2`, {
        nhaMayId: nhaMayIdOfCustomer,
        mKhachHang: {
          // keyId: keyIdOfCustomer,
          // nguonNuoc,
          loaiKhachHang,
          soCMND,
          tenKhachHang,
          tenThuongGoi,
          soHo,
          soKhau: soKhau || 0,
          email,
          dienThoai,
          diaChi: addressOfCustomer,
          ngayCapCMND: ngayCapCMND,
          noiCapCMND,
          maSoThue,
          nguoiDaiDien,
          ghiChu: ghiChuOfCustomer,
          doiTuong,
          idTheDienLuc,
        },
        mHopDong: {
          doiTuongGiaId,
          mucDichSuDung,
          phuongThucThanhToanId,
          khuVucThanhToan,
          ngayKyHopDong: ngayKyHDDH,
          ngayLapDat: ngayLapDatDH,
          ngayNopTien: ngayNopTienDH,
          nguoiLapDatID,
          tienLapDat: formatTienLapDat || 0,
          nguoiNop,
          tienDatCoc: formatTienDatCoc || 0, //tienCoc,
          ngayDatCoc: ngayDatCocDH,
          camKetSuDungNuoc,
          khoiLuongNuocCamKet,
          ghiChu: ghiChuOfContract,
          hopDongKeyId: maHopDong,
        },
        mDongHo: {
          diaChi: diachiOfDetailClock,
          tuyenDocId,
          soThuTu: soThuTu || 0,
          seriDongHo,
          chiSoDau,
          chiSoCuoi,
          seriChi,
          ngayLapDat: ngayDatDetailDH,
          ngaySuDung: ngaySuDungDH,
          trangThaiSuDung, // to number
          lyDoHuy,
          ngayHuy: ngayHuyKDDH,
          hangSXId,
          nuocSXId,
          kieuDongHoId,
          loaiDongHo,
          toaDo,
          kinhDo,
          viDo,
          duongKinh,
          hopBaoVe,
          viTriLapDat,
          ngayKiemDinh: ngayKDDH,
          hieuLucKD: hieuKDDH,
          lyDoKiemDinh,
          vanMotChieu,
          soTem,
          soPhieuThay,
          lyDoThay,
          maDHThay,
          nguoiThayId,
          loaiKM,
          trangThaiDHLap,
          khuyenMai,
          ongDan,
          daiKhoiThuy,
          chipDongHoNuocId,
          hinhThucXL,
        },
      });

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        toast.success("Tạo hợp đồng thành công.");

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.message);
    }
  }
);

const addDongHoToContract = createAsyncThunk(
  "contract/AddDongHoToContract",
  async (values, { rejectWithValue }) => {
    try {
      const {
        maHopDong,
        loaiKhachHang,
        tenKhachHang,
        tenThuongGoi,
        soHo,
        email,
        dienThoai,
        soCMND,
        noiCapCMND,
        maSoThue,
        ghiChuOfCustomer,
        doiTuong,
        soKhau,
        nguoiDaiDien,
        ngayCapCMND,
        idTheDienLuc,
        doiTuongGiaId,
        addressOfCustomer,
        diachiOfDetailClock,
        phuongThucThanhToanId,
        khuVucThanhToan,
        ngayKyHopDong,
        ngayLapDat,
        nguoiLapDatID,
        ngayNopTien,
        tienLapDat,
        nguoiNop,
        tienDatCoc,
        ngayDatCoc,
        camKetSuDungNuoc,
        khoiLuongNuocCamKet,
        ghiChuOfContract,
        mucDichSuDung,
        trangThaiSuDung,
        tuyenDocId,
        seriDongHo,
        ngaySuDung,
        hinhThucXL,
        soThuTu,
        chiSoDau,
        chiSoCuoi,
        seriChi,
        diaChi,
        ngayLapDatOfDetailClock,
        lyDoHuy,
        ngayHuy,
        nuocSXId,
        hangSXId,
        loaiDongHo,
        kieuDongHoId,
        toaDoDHN,
        kinhDoDHN,
        viDoDHN,
        loaiDiemId,
        duongKinh,
        hopBaoVe, // to number
        viTriLapDat,
        ngayKiemDinh,
        hieuLucKD,
        lyDoKiemDinh, // to number
        vanMotChieu,
        soTem,
        soPhieuThay,
        lyDoThay,
        maDHThay,
        nguoiThayId,
        khuyenMai, // to number
        loaiKM,
        chipDongHoNuocId,
        ongDan,
        daiKhoiThuy,
        trangThaiDHLap,
        maDongHo,
      } = values;

      // convert String to Number
      const formatTienLapDat = Number(tienLapDat);
      const formatTienDatCoc = Number(tienDatCoc);

      const res = await putRequest(`hop-dong/cap-nhat-hop-dong-sp`, {
        maHopDong: maHopDong,
        mDongHo: [
          {
            diaChi: diachiOfDetailClock,
            tuyenDocId,
            soThuTu: soThuTu || 0,
            seriDongHo,
            chiSoDau,
            chiSoCuoi,
            seriChi,
            ngayLapDat: ngayLapDatOfDetailClock || new Date(),
            ngaySuDung: ngaySuDung || new Date(),
            trangThaiSuDung,
            lyDoHuy,
            hangSXId,
            nuocSXId,
            kieuDongHoId,
            loaiDongHo,
            toaDo: toaDoDHN,
            kinhDo: kinhDoDHN || "0",
            viDo: viDoDHN || "0",
            duongKinh,
            hopBaoVe,
            viTriLapDat,
            ngayKiemDinh: ngayKiemDinh || new Date(),
            hieuLucKD: hieuLucKD || new Date(),
            lyDoKiemDinh,
            vanMotChieu,
            soTem,
            soPhieuThay,
            lyDoThay,
            maDHThay,
            nguoiThayId,
            loaiKM,
            trangThaiDHLap,
            khuyenMai,
            ongDan,
            daiKhoiThuy,
            chipDongHoNuocId,
            hinhThucXL,
            maDongHo,
          },
        ],
      });

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        toast.success("Tạo hợp đồng thành công.");

        return res.data.data;
      }
    } catch (error) {
      // toast.error("Mã khách hàng đã tồn tại. Vui lòng làm mới lại mã!");
      // toast.error(error.response.data.message);
      console.log({ error });
      return rejectWithValue(error.response.data.message);
    }
  }
);

const fetchApiUpdateContractVer2 = createAsyncThunk(
  "contract/fetchApiUpdateContractVer2",
  async (values, { rejectWithValue }) => {
    try {
      const {
        maHopDong,
        loaiKhachHang,
        tenKhachHang,
        tenThuongGoi,
        soHo,
        email,
        dienThoai,
        soCMND,
        noiCapCMND,
        maSoThue,
        ghiChuOfCustomer,
        doiTuong,
        soKhau,
        nguoiDaiDien,
        ngayCapCMND,
        idTheDienLuc,
        doiTuongGiaId,
        addressOfCustomer,
        diachiOfDetailClock,
        phuongThucThanhToanId,
        khuVucThanhToan,
        ngayKyHopDong,
        ngayLapDat,
        nguoiLapDatID,
        ngayNopTien,
        tienLapDat,
        nguoiNop,
        tienDatCoc,
        ngayDatCoc,
        camKetSuDungNuoc,
        khoiLuongNuocCamKet,
        ghiChuOfContract,
        mucDichSuDung,
        trangThaiSuDung,
        tuyenDocId,
        seriDongHo,
        ngaySuDung,
        hinhThucXL,
        soThuTu,
        chiSoDau,
        chiSoCuoi,
        seriChi,
        ngayLapDatOfDetailClock,
        lyDoHuy,
        ngayHuy,
        nuocSXId,
        hangSXId,
        loaiDongHo,
        kieuDongHoId,
        toaDo,
        kinhDo,
        viDo,
        duongKinh,
        hopBaoVe,
        viTriLapDat,
        ngayKiemDinh,
        hieuLucKD,
        lyDoKiemDinh,
        vanMotChieu,
        soTem,
        soPhieuThay,
        lyDoThay,
        maDHThay,
        nguoiThayId,
        khuyenMai,
        loaiKM,
        chipDongHoNuocId,
        ongDan,
        daiKhoiThuy,
        trangThaiDHLap,
        maDongHoDetail,
      } = values;
      const formatTienLapDat = Number(tienLapDat);
      const formatTienDatCoc = Number(tienDatCoc);

      const ngayKyHDDH =
        ngayKyHopDong !== null
          ? dayjs(ngayKyHopDong).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayLapDatDH =
        ngayLapDat !== null
          ? dayjs(ngayLapDat).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayNopTienDH =
        ngayNopTien !== null
          ? dayjs(ngayNopTien).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayDatCocDH =
        ngayDatCoc !== null
          ? dayjs(ngayDatCoc).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayDatDetailDH =
        ngayLapDatOfDetailClock !== null
          ? dayjs(ngayLapDatOfDetailClock).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngaySuDungDH =
        ngaySuDung !== null
          ? dayjs(ngaySuDung).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayKDDH =
        ngayKiemDinh !== null
          ? dayjs(ngayKiemDinh).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const hieuKDDH =
        hieuLucKD !== null
          ? dayjs(hieuLucKD).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;
      const ngayHuyKDDH =
        ngayHuy !== null
          ? dayjs(ngayHuy).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : null;

      const res = await putRequest(`hop-dong/cap-nhat-hop-dong-sp`, {
        maHopDong: maHopDong,
        mKhachHang: {
          loaiKhachHang,
          soCMND,
          tenKhachHang,
          tenThuongGoi,
          soHo,
          soKhau: soKhau || 0,
          email,
          dienThoai,
          diaChi: addressOfCustomer,
          ngayCapCMND,
          noiCapCMND,
          maSoThue,
          nguoiDaiDien,
          ghiChu: ghiChuOfCustomer,
          doiTuong,
          idTheDienLuc,
        },
        mHopDong: {
          doiTuongGiaId,
          mucDichSuDung,
          phuongThucThanhToanId,
          khuVucThanhToan,
          ngayKyHopDong: ngayKyHDDH,
          ngayLapDat: ngayLapDatDH,
          ngayNopTien: ngayNopTienDH,
          nguoiLapDatID,
          tienLapDat: formatTienLapDat || 0,
          nguoiNop,
          tienDatCoc: formatTienDatCoc || 0, //tienCoc,
          ngayDatCoc: ngayDatCocDH,
          camKetSuDungNuoc,
          khoiLuongNuocCamKet,
          ghiChu: ghiChuOfContract,
        },
        mDongHo: [
          {
            diaChi: diachiOfDetailClock,
            tuyenDocId,
            soThuTu: soThuTu || 0,
            seriDongHo,
            chiSoDau,
            chiSoCuoi,
            seriChi,
            ngayLapDat: ngayDatDetailDH,
            ngaySuDung: ngaySuDungDH,
            trangThaiSuDung,
            lyDoHuy,
            ngayHuy: ngayHuyKDDH,
            hangSXId,
            nuocSXId,
            kieuDongHoId,
            loaiDongHo,
            toaDo,
            kinhDo,
            viDo,
            duongKinh,
            hopBaoVe,
            viTriLapDat,
            ngayKiemDinh: ngayKDDH,
            hieuLucKD: hieuKDDH,
            lyDoKiemDinh,
            vanMotChieu,
            soTem,
            soPhieuThay,
            lyDoThay,
            maDHThay,
            nguoiThayId,
            loaiKM,
            trangThaiDHLap,
            khuyenMai,
            ongDan,
            daiKhoiThuy,
            hinhThucXL,
            chipDongHoNuocId,
            maDongHo: maDongHoDetail,
          },
        ],
      });

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        toast.success("Sửa hợp đồng thành công.");

        return res.data.data;
      }
    } catch (error) {
      // toast.error("Mã khách hàng đã tồn tại. Vui lòng làm mới lại mã!");
      // toast.error(error.response.data.message);
      console.log({ error });
      return rejectWithValue(error.response.data.message);
    }
  }
);

const fetchApiUpdateContract = createAsyncThunk(
  "contract/fetchApiUpdateContract",
  async (
    { values, hopDongKeyId, dongHoKeyId, hopDongId, khachHangId },
    { rejectWithValue }
  ) => {
    try {
      const {
        // Info Customer
        keyIdOfCustomer,
        nhaMayIdOfCustomer,
        nguonNuoc,
        loaiKhachHang,
        tenKhachHang,
        tenThuongGoi,
        soHo,
        email,
        dienThoai,
        soCmnd,
        noiCapCmnd,
        maSoThue,
        ghiChu,
        doiTuong,
        soKhau,
        nguoiDaiDien,
        ngayCapCmnd,
        addressOfCustomer,
        // Info Contract
        keyIdOfContract,
        maVach,
        doiTuongGiaId,
        // tuyenDocIdOfContract,
        nhaMayIdOfContract,
        phuongThucThanhToanId,
        khuVucThanhToan,
        ngayKyHopDong,
        ngayLapDat,
        nguoiLapDatId,
        ngayNopTien,
        tienLapDat,
        nguoiNop,
        tienDatCoc, //tienCoc,
        ngayDatCoc,
        camKetSuDungNuoc,
        khoiLuongCamKet,
        ghiChuOfContract,
        kinhDo,
        viDo,
        ngayCoHieuLuc,
        mucDichSuDung,
        // Info Detail clock
        trangThaiSuDung, // to number
        tuyenDocId,
        keyIdOfClockDetail,
        seriDongHo,
        vungId,
        khuVucId,
        hinhThucXL,
        ngaySuDung,
        donViHC,
        nguoiQuanLyId,
        phamViId,
        dongHoChaId,
        soThuTu,
        chiSoDau,
        chiSoCuoi,
        seriChi,
        diachiOfDetailClock,
        ngayLapDatOfDetailClock,
        lyDoHuy,
        ngayHuy,
        nuocSXId,
        hangSXId,
        loaiDongHo,
        kieuDongHoId,
        toaDoDHN,
        kinhDoDHN,
        viDoDHN,
        loaiDiemId,
        duongKinh,
        hopBaoVe, // to number
        viTriLapDat,
        ngayKiemDinh,
        hieuLucKD,
        lyDoKiemDinh, // to number
        vanMotChieu,
        soTem,
        soPhieuThay,
        lyDoThay,
        maDHThay,
        nguoiThayId,
        khuyenMai, // to number
        ongDan,
        daiKhoiThuy,
        trangThaiDHLap,
      } = values;

      const formatTienLapDat = Number(tienLapDat);
      const formatTienDatCoc = Number(tienDatCoc);

      const res = await putRequest(
        `hop-dong/update-hop-dong-voi-ba-model/${hopDongKeyId}/${dongHoKeyId}`,
        {
          khachHang: {
            keyId: keyIdOfCustomer,
            nhaMayId: nhaMayIdOfCustomer,
            nguonNuoc,
            loaiKhachHang,
            tenKhachHang,
            tenThuongGoi,
            soHo,
            email,
            dienThoai,
            soCmnd,
            noiCapCmnd,
            maSoThue,
            ghiChu,
            doiTuong,
            soKhau,
            nguoiDaiDien,
            ngayCapCmnd,
            diaChi: addressOfCustomer,
          },
          hopDong: {
            keyId: keyIdOfContract,
            maVach,
            doiTuongGiaId,
            nhaMayId: nhaMayIdOfContract,
            phuongThucThanhToanId,
            khuVucThanhToan,
            ngayKyHopDong,
            ngayLapDat,
            nguoiLapDatId,
            ngayNopTien,
            tienLapDat: formatTienLapDat || 0,
            nguoiNop,
            tienDatCoc: formatTienDatCoc || 0,
            ngayDatCoc,
            camKetSuDungNuoc,
            khoiLuongCamKet,
            ghiChu: ghiChuOfContract,
            kinhDo,
            viDo,
            ngayCoHieuLuc,
            mucDichSuDung,
            khachHangId: khachHangId,
            // deletedTime: null,
          },
          dongHoNuoc: {
            trangThaiSuDung, // to number
            keyId: keyIdOfClockDetail,
            loaiDongHo,
            seriDongHo,
            ngaySuDung,
            donViHC,
            nguoiQuanLyId,
            vungId,
            khuVucId,
            hinhThucXL,
            tuyenDocId,
            dongHoChaId,
            soThuTu,
            chiSoDau,
            chiSoCuoi,
            seriChi,
            diaChi: diachiOfDetailClock,
            ngayLapDat: ngayLapDatOfDetailClock || new Date(),
            toaDo: toaDoDHN,
            kinhDo: kinhDoDHN,
            viDo: viDoDHN,
            nuocSXId,
            hangSXId,
            kieuDongHoId,
            duongKinh,
            hopBaoVe,
            viTriLapDat,
            ngayKiemDinh,
            hieuLucKD,
            lyDoKiemDinh,
            vanMotChieu,
            trangThaiDHLap,
            soTem,
            soPhieuThay,
            lyDoThay,
            lyDoHuy,
            maDHThay,
            nguoiThayId,
            khuyenMai,
            ongDan,
            daiKhoiThuy,
            loaiDiemId,
            hopDongId: hopDongId,
            phamViId,
          },
        }
      );

      // console.log("next update ->", { values });
      // console.log("res update contract ->", res.data);

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        toast.success("Cập nhật hợp đồng thành công.");

        return res.data;
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.Message);
    }
  }
);

// fetch api delete contract
const fetchApiDeleteContractAndClock = createAsyncThunk(
  "contract/fetchApiDeleteContractAndClock",
  async (values, { rejectWithValue }) => {
    try {
      let { keyId } = values;

      if (keyId) {
        const res = await deleteRequest(
          // `hop-dong/delete-with-dong-ho-nuoc/${keyId}`
          `hop-dong/delete/${keyId}`
        );

        console.log("res del kh ->", res.data);

        if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
          toast.success("Xóa thành công hợp đồng.");
          return res.data;
        }
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.Message);
    }
  }
);

// fetch api (Chuyển nhượng hợp đồng)
const fetchApiTransferContract = createAsyncThunk(
  "contract/fetchApiTransferContract",
  async ({ values, customer }, { rejectWithValue }) => {
    try {
      const {
        loaiKhachHang,
        keyId,
        tenKhachHang,
        soHo,
        soKhau,
        diaChi,
        email,
        dienThoai,
        soCmnd,
        ngayCapCmnd,
        noiCapCmnd,
        ghiChu,
        maSoThue,
      } = values;

      const {
        id,
        nhaMayId,
        nguonNuoc,
        doiTuong,
        tenThuongGoi,
        nguoiDaiDien,
        hopDongs,
      } = customer;

      const res = await putRequest(`hop-dong/chuyen-nhuong-hop-dong`, {
        khachHangCuId: id,
        hopDongKeyId: hopDongs[0].keyId,
        khachHangNhanChuyenNhuong: {
          keyId: keyId,
          nhaMayId: nhaMayId,
          loaiKhachHang: loaiKhachHang,
          tenKhachHang: tenKhachHang,
          soHo: soHo,
          soKhau: soKhau,
          diaChi: diaChi,
          email: email,
          dienThoai: dienThoai,
          soCmnd: soCmnd,
          ngayCapCmnd: ngayCapCmnd,
          noiCapCmnd: noiCapCmnd,
          ghiChu: ghiChu,
          nguonNuoc: nguonNuoc,
          maSoThue: maSoThue,
          doiTuong: doiTuong,
          tenThuongGoi: tenThuongGoi,
          nguoiDaiDien: nguoiDaiDien,
        },
      });

      // console.log("res chuyen nhuong ->", res.data);

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        toast.success("Chuyển nhượng thành công hợp đồng.");

        return res.data;
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.Message);
    }
  }
);

const fetchApiTinh = createAsyncThunk("contract/fetchApiTinh", async () => {
  try {
    const res = await getRequest(`tinh/get-tinh-huyen-xa`);
    return res.data.data;
  } catch ({ error }) {
    console.log({ error });
  }
});

const fetchApiHuyen = createAsyncThunk(
  "contract/fetchApiHuyen",
  async (tinhId) => {
    try {
      const res = await getRequest(
        `tinh/get-tinh-huyen-xa?parentNode=${tinhId}`
      );
      return res.data.data;
    } catch ({ error }) {
      console.log({ error });
    }
  }
);

const fetchApiXa = createAsyncThunk("contract/fetchApiXa", async (huyenId) => {
  try {
    const res = await getRequest(
      `tinh/get-tinh-huyen-xa?parentNode=${huyenId}`
    );
    return res.data.data;
  } catch ({ error }) {
    console.log({ error });
  }
});

const fetchApiGetContract = createAsyncThunk(
  "contract/fetchApiGetContract",
  async (values) => {
    try {
      let {
        soTrang,
        soLuong,
        nhaMayId,
        soHopDong,
        maKhachHang,
        tenKhachHang,
        seriDongHo,
        soHo,
        soHoTu,
        canBoDoc,
        tuyenDocId,
        soDienThoai,
      } = values;

      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      let factoryQueryString = "";

      if (nhaMayId === "all") {
        factoryIdArr.map((factory, index) => {
          if (factoryQueryString === "") {
            factoryQueryString +=
              index === 0 ? `${factory.nhaMayId}` : `,${factory.nhaMayId}`;
          } else {
            factoryQueryString += `,${factory.nhaMayId}`;
          }
        });
      } else {
        factoryQueryString = nhaMayId;
      }
      factoryQueryString = factoryQueryString.replace(/nhaMayIds=/g, ",");
      factoryQueryString = factoryQueryString.replace(/^,|,$/g, "");

      const res = await getRequest(
        `hop-dong/get-all-ver-2?soTrang=${
          soTrang !== undefined ? soTrang : 1
        }&soLuong=${soLuong !== undefined ? soLuong : 10}${
          factoryQueryString ? `&nhaMayId=${factoryQueryString}` : ""
        }${soHopDong ? `&soHopDong=${soHopDong}` : ""}${
          maKhachHang ? `&maKhachHang=${maKhachHang}` : ""
        }${tenKhachHang ? `&tenKhachHang=${tenKhachHang}` : ""}${
          seriDongHo ? `&seriDongHo=${seriDongHo}` : ""
        }${soHo ? `&soHo=${soHo}` : ""}${soHoTu ? `&soHoTu=${soHoTu}` : ""}${
          canBoDoc ? `&canBoDoc=${canBoDoc}` : ""
        }${tuyenDocId ? `&tuyenDocId=${tuyenDocId}` : ""}
        ${soDienThoai ? `&soDienThoai=${soDienThoai}` : ""}
        `
      );
      return res.data.data;
    } catch ({ error }) {
      console.log({ error });
    }
  }
);

const fetchApiGetContractFilter = createAsyncThunk(
  "contract/fetchApiGetContractFilter",
  async (nhaMayId) => {
    try {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      let factoryQueryString = "";

      if (nhaMayId === "all") {
        factoryIdArr.map((factory, index) => {
          if (factoryQueryString === "") {
            factoryQueryString +=
              index === 0 ? `${factory.nhaMayId}` : `,${factory.nhaMayId}`;
          } else {
            factoryQueryString += `,${factory.nhaMayId}`;
          }
        });
      } else {
        factoryQueryString = nhaMayId;
      }
      factoryQueryString = factoryQueryString.replace(/nhaMayIds=/g, ",");
      factoryQueryString = factoryQueryString.replace(/^,|,$/g, "");

      const res = await getRequest(
        `hop-dong/data-filter-get-hop-dong${
          factoryQueryString ? `?nhaMayId=${factoryQueryString}` : ""
        }`
      );
      return res.data.data;
    } catch ({ error }) {
      console.log({ error });
    }
  }
);

// get -> mã hợp đồng mới
const fetchApiGetContractIdNew = createAsyncThunk(
  "contract/fetchApiGetContractIdNew",
  async (contractId) => {
    try {
      if (contractId) {
        const res = await postRequest(
          `hop-dong/tao-keyid-hop-dong?maKhachHang=${contractId}`
        );

        console.log("res genertate maHD ->", res.data);

        return res.data.data;
      }
    } catch ({ error }) {
      console.log({ error });
    }
  }
);

const fetchTuyenDoc = createAsyncThunk(
  "contract/fetchTuyenDoc",
  async (nhaMayId) => {
    try {
      if (nhaMayId) {
        const res = await getRequest(`tuyen-doc/get-by-nha-may?${nhaMayId}`);

        return res.data.data;
      }
    } catch ({ error }) {
      console.log({ error });
    }
  }
);

const fetchTuyenDocDataForOther = createAsyncThunk(
  "contract/fetchTuyenDocDataForOther",
  async (values) => {
    try {
      if (values) {
        const res = await getRequest(
          `hop-dong/fetchalldatahopdong?tuyenDocId=${values}`
        );

        console.log("res genertate Tuyen Doc data ->", res.data);

        return res.data;
      }
    } catch ({ error }) {
      console.log({ error });
    }
  }
);

const getTinhAndHuyenByXaId = createAsyncThunk(
  "contract/getTinhAndHuyenByXaId",
  async (xaId) => {
    try {
      console.log("xaId", xaId);
      const { data } = await apolloClient.query(GetTinhAndHuyenByXaId, {
        variables: {
          id: xaId,
        },
      });
      console.log(data.GetTinhAndHuyenByXaId);
      return data.GetTinhAndHuyenByXaId;
    } catch (error) {
      console.log({ error });
    }
  }
);
const getDetailHopDong = createAsyncThunk(
  "contract/getDetailHopDong",
  async (MaHopDong) => {
    try {
      if (MaHopDong) {
        const res = await getRequest(
          `hop-dong/details-hop-dong-ver-2?MaHopDong=${MaHopDong}`
        );
        console.log("res", res);
        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

const printHopDong = createAsyncThunk(
  "contract/printHopDong",
  async (hopDongId) => {
    try {
      if (hopDongId) {
        const res = await getRequest(
          `hop-dong/in-hop-dong?hopDongId=${hopDongId}`
        );
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

export const fetchDataForMenuContract = createAsyncThunk(
  "contract/fetchDataForMenuContract",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(
          `hop-dong/fetchalldatahopdongforsearchmenu?${queryString}`
        );
        return res.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchDataForMenuContractCreate = createAsyncThunk(
  "contract/fetchDataForMenuContractCreate",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(
          `hop-dong/drop-down-list-hop-dong?${queryString}`
        );
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchDataDSKeKhachHang = createAsyncThunk(
  "contract/fetchDataDSKeKhachHang",
  async (nhaMayId) => {
    try {
      if (nhaMayId) {
        console.log(nhaMayId);
        const res = await getRequest(
          `hop-dong/fetch-data-danh-sach-bang-ke-danh-sach-khach-hang?${nhaMayId}`
        );
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
export const fetchDataDSPhatTrienKhachHang = createAsyncThunk(
  "contract/fetchDataDSPhatTrienKhachHang",
  async (nhaMayId) => {
    try {
      if (nhaMayId) {
        console.log(nhaMayId);
        const res = await getRequest(
          `hop-dong/fetch-data-danh-sach-phat-trien-khach-hang-moi?${nhaMayId}`
        );
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
export {
  fetchApiCreateContract,
  fetchApiUpdateContract,
  fetchApiDeleteContractAndClock,
  fetchApiTransferContract,
  fetchApiGetContractIdNew,
  fetchApiGetContract,
  getTinhAndHuyenByXaId,
  fetchApiGetContractFilter,
  fetchApiTinh,
  fetchApiHuyen,
  fetchApiXa,
  getDetailHopDong,
  fetchApiUpdateContractVer2,
  printHopDong,
  fetchTuyenDoc,
  fetchTuyenDocDataForOther,
};

export default contractSlice;
