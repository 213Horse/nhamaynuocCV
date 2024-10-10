import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../../services";
import { toast } from "react-toastify";
import moment from "moment";

const initialState = {
  danhSachBlock: [],
  allBlockClock:[],
  isAddedSuccess: false,
  isDeletedSuccess: false,
};
export const blockSlice = createSlice({
  name: "blockSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllBlock.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    builder.addCase(getAllBlockClock.fulfilled, (state, action) => {
      state.allBlockClock = action.payload;
    });
  },
});

export const getAllBlockClock = createAsyncThunk(
  "blockSlice/getAllBlockClock",
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
      factoryQueryString = factoryQueryString || "";
      factoryQueryString = factoryQueryString.replace(/nhaMayIds=/g, ",");
      factoryQueryString = factoryQueryString.replace(/^,|,$/g, "");

      const res = await getRequest(
        `dong-ho-nuoc/get-tuyen-doc-and-dong-ho-nuoc?nhaMayIds=${nhaMayId}`
      );

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchAddBlock = createAsyncThunk(
  "blockSlice/fetchAddBlock",
  async (values) => {
    try {
      console.log(values);
      const {
        keyId,
        tenDongHo,
        lyDoThay,
        diaChi,
        seriDongHo,
        soThuTu,
        maDHThay,
        ngayKiemDinh,
        nguoiThay,
        nguoiQuanLyId,
        tuyenDocId,
        chiSoDau,
        chiSoCuoi,
        trangThaiSuDung,
        ngaySuDung,
        ngayKetThuc,
        nuocSX,
        hangSX,
        duongKinh,
        viTriLapDat,
        hieuLucKD,
        soPhieuThay,
        hinhThucXL,
        kinhDo,
        viDo,
        nhaMayId,
      } = values;

      const formValues = {
        nhaMayId: nhaMayId,
        tuyenDocId,
        dongHoNuoc: {
          keyId,
          tenDongHo,
          donViHC: "m3",
          loaiDongHo: null,
          loaiDongHoId: 1,
          loaiDiemId: 1,
          nguoiQuanLyId,
          seriDongHo,
          seriChi: "2",
          trangThaiSuDung: parseInt(trangThaiSuDung),
          ngaySuDung: moment(ngaySuDung).toDate(),
          toaDo: "2",
          kinhDo,
          viDo,
          nuocSX,
          hangSX,
          kieuDongHo: null,
          hopBaoVe: 1,
          lyDoKiemDinh: 1,
          vanMotChieu: true,
          hinhThucXL: parseInt(hinhThucXL),
          loaiKM: 1,
          trangThaiDHLap: null,
          chiSoDau,
          chiSoCuoi,
          soThuTu,
          dongHoChaId: null,
          diaChi,
          duongKinh,
          viTriLapDat,
          ngayKiemDinh: moment(ngaySuDung).toDate(),
          hieuLucKD: moment(hieuLucKD).toDate(),
          soTem: "2",
          soPhieuThay,
          lyDoThay: "",
          lyDoHuy: "2",
          maDHThay: null,
          nguoiThay,
          khuyenMai: 0,
          ongDan: "2",
          daiKhoiThuy: "2",
          ngayKetThuc: moment(ngayKetThuc).toDate(),
          tuyenDocId,
        },
      };

      console.log(formValues);
      const res = await postRequest(
        `dong-ho-nuoc/add-dong-ho-block`,
        formValues
      );
      const data = await res.data;
      if (data?.statusCode == 200) {
        toast.success("Thêm thành công");
      } else {
        throw new Error("faild");
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm thất bại");
    }
  }
);
// export const fetchEditlock = createAsyncThunk(
//   "blockSlice/fetchEditlock",
//   async (values, rowSelected) => {
//     const {
//       keyId,
//       tenDongHo,
//       lyDoThay,
//       diaChi,
//       seriDongHo,
//       soThuTu,
//       maDHThay,
//       ngayKiemDinh,
//       nguoiThay,
//       nguoiQuanLyId,
//       tuyenDocId,
//       chiSoDau,
//       chiSoCuoi,
//       trangThaiSuDung,
//       ngaySuDung,
//       ngayKetThuc,
//       nuocSX,
//       hangSX,
//       duongKinh,
//       viTriLapDat,
//       hieuLucKD,
//       soPhieuThay,
//       hinhThucXL,
//       kinhDo,
//       viDo,
//       nhaMayId,
//     } = values;
//     const id = rowSelected;
//     const data = {
//       DongHoBlockId: id,
//       dongHoBlockMoiModel: {
//         keyId,
//         tenDongHo,
//         donViHC: "m3",
//         loaiDongHo: null,
//         loaiDongHoId: 1,
//         loaiDiemId: 1,
//         nguoiQuanLyId,
//         seriDongHo,
//         seriChi: "2",
//         trangThaiSuDung: parseInt(trangThaiSuDung),
//         ngaySuDung: moment(ngaySuDung).toDate(),
//         toaDo: "2",
//         kinhDo,
//         viDo,
//         nuocSX,
//         hangSX,
//         kieuDongHo: null,
//         hopBaoVe: 1,
//         lyDoKiemDinh: 1,
//         vanMotChieu: true,
//         hinhThucXL: parseInt(hinhThucXL),
//         loaiKM: 1,
//         trangThaiDHLap: null,
//         chiSoDau,
//         chiSoCuoi,
//         soThuTu,
//         dongHoChaId: null,
//         diaChi,
//         duongKinh,
//         viTriLapDat,
//         ngayKiemDinh: moment(ngaySuDung).toDate(),
//         hieuLucKD: moment(hieuLucKD).toDate(),
//         soTem: "2",
//         soPhieuThay,
//         lyDoThay,
//         lyDoHuy: "2",
//         maDHThay: null,
//         nguoiThay,
//         khuyenMai: 0,
//         ongDan: "2",
//         daiKhoiThuy: "2",
//         ngayKetThuc: moment(ngayKetThuc).toDate(),
//         tuyenDocId,
//       },
//     };

//     try {
//       await putRequest(`dong-ho-nuoc/update-dong-ho-block`, data);
//       toast.success("Sửa thành công");
//     } catch (error) {
//       console.log(error);
//       toast.error("Sửa thất bại");
//     }
//   }
// );

export const fetchEditlock = createAsyncThunk(
  "blockSlice/fetchEditlock",
  async (values, hopDongId) => {
    try {
      let {
        hinhThucXL,
        tenDongHo,
        tuyenDocId,
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
        hangSXId,
        duongKinh,
        hieuLucKD,
        ngaySuDung,
        nguoiQuanLyId,
        donViHC,
        toaDo,
        kinhDo,
        viDo,
        soTem,
        soPhieuThay,
        lyDoThay,
        lyDoHuy,
        maDHThay,
        lyDoKiemDinh,
        trangThaiDHLap,
        kieuDongHo,
        hopBaoVe,
        viTriLapDat,
        seriChi,
        nguoiThayId,
        tuyenDoc,
        hopDong,
        ngayKetThuc,
      } = values;

      const data = {
        dongHoBlockId: prevKeyId,
        dongHoBlockMoiModel: {
          hinhThucXL,
          tuyenDocId: tuyenDocId,
          tenDongHo,
          trangThaiSuDung,
          keyId,
          seriDongHo,
          ngaySuDung,
          ngayKiemDinh,
          hieuLucKD,
          ngayKetThuc,
          donViHC,
          loaiDongHo,
          loaiDongHoId: "BLOCK",
          nguoiQuanLyId,
          soThuTu: parseInt(soThuTu),
          chiSoDau: parseInt(chiSoDau),
          chiSoCuoi: parseInt(chiSoCuoi),
          seriChi,
          diaChi,
          toaDo,
          kinhDo,
          viDo,
          nuocSX,
          hangSXId,
          duongKinh: parseInt(duongKinh),
          kieuDongHo,
          hopBaoVe,
          viTriLapDat,
          lyDoKiemDinh,
          vanMotChieu: true,
          trangThaiDHLap,
          soTem,
          soPhieuThay,
          lyDoThay,
          lyDoHuy,
          maDHThay,
          khuyenMai: 1,
          ongDan: "1",
          daiKhoiThuy: "1",
          hopDongId: 1,
          nguoiThayId,
          tuyenDoc,
          hopDong,
        },
      };
      const res = await putRequest(`dong-ho-nuoc/update-dong-ho-block`, data);
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

export const fetchGetAllBlock = createAsyncThunk(
  "blockSlice/fetchGetAllBlock",
  async (tuyenDocId) => {
    try {
      if (tuyenDocId) {
        const res = await getRequest(
          `dong-ho-nuoc/get-dong-ho-block-theo-tuyen?tuyenDocId=${tuyenDocId}`
        );
        if (res?.data?.statusCode === 200) {
          return res.data;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
