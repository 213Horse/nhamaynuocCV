import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services";
import apolloClient from "../../../config/apolloClient";
import {
  LOAD_CLOCK_WATER,
  LOAD_CLOCK_WATER_BY_KEY_ID,
} from "../../../graphql/clockWater/queries";

const waterClockSlice = createSlice({
  name: "waterClock",
  initialState: {
    data: [],
    listClockWater: [],
    rowSelected: null,
    getWaterClock: null,
    getClockWaterId: null,
    getClockBySeri: null,
    getAllClock: [],
    clockBlock: [],
    getLoadWaterClock: [],
    maDongHoMem: null,
    setMaDongHoMem: null,
    isLoading: false,
    isBtnThemDongHoNuoc: false,
    dsDongHoTheoLoai: [],
    dataForDropdownListDongHoBlock:[],
    dataForDropdownListDongHoTong:[]
  },
  reducers: {
    btnClickRowClockWater: (state, action) => {
      state.rowSelected = action.payload;
    },
    btnClickThemDongHoNuoc: (state, action) => {
      state.isBtnThemDongHoNuoc = action.payload;
    },
    btnClickMaDongHoMem: (state, action) => {
      // Hanlde get mã đồng hồ mềm -> từ mã hợp đồng
      console.log("ac.pay", action.payload);
      if (action?.payload?.includes("_")) {
        const [prefixMaDongHoMem, suffixMaDongHoMem] =
          action?.payload?.split("_");
        const newSuffixMaDongHoMem = parseInt(suffixMaDongHoMem) + 1;

        state.maDongHoMem = `${prefixMaDongHoMem}_${newSuffixMaDongHoMem
          .toString()
          .padStart(1, "0")}`;
      } else {
        state.maDongHoMem = `${action.payload}_1`;
      }

      // if (action?.payload) {
      //   const [prefixMaDongHoMem, suffixMaDongHoMem] =
      //     action?.payload?.split("_");
      //   let newSuffix = parseInt(suffixMaDongHoMem) || 0;
      //   newSuffix++;

      //   state.maDongHoMem = `${prefixMaDongHoMem}_${newSuffix
      //     .toString()
      //     .padStart(1, "0")}`;
      // }
    },
    setMaDongDoMoi: (state, action) => {
      // state.setMaDongHoMem = action.payload;
      // Hanlde get mã đồng hồ mềm -> từ mã hợp đồng
      // let maDongHoMem;
      // console.log("ac.pay", action.payload);
      // if (action.payload.includes("_")) {
      //   const [prefixMaDongHoMem, suffixMaDongHoMem] =
      //     action.payload.split("_");
      //   const newSuffixMaDongHoMem = parseInt(suffixMaDongHoMem) + 1;
      //   state.setMaDongHoMem = `${prefixMaDongHoMem}_${newSuffixMaDongHoMem
      //     .toString()
      //     .padStart(1, "0")}`;
      // } else {
      //   state.setMaDongHoMem = `${action.payload}_1`;
      // }
      // return maDongHoMem;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiGetWaterClock.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiGetWaterClock.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      // create clock
      .addCase(fetchApiCreateClockWithContract.fulfilled, (state, action) => {
        state?.data?.push(action.payload);
      })
      // delete clock
      .addCase(fetchApiDeleteClockWithContract.fulfilled, (state, action) => {
        const clockId = action.payload;

        const clock = state.data.findIndex((_clock) => _clock.id === clockId);

        if (clock > -1) {
          state.data.splice(clock, 1);
        }
      })
      .addCase(fetchApiExportListClockWater.fulfilled, (state, action) => {
        state.listClockWater = action.payload;
      })
      // get water clock after when selected row
      .addCase(fetchApiSelectRowWaterClock.fulfilled, (state, action) => {
        state.getWaterClock = action.payload;
      })
      // get water clock after when selected row
      .addCase(fetchApiWaterClock.fulfilled, (state, action) => {
        state.getLoadWaterClock = action.payload;
      })
      // get (maDongHo từ hopDongId)
      .addCase(fetchApiGetClockIdFromContractId.fulfilled, (state, action) => {
        state.getClockWaterId = action.payload;
      })
      // get by seri clock
      .addCase(
        fetchApiGetClockWhenOnChangeInputSeri.fulfilled,
        (state, action) => {
          state.getClockBySeri = action.payload;
        }
      )
      // get all clock
      .addCase(fetchApiGetAllClockWater.fulfilled, (state, action) => {
        state.getAllClock = action.payload;
      })
      // get all clock by nhaMayId
      .addCase(fetchClockWaterByNhaMayId.fulfilled, (state, action) => {
        state.getAllClock = action.payload;
      })
      // get (đồng hồ block)
      .addCase(
        fetchApiGetDongHoBlockFromTuyenDoc.fulfilled,
        (state, action) => {
          state.clockBlock = action.payload;
        }
      )
      // ds đh block
      .addCase(fetchApiGetAllDongHoTheoLoai.fulfilled, (state, action) => {
        state.dsDongHoTheoLoai = action.payload;
      })
      .addCase(fetchDropdownListThemDongHoBlock.fulfilled, (state, action) => {
        state.dataForDropdownListDongHoBlock = action.payload;
      })

      .addCase(fetchDropdownListThemDongHoTong.fulfilled, (state, action) => {
        state.dataForDropdownListDongHoTong = action.payload;
      })    },
});

// fetch api get all clock
const fetchApiGetAllClockWater = createAsyncThunk(
  "waterClock/fetchApiGetAllClockWater",
  async () => {
    try {
      const res = await getRequest(`dong-ho-nuoc/get-all`);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get all clock by nhaMayId
const fetchClockWaterByNhaMayId = createAsyncThunk(
  "waterClock/fetchClockWaterByNhaMayId",
  async (nhaMayQuery) => {
    try {
      console.log(nhaMayQuery);
      const res = await getRequest(
        `dong-ho-nuoc/get-dong-ho-blocks-by-nha-may?${nhaMayQuery}`
      );

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get list water clock
const fetchApiGetWaterClock = createAsyncThunk(
  "waterClock/fetchApiGetWaterClock",
  async (keyId) => {
    try {
      if (keyId) {
        const res = await getRequest(`dong-ho-nuoc/get-by/khach-hang/${keyId}`);

        console.log("res water clock ->", res.data.data);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
// fetch api get list water clock
const fetchApiWaterClock = createAsyncThunk(
  "waterClock/fetchApiWaterClock",
  async () => {
    try {
      const { data } = await apolloClient.query({
        query: LOAD_CLOCK_WATER,
      });
      return data.GetDongHoNuocs.nodes[0];
    } catch (error) {
      console.log({ error });
    }
  }
);
// fetch api get list water clock
const fetchApiSelectRowWaterClock = createAsyncThunk(
  "waterClock/fetchApiSelectRowWaterClock",
  async (keyId) => {
    try {
      if (keyId) {
        const { data } = await apolloClient.query({
          query: LOAD_CLOCK_WATER_BY_KEY_ID,
          variables: {
            keyId: keyId,
          },
        });
        // console.log("res select row water clock ->", data);
        return data.GetDongHoNuocs.nodes[0];
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api create clock with contract
const fetchApiCreateClockWithContract = createAsyncThunk(
  "waterClock/fetchApiCreateClockWithContract",
  async ({ values, hopDongId, khachHangKeyId }, { rejectWithValue }) => {
    try {
      const {
        // Info Detail clock
        trangThaiSuDung, // to number
        tuyenDocId,
        keyIdOfClockDetail,
        seriDongHo,
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
        lyDoHuy,
        nuocSX,
        hangSX,
        loaiDongHo,
        kieuDongHo,
        loaiDongHoId,
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

      const res = await postRequest(
        `dong-ho-nuoc/add-with-auto-generate-keyid`,
        {
          trangThaiSuDung, // to number
          keyId: khachHangKeyId, //keyIdOfClockDetail,
          loaiDongHo,
          loaiDongHoId,
          seriDongHo,
          ngaySuDung,
          donViHC,
          nguoiQuanLyId,
          tuyenDocId,
          dongHoChaId,
          soThuTu,
          chiSoDau,
          chiSoCuoi,
          seriChi,
          diaChi: diachiOfDetailClock,
          toaDo: toaDoDHN,
          kinhDo: kinhDoDHN,
          viDo: viDoDHN,
          nuocSX,
          hangSX,
          kieuDongHo,
          duongKinh,
          hopBaoVe, // to number
          viTriLapDat,
          ngayKiemDinh: ngayKiemDinh || new Date(),
          hieuLucKD: hieuLucKD || new Date(),
          lyDoKiemDinh, // to number
          vanMotChieu,
          trangThaiDHLap,
          soTem,
          soPhieuThay,
          lyDoThay,
          lyDoHuy,
          maDHThay,
          nguoiThayId,
          khuyenMai, // to number
          ongDan,
          daiKhoiThuy,
          loaiDiemId,
          hopDongId: hopDongId,
          phamViId, //ko
        }
      );


      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        toast.success("Thêm thành công đồng hồ.");

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.Message);
    }
  }
);

// fetch api delete clock with contract
const fetchApiDeleteClockWithContract = createAsyncThunk(
  "waterClock/fetchApiDeleteClockWithContract",
  async (keyId, { rejectWithValue }) => {
    try {
      if (keyId) {
        const res = await deleteRequest(`dong-ho-nuoc/delete/${keyId}`);

        // console.log("res del clock ->", res.data);

        if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
          toast.success("Xóa thành công đồng hồ.");

          return res.data.data;
        }
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.Message);
    }
  }
);

// fetch api export list clock water
const fetchApiExportListClockWater = createAsyncThunk(
  "waterClock/fetchApiExportListClockWater",
  async (hopDongKeyId) => {
    try {
      if (hopDongKeyId) {
        const res = await getRequest(
          `dong-ho-nuoc/get-by/hop-dong/${hopDongKeyId}`
        );

        console.log("res excel get dong ho by hop dong ->", res.data);

        return res.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// get (maDongHo từ hopDongId)
const fetchApiGetClockIdFromContractId = createAsyncThunk(
  "waterClock/fetchApiGetClockIdFromContractId",
  async (hopDongId) => {
    try {
      if (hopDongId) {
        const res = await getRequest(
          `dong-ho-nuoc/get-auto-generate-keyid-by/${hopDongId}`
        );

        console.log("res id clock ->", res.data.data);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// change clock (thay đồng hồ -> mới)
const fetchApiChangeClockNew = createAsyncThunk(
  "waterClock/fetchApiChangeClockNew",
  async (values, { rejectWithValue }) => {
    try {
      const {
        tuyenDocId,
        hopDongId,
        // Đồng hồ nước cũ
        trangThaiSuDung, // to number
        keyIdOfClock,
        seriDongHo,
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
        lyDoHuy,
        nuocSX,
        hangSX,
        loaiDongHo,
        kieuDongHo,
        loaiDongHoId,
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
        // Đồng hồ nước mới
        trangThaiSuDungMoi, // to number
        keyIdOfClockMoi,
        seriDongHoMoi,
        ngaySuDungMoi,
        donViHCMoi,
        nguoiQuanLyIdMoi,
        phamViIdMoi,
        dongHoChaIdMoi,
        soThuTuMoi,
        chiSoDauMoi,
        chiSoCuoiMoi,
        seriChiMoi,
        diachiOfDetailClockMoi,
        lyDoHuyMoi,
        nuocSXMoi,
        hangSXMoi,
        loaiDongHoMoi,
        kieuDongHoMoi,
        loaiDongHoIdMoi,
        toaDoDHNMoi,
        kinhDoDHNMoi,
        viDoDHNMoi,
        loaiDiemIdMoi,
        duongKinhMoi,
        hopBaoVeMoi, // to number
        viTriLapDatMoi,
        ngayKiemDinhMoi,
        hieuLucKDMoi,
        lyDoKiemDinhMoi, // to number
        vanMotChieuMoi,
        soTemMoi,
        soPhieuThayMoi,
        lyDoThayMoi,
        maDHThayMoi,
        nguoiThayIdMoi,
        khuyenMaiMoi, // to number
        ongDanMoi,
        daiKhoiThuyMoi,
        trangThaiDHLapMoi,
      } = values;

      const res = await putRequest(`dong-ho-nuoc/change`, {
        dongHoNuocCu: {
          trangThaiSuDung, // to number
          keyId: keyIdOfClock,
          loaiDongHo,
          loaiDongHoId,
          seriDongHo,
          ngaySuDung: ngaySuDung || new Date(),
          donViHC,
          nguoiQuanLyId: nguoiThayIdMoi,
          tuyenDocId,
          dongHoChaId,
          soThuTu,
          chiSoDau,
          chiSoCuoi,
          seriChi,
          diaChi: diachiOfDetailClock,
          toaDo: toaDoDHN,
          kinhDo: kinhDoDHN || "0",
          viDo: viDoDHN || "0",
          nuocSX,
          hangSX,
          kieuDongHo,
          duongKinh,
          hopBaoVe, // to number
          viTriLapDat,
          ngayKiemDinh: ngayKiemDinh || new Date(),
          hieuLucKD: hieuLucKD || new Date(),
          lyDoKiemDinh, // to number
          vanMotChieu,
          trangThaiDHLap,
          soTem,
          soPhieuThay,
          lyDoThay,
          lyDoHuy,
          maDHThay,
          nguoiThayId,
          khuyenMai, // to number
          ongDan,
          daiKhoiThuy,
          loaiDiemId,
          hopDongId,
          phamViId, //ko
        },
        dongHoNuocMoi: {
          trangThaiSuDung: trangThaiSuDungMoi, // to number
          keyId: keyIdOfClockMoi,
          loaiDongHo: loaiDongHoMoi,
          loaiDongHoId: loaiDongHoIdMoi,
          seriDongHo: seriDongHoMoi,
          ngaySuDung: ngaySuDungMoi || new Date(),
          donViHC: donViHCMoi,
          nguoiQuanLyId: nguoiThayIdMoi, //nguoiQuanLyIdMoi,
          tuyenDocId,
          dongHoChaId: dongHoChaIdMoi,
          soThuTu: soThuTuMoi,
          chiSoDau: chiSoDauMoi,
          chiSoCuoi: chiSoCuoiMoi,
          seriChi: seriChiMoi,
          diaChi: diachiOfDetailClockMoi,
          toaDo: toaDoDHNMoi,
          kinhDo: kinhDoDHNMoi || "0",
          viDo: viDoDHNMoi || "0",
          nuocSX: nuocSXMoi,
          hangSX: hangSXMoi,
          kieuDongHo: kieuDongHoMoi,
          duongKinh: duongKinhMoi,
          hopBaoVe: hopBaoVeMoi, // to number
          viTriLapDat: viTriLapDatMoi,
          ngayKiemDinh: ngayKiemDinhMoi || new Date(),
          hieuLucKD: hieuLucKDMoi || new Date(),
          lyDoKiemDinh: lyDoKiemDinhMoi, // to number
          vanMotChieu: vanMotChieuMoi,
          trangThaiDHLap: trangThaiDHLapMoi,
          soTem: soTemMoi,
          soPhieuThay: soPhieuThayMoi,
          lyDoThay: lyDoThayMoi,
          lyDoHuy: lyDoHuyMoi,
          maDHThay: maDHThayMoi,
          nguoiThayId: nguoiThayIdMoi,
          khuyenMai: khuyenMaiMoi, // to number
          ongDan: ongDanMoi,
          daiKhoiThuy: daiKhoiThuyMoi,
          loaiDiemId: loaiDiemIdMoi,
          hopDongId,
          phamViId: phamViIdMoi, //ko
        },
      });

      // console.log("res change clock new ->", res.data);

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        toast.success("Cập nhật đồng hồ nước mới thành công.");

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.Message);
    }
  }
);

// change clock (thay đồng hồ -> mới)
const fetchApiChangeClockNewInModalContract = createAsyncThunk(
  "waterClock/fetchApiChangeClockNew",
  async ({ valuesNew, valuesPrev, primaryClockId }, { rejectWithValue }) => {
    console.log("valuesNew", valuesNew);
    console.log("valuesPrev", valuesPrev);
    console.log("primaryClockId", primaryClockId);
    try {
      const {
        tuyenDocId,
        hopDongId,
        // Đồng hồ nước cũ
        trangThaiSuDung, // to number
        keyIdOfClockDetail,
        seriDongHo,
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
        lyDoHuy,
        nuocSX,
        hangSX,
        loaiDongHo,
        kieuDongHo,
        loaiDongHoId,
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
      } = valuesNew;

      const res = await putRequest(`dong-ho-nuoc/change`, {
        dongHoNuocCu: {
          trangThaiSuDung:
            valuesPrev.trangThaiSuDung === "DANG_SU_DUNG"
              ? 1
              : valuesPrev.trangThaiSuDung === "NGUNG_SU_DUNG"
              ? 2
              : 3, // to number
          keyId: valuesPrev.keyId,
          loaiDongHo: valuesPrev.loaiDongHo,
          loaiDongHoId:
            valuesPrev.loaiDongHoId === "TONG"
              ? 1
              : valuesPrev.loaiDongHoId === "BLOCK"
              ? 2
              : 3,
          seriDongHo: valuesPrev.seriDongHo,
          ngaySuDung: valuesPrev.ngaySuDungMoi || new Date(),
          donViHC: valuesPrev.donViHC,
          nguoiQuanLyId: valuesPrev.nguoiQuanLyId,
          tuyenDocId: valuesPrev.tuyenDocId,
          dongHoChaId: valuesPrev.dongHoChaId,
          soThuTu: valuesPrev.soThuTu,
          chiSoDau: valuesPrev.chiSoDau,
          chiSoCuoi: valuesPrev.chiSoCuoi,
          seriChi: valuesPrev.seriChi,
          diaChi: valuesPrev.diaChi,
          toaDo: valuesPrev.toaDo,
          kinhDo: valuesPrev.kinhDo || "0",
          viDo: valuesPrev.viDo || "0",
          nuocSX: valuesPrev.nuocSX,
          hangSX: valuesPrev.hangSX,
          kieuDongHo: valuesPrev.kieuDongHo,
          duongKinh: valuesPrev.duongKinh,
          hopBaoVe: valuesPrev.hopBaoVe, // to number
          viTriLapDat: valuesPrev.viTriLapDat,
          ngayKiemDinh: valuesPrev.ngayKiemDinhMoi || new Date(),
          hieuLucKD: valuesPrev.hieuLucKDMoi || new Date(),
          lyDoKiemDinh: valuesPrev.lyDoKiemDinh, // to number
          vanMotChieu: valuesPrev.vanMotChieu,
          trangThaiDHLap: valuesPrev.trangThaiDHLap,
          soTem: valuesPrev.soTem,
          soPhieuThay: valuesPrev.soPhieuThay,
          lyDoThay: valuesPrev.lyDoThay,
          lyDoHuy: valuesPrev.lyDoHuy,
          maDHThay: valuesPrev.maDHThay,
          nguoiThayId: valuesPrev.nguoiThayId,
          khuyenMai: valuesPrev.khuyenMai, // to number
          ongDan: valuesPrev.ongDan,
          daiKhoiThuy: valuesPrev.daiKhoiThuy,
          loaiDiemId: valuesPrev.loaiDiemId,
          hopDongId: valuesPrev.hopDongId,
          phamViId: valuesPrev.phamViId, //ko
        },
        dongHoNuocMoi: {
          trangThaiSuDung, // to number
          keyId: primaryClockId, // id đồng hồ mới keyIdOfClockDetail,
          loaiDongHo,
          loaiDongHoId,
          seriDongHo,
          ngaySuDung: ngaySuDung || new Date(),
          donViHC,
          nguoiQuanLyId,
          tuyenDocId,
          dongHoChaId,
          soThuTu,
          chiSoDau,
          chiSoCuoi,
          seriChi,
          diaChi: diachiOfDetailClock,
          toaDo: toaDoDHN,
          kinhDo: kinhDoDHN || "0",
          viDo: viDoDHN || "0",
          nuocSX,
          hangSX,
          kieuDongHo,
          duongKinh,
          hopBaoVe, // to number
          viTriLapDat,
          ngayKiemDinh: ngayKiemDinh || new Date(),
          hieuLucKD: hieuLucKD || new Date(),
          lyDoKiemDinh, // to number
          vanMotChieu,
          trangThaiDHLap,
          soTem,
          soPhieuThay,
          lyDoThay,
          lyDoHuy,
          maDHThay,
          nguoiThayId,
          khuyenMai, // to number
          ongDan,
          daiKhoiThuy,
          loaiDiemId,
          hopDongId: valuesPrev.hopDongId,
          phamViId, //ko
        },
      });

      // console.log("res change clock new ->", res.data);

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        toast.success("Cập nhật đồng hồ nước mới thành công.");

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.Message);
    }
  }
);

// get clock when onChange input (input: số seri)
const fetchApiGetClockWhenOnChangeInputSeri = createAsyncThunk(
  "waterClock/fetchApiGetClockWhenOnChangeInputSeri",
  async (seri) => {
    try {
      if (seri) {
        const res = await getRequest(`dong-ho-nuoc/get-dongho-byseri/${seri}`);

        return res.data.data[0];
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// get (đồng hồ block từ tuyến đọc)
const fetchApiGetDongHoBlockFromTuyenDoc = createAsyncThunk(
  "waterClock/fetchApiGetDongHoBlockFromTuyenDoc",
  async (tuyenDocId) => {
    try {
      if (tuyenDocId) {
        const res = await getRequest(
          `dong-ho-nuoc/get-dong-ho-block-theo-tuyen?tuyenDocId=${tuyenDocId}`
        );

        // console.log("res dh block ->", res.data.data);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// get all đh theo loại
const fetchApiGetAllDongHoTheoLoai = createAsyncThunk(
  "waterClock/fetchApiGetAllDongHoTheoLoaiBlock",
  async (loaiDongHo) => {
    try {

      if (loaiDongHo) {
        const res = await getRequest(
          `dong-ho-nuoc/get-all/loai-dong-ho/${loaiDongHo}`
        );


        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchDropdownListThemDongHoBlock = createAsyncThunk(
  "waterClock/fetchDropdownListThemDongHoBlock",
  async (nhaMayId) => {
    try {

      if (nhaMayId) {
        const res = await getRequest(
          `dong-ho-nuoc/drop-down-list-them-moi-dong-ho-block?${nhaMayId}`
        );
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
export const fetchDropdownListThemDongHoTong = createAsyncThunk(
  "waterClock/fetchDropdownListThemDongHoTong",
  async (nhaMayId) => {
    try {

      if (nhaMayId) {
        const res = await getRequest(
          `dong-ho-nuoc/drop-down-list-them-moi-dong-ho-tong?${nhaMayId}`
        );
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export {
  fetchApiGetAllClockWater,
  fetchClockWaterByNhaMayId,
  fetchApiGetWaterClock,
  fetchApiCreateClockWithContract,
  fetchApiDeleteClockWithContract,
  fetchApiExportListClockWater,
  fetchApiSelectRowWaterClock,
  fetchApiWaterClock,
  fetchApiGetClockIdFromContractId,
  fetchApiChangeClockNew,
  fetchApiChangeClockNewInModalContract,
  fetchApiGetClockWhenOnChangeInputSeri,
  fetchApiGetDongHoBlockFromTuyenDoc,
  fetchApiGetAllDongHoTheoLoai,
};

export default waterClockSlice;
