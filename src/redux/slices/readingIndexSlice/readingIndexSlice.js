import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import dayjs from "dayjs";
// var qs = require("qs");
import * as qs from "qs";

import {
  deleteRequest,
  getRequest,
  getRequestParams,
  postRequest,
  postRequestMultipartFormData,
  putRequest,
  putRequestMultipartFormData,
} from "../../../services";
import axios from "axios";
import { tenSoQuery } from "../../../graphql/readingIndex/readingIndexQuery";
import apolloClient from "../../../config/apolloClient";
import { format, parseISO } from "date-fns";
import moment from "moment";
import { useSelector } from "react-redux";
import { btnClickTabReadingIndexSelector } from "../../selector";
const authToken = sessionStorage.getItem("token");
const initialState = {
  listAllSoDoc: [],
  listAllSoDocFilter: [],
  listReadingIndex: [],
  listReadingIndexBlock: [],
  dsSoDocTheoNhaMay: [],
  filterSoDoc: [],
  filterSoDocBinhThuong: {},
  actionFilter: null,
  isLoading: false,
  dataKGCS: null,
  listToCreateBook: [],
  tabList: null,
  tuyenDocChuaTaoSo: [],
  optionThangNam: null,
  dataOptionKyGhiChiSo: null,
  chiSoDongHoTuSoDoc: [],
  isLoadingChiSoDongHoTuSoDoc: false,
  chiSoDongHoById: {},
  imageGhiChiSo: null,
  dsTrangThaiGhi: [],
  filterDsChiSoDongHo: [],
  isLoadingFilterDsChiSoDH: false,
  btnFilterDsChiSoDh: null,
  queryReadingIndexList: null,
  tenSoOptions: [],
  isLoadingTenSoOptions: false,
  keyIdTuyenDoc: null,
  tuyendocselection: [],
  tuyenDoc: [],
  tuyenDocAdd: [],
  dataForMenu: [],
};

const readingIndexSlice = createSlice({
  name: "readingIndexSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(readingIndexQuery.pending, (state) => {
        state.isLoading = true;
      })
      // get list -> sổ đọc
      .addCase(readingIndexQuery.fulfilled, (state, action) => {
        state.listReadingIndex = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllIndexVer2.fulfilled, (state, action) => {
        state.listAllSoDoc = action.payload;
      })
      .addCase(getFilterIndex.fulfilled, (state, action) => {
        state.listAllSoDocFilter = action.payload;
      })
      // get tenSo Options -> select filter
      // .addCase(fetchTenSoOptions.fulfilled, (state, action) => {
      //   state.tenSoOptions = action.payload;
      //   state.isLoadingTenSoOptions = false;
      // })
      // get list -> sổ đọc theo nhaMayId
      .addCase(fetchApiGetListSoDocTheoNhaMay.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiGetListSoDocTheoNhaMay.fulfilled, (state, action) => {
        state.dsSoDocTheoNhaMay = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchApiGetListSoDocTheoNhaMay.rejected, (state, action) => {
        state.dsSoDocTheoNhaMay = [];
        state.isLoading = false;
      })

      // Tạo sổ đồng loạt
      .addCase(fetchApiTaoSoDocChiSoDongLoat.fulfilled, (state, action) => {
        if (action?.payload?.length > 0) {
          console.log("ac.pay", action.payload[0]);
          state?.dsSoDocTheoNhaMay.unshift(action.payload[0]);
        }
      })
      // Tạo sổ đồng thường
      .addCase(fetchApiTaoSoDocBinhThuong.fulfilled, (state, action) => {
        if (action?.payload?.length > 0) {
          console.log("ac.pay", action.payload[0]);
          state.dsSoDocTheoNhaMay.unshift(action.payload[0]);
        }
      })
      // Chốt sổ
      .addCase(fetchApiChotSoDoc.fulfilled, (state, action) => {
        const soDoc = action.payload;

        if (soDoc) {
          try {
            // Theo nhà máy
            const findSoDoc = state.dsSoDocTheoNhaMay.find(
              (_soDoc) => _soDoc.id == soDoc.id
            );

            // Khi người dùng filter -> Thực hiện chức năng Chốt sổ
            const findFilterSoDoc = state.filterSoDoc.find(
              (_soDoc) => _soDoc.id == soDoc.id
            );

            if (findSoDoc) {
              findSoDoc.chotSo = soDoc.chotSo;
              findSoDoc.ngayChot = soDoc.ngayChot;
            }

            if (findFilterSoDoc) {
              findFilterSoDoc.chotSo = soDoc.chotSo;
              findFilterSoDoc.ngayChot = soDoc.ngayChot;
            }
          } catch {}
        }
      })
      // Khóa sổ
      .addCase(fetchApiKhoaSoDoc.fulfilled, (state, action) => {
        const soDoc = action.payload;

        if (soDoc) {
          try {
            // Theo nhà máy
            const findSoDoc = state.dsSoDocTheoNhaMay.find(
              (_soDoc) => _soDoc.id === soDoc.id
            );

            // Khi người dùng filter -> Thực hiện chức năng Khóa sổ
            const findFilterSoDoc = state.filterSoDoc.find(
              (_soDoc) => _soDoc.id === soDoc.id
            );

            if (findSoDoc) {
              findSoDoc.trangThaiKhoaSo = soDoc.trangThaiKhoaSo;
            }

            if (findFilterSoDoc) {
              findFilterSoDoc.trangThaiKhoaSo = soDoc.trangThaiKhoaSo;
            }
          } catch {}
        }
      })
      // Mở khóa
      .addCase(fetchApiMoKhoaSoDoc.fulfilled, (state, action) => {
        const soDoc = action.payload;
        try {
          if (soDoc) {
            // Theo nhà máy
            const findSoDoc = state.dsSoDocTheoNhaMay.find(
              (_soDoc) => _soDoc.id === soDoc.id
            );

            // Khi người dùng filter -> Thực hiện chức năng Mở khóa
            const findFilterSoDoc = state.filterSoDoc.find(
              (_soDoc) => _soDoc.id === soDoc.id
            );

            if (findSoDoc) {
              findSoDoc.trangThaiKhoaSo = soDoc.trangThaiKhoaSo;
            }

            if (findFilterSoDoc) {
              findFilterSoDoc.trangThaiKhoaSo = soDoc.trangThaiKhoaSo;
            }
          }
        } catch {}
      })
      // filter -> sổ đọc
      .addCase(fetchApiFilterSoDoc.fulfilled, (state, action) => {
        state.filterSoDoc = action.payload;
        state.isLoading = false;
      })
      // filter -> sổ đọc bình thường
      .addCase(fetchApiFilterSoDocBinhThuong.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiFilterSoDocBinhThuong.fulfilled, (state, action) => {
        state.filterSoDocBinhThuong = action.payload;
        state.isLoading = false;
      })
      .addCase(readingIndexQuery.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getKGCSToCreateBook.fulfilled, (state, action) => {
        state.dataKGCS = action.payload;
      })
      .addCase(getListToCreateBook.fulfilled, (state, action) => {
        state.listToCreateBook = action.payload;
      })
      // Tuyến đọc chưa tạo sổ
      .addCase(fetchApiGetListTuyenDocChuaTaoSo.fulfilled, (state, action) => {
        state.tuyenDocChuaTaoSo = action.payload;
      })
      // Sau khi chọn Kỳ ghi chỉ số
      .addCase(fetchApiGetNgayTrongSoDocTheoKy.fulfilled, (state, action) => {
        if (action.payload) {
          state.dataOptionKyGhiChiSo = action.payload;
        }
      })
      // get chỉ số đh từ sổ đọc
      .addCase(fetchApiGetChiSoDongHoTuSoDoc.pending, (state, action) => {
        state.isLoadingChiSoDongHoTuSoDoc = true;
      })
      .addCase(fetchApiGetChiSoDongHoTuSoDoc.fulfilled, (state, action) => {
        state.chiSoDongHoTuSoDoc = action.payload;
        state.isLoadingChiSoDongHoTuSoDoc = false;
      })
      .addCase(fetchApiGetChiSoDongHoById.fulfilled, (state, action) => {
        state.chiSoDongHoById = action.payload;
      })
      // Danh sách trạng thái ghi
      .addCase(fetchApiDsTrangThaiGhi.fulfilled, (state, action) => {
        state.dsTrangThaiGhi = action.payload;
      })
      // Ghi chỉ số (create)
      .addCase(fetchApiGhiChiSo.fulfilled, (state, action) => {
        const _newChiSoDH = action.payload;
        const _oldChiSoDH = state.chiSoDongHoById;

        if (_newChiSoDH) {
          const _listOldChiSoDH = state.chiSoDongHoTuSoDoc.find(
            (__oldChiSoDH) => __oldChiSoDH.keyId === _newChiSoDH.keyId //soDocChiSoId //keyId
          );

          // update theo id
          if (_newChiSoDH?.keyId === _oldChiSoDH?.keyId) {
            _oldChiSoDH.chiSoMoi = _newChiSoDH.chiSoMoi;
            _oldChiSoDH.tthu = _newChiSoDH.tthu;
            // _oldChiSoDH.dienThoai = _newChiSoDH.dienThoai;
            _oldChiSoDH.ghiChu = _newChiSoDH.ghiChu;

            // update trangThaiGhi
            _oldChiSoDH.responseTrangThaiGhiModel.id =
              _newChiSoDH.responseTrangThaiGhiModel.id;
            _oldChiSoDH.responseTrangThaiGhiModel.keyId =
              _newChiSoDH.responseTrangThaiGhiModel.keyId;
            _oldChiSoDH.responseTrangThaiGhiModel.maMau =
              _newChiSoDH.responseTrangThaiGhiModel.maMau;
            _oldChiSoDH.responseTrangThaiGhiModel.tenTrangThai =
              _newChiSoDH.responseTrangThaiGhiModel.tenTrangThai;
            _oldChiSoDH.responseTrangThaiGhiModel.khongChoPhepGhi =
              _newChiSoDH.responseTrangThaiGhiModel.khongChoPhepGhi;
            _oldChiSoDH.responseTrangThaiGhiModel.khongChoPhepHienThi =
              _newChiSoDH.responseTrangThaiGhiModel.khongChoPhepHienThi;
          }

          // update list
          if (_listOldChiSoDH) {
            _listOldChiSoDH.chiSoMoi = _newChiSoDH.chiSoMoi;
            _listOldChiSoDH.tthu = _newChiSoDH.tthu;
            // _listOldChiSoDH.dienThoai = _newChiSoDH.dienThoai;
            _listOldChiSoDH.ghiChu = _newChiSoDH.ghiChu;

            // update trangThaiGhi
            _listOldChiSoDH.responseTrangThaiGhiModel.id =
              _newChiSoDH.responseTrangThaiGhiModel.id;
            _listOldChiSoDH.responseTrangThaiGhiModel.keyId =
              _newChiSoDH.responseTrangThaiGhiModel.keyId;
            _listOldChiSoDH.responseTrangThaiGhiModel.maMau =
              _newChiSoDH.responseTrangThaiGhiModel.maMau;
            _listOldChiSoDH.responseTrangThaiGhiModel.tenTrangThai =
              _newChiSoDH.responseTrangThaiGhiModel.tenTrangThai;
            _listOldChiSoDH.responseTrangThaiGhiModel.khongChoPhepGhi =
              _newChiSoDH.responseTrangThaiGhiModel.khongChoPhepGhi;
            _listOldChiSoDH.responseTrangThaiGhiModel.khongChoPhepHienThi =
              _newChiSoDH.responseTrangThaiGhiModel.khongChoPhepHienThi;

            // update ngayDoc (Ngày cập nhật)
            _listOldChiSoDH.ngayDoc = _newChiSoDH.ngayDoc;
          }
        }
      })
      // filter ds chỉ số đh
      .addCase(fetchApiFilterDsChiSoDongHo.pending, (state, action) => {
        state.isLoadingFilterDsChiSoDH = true;
      })
      .addCase(fetchApiFilterDsChiSoDongHo.fulfilled, (state, action) => {
        state.filterDsChiSoDongHo = action.payload;
        state.isLoadingFilterDsChiSoDH = false;
      })
      .addCase(fetchMaSoTuIdTuyenDoc.fulfilled, (state, action) => {
        state.keyIdTuyenDoc = action.payload;
      })
      .addCase(fetchTuyendocselection.fulfilled, (state, action) => {
        state.tuyendocselection = action.payload;
      })
      .addCase(fetchTuyendoc.fulfilled, (state, action) => {
        state.tuyenDoc = action.payload;
      })
      .addCase(fetchTuyendocAddselection.fulfilled, (state, action) => {
        state.tuyenDocAdd = action.payload;
      })
      .addCase(fetchDataForMenuSoDoc.fulfilled, (state, action) => {
        state.dataForMenu = action.payload;
      })
  },
  reducers: {
    btnClickTabReadingIndex: (state, action) => {
      // console.log("changeReading", action.payload);
      state.tabList = action.payload;
    },
    setOptionThangNam: (state, action) => {
      state.optionThangNam = action.payload;
    },
    btnClickFilterSoDoc: (state, action) => {
      state.actionFilter = action.payload;
    },
    setImageGhiChiSo: (state, action) => {
      state.imageGhiChiSo = action.payload;
    },
    btnClickFilterChiSoDongHo: (state, action) => {
      state.btnFilterDsChiSoDh = action.payload;
    },
    setQueryReadingIndexList: (state, action) => {
      console.log(action.payload);
      state.queryReadingIndexList = action.payload;
    },
    btnClickResetKyGS: (state, action) => {
      state.dataOptionKyGhiChiSo = action.payload;
    },
  },
});

// get all list -> sổ đọc
const readingIndexQuery = createAsyncThunk(
  "readingIndexSlice/readingIndexQuery",
  async () => {
    try {
      const res = await getRequest(`so-doc-chi-so/get-all`);

      console.log("res all so doc ->", res.data.data);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// get all list -> sổ đọc
export const getAllIndexVer2 = createAsyncThunk(
  "readingIndexSlice/getAllIndexVer2",
  async (values) => {
    try {
      let {
        soTrang,
        soLuong,
        nhaMayId,
        thangTaoSo,
        canBoDocId,
        tuyenDocId,
        trangThai,
        khuVucId,
        kyGCSId,
        tenSo,
        tenKhanhHang
      } = values;

      const userId = sessionStorage.getItem("userId");
      console.log("userId", userId);
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
        `so-doc-chi-so/get-all-ver2?soTrang=${
          soTrang !== undefined ? soTrang : 1
        }&soLuong=${soLuong !== undefined ? soLuong : 10}${
          factoryQueryString ? `&nhaMayId=${factoryQueryString}` : ""
        }${thangTaoSo ? `&thangTaoSo=${thangTaoSo}` : ""}${
          canBoDocId ? `&canBoDocId=${canBoDocId}` : ""
        }${tuyenDocId ? `&tuyenDocId=${tuyenDocId}` : ""}${
          trangThai ? `&trangThai=${trangThai}` : ""
        }${khuVucId ? `&khuVucId=${khuVucId}` : ""}${
          kyGCSId ? `&kyGCSId=${kyGCSId}` : ""
        }${tenSo ? `&tenSo=${tenSo}` : ""}${userId ? `&userID=${userId}` : ""}${tenKhanhHang ? `&tenKhanhHang=${tenKhanhHang}` : ""}`
      );

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getFilterIndex = createAsyncThunk(
  "readingIndexSlice/getFilterIndex",
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
        `so-doc-chi-so/data-filter-get-so-doc?nhaMayId=${
          factoryQueryString ? `${factoryQueryString}` : ""
        }`
      );

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// get all list -> sổ đọc theo nhà máy id
const fetchApiGetListSoDocTheoNhaMay = createAsyncThunk(
  "readingIndexSlice/fetchApiGetListSoDocTheoNhaMay",
  async (queryString, { rejectWithValue }) => {
    try {
      if (queryString) {
        const res = await getRequest(
          `so-doc-chi-so/get-so-doc-chi-so-by-nha-may-id?${queryString}`
        );
        console.log("get list so theo nhaMayId", res.data);

        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
      return rejectWithValue(err.response.data.Message);
    }
  }
);
const getKGCSToCreateBook = createAsyncThunk(
  "readingIndexSlice/GetKGCSToCreateBook",
  async ({ id, month, year }) => {
    try {
      const res = await postRequest(
        `so-doc-chi-so/get-ky-ghi-chi-so-de-tao-so-doc/${id}?thang=${month}&nam=${year}`
      );
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

const getListToCreateBook = createAsyncThunk(
  "readingIndexSlice/GetListToCreateBook",
  async ({ nhaMayId, month, year }) => {
    try {
      const res = await getRequest(
        `so-doc-chi-so/get-list-tao-so-dong-loat?nhaMayId=${nhaMayId}&month=${month}&year=${year}`
      );
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

const createBookMutiple = createAsyncThunk(
  "readingIndexSlice/CreateBookMutiple",
  async (dataPost) => {
    try {
      const res = await postRequest(
        "so-doc-chi-so/create-so-doc-chi-so",
        dataPost
      );
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Tạo sổ đọc thành công");
      }
    } catch (error) {
      toast.error("Tạo sổ thất bại");
      console.log({ error });
    }
  }
);

// get list -> Tuyến đọc chưa tạo sổ
const fetchApiGetListTuyenDocChuaTaoSo = createAsyncThunk(
  "readingIndexSlice/fetchApiGetListTuyenDocChuaTaoSo",
  async ({ values, nhaMayId }) => {
    try {
      if (values && nhaMayId) {
        const { monthYear, KgcsId } = values;

        // format date
        const formatDate = dayjs(monthYear).format("MM/YYYY");
        const newMonthYear = String(formatDate);

        const res = await getRequest(
          `tuyen-doc-chua-tao-so/get-all?kyGhiChiSoId=${
            KgcsId || ""
          }&nhaMayId=${nhaMayId}&time=${newMonthYear}`
        );

        console.log("res tuyen doc chua tao so ->", res.data.data);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// get -> Ngày trong sổ đọc theo kỳ
const fetchApiGetNgayTrongSoDocTheoKy = createAsyncThunk(
  "readingIndexSlice/fetchApiGetNgayTrongSoDocTheoKy",
  async ({ value, optionThangNam }) => {
    try {
      if (value && optionThangNam) {
        // format date
        const formatDate = dayjs(optionThangNam).format("MM/YYYY");
        const newMonthYear = String(formatDate);

        const res = await postRequest(
          `so-doc-chi-so/tao-ngay-trong-so-doc-theo-ky?id=${value}&time=${newMonthYear}`,
          null
        );

        if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
          console.log("res tao dd/mm/yyyy ->", res.data);

          return res.data.data;
        }
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

// fetch api -> Tạo sổ đọc chỉ số đồng loạt
const fetchApiTaoSoDocChiSoDongLoat = createAsyncThunk(
  "readingIndexSlice/fetchApiTaoSoDocChiSoDongLoat",
  async ({ values, optionThangNam, selectedRowKeys, nhaMayId }) => {
    try {
      console.log("selectedRowKeys ->", selectedRowKeys);
      const { kgcsId, startDate, endDate, invoiceDate } = values;

      const userId = sessionStorage.getItem("userId");
      const formatDate = dayjs(optionThangNam).format("MM/YYYY");
      const newMonthYear = String(formatDate);

      const res = await postRequest(
        "so-doc-chi-so/create-so-doc-chi-so-dong-loat",
        {
          thangTaoSoDoc: newMonthYear,
          listTuyenDocId: selectedRowKeys,
          userId,
          kyGhiChiSoId: kgcsId,
          ngayDauKy: startDate,
          ngayCuoiKy: endDate,
          ngayHoaDon: invoiceDate,
          nhaMayId: [nhaMayId]

        }
      );

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        console.log("res create tao so dong loat ->", res.data);
        toast.success("Tạo thành công sổ đọc.");

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// filter list -> sổ đọc
const fetchApiFilterSoDoc = createAsyncThunk(
  "readingIndexSlice/fetchApiFilterSoDoc",
  async (queryString) => {
    try {
      if (queryString) {
        const res = await getRequest(`so-doc-chi-so/filter?${queryString}`);
        console.log("readingIndexSlice/fetchApiFilterSoDoc===>", res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// filter -> Sổ đọc bình thường
const fetchApiFilterSoDocBinhThuong = createAsyncThunk(
  "readingIndexSlice/fetchApiFilterSoDocBinhThuong",
  async ({ values, nhaMayId }) => {
    try {
      if (values && nhaMayId) {
        const {
          keyIdHopDong,
          loaiDH,
          loaiKhachHang,
          monthYear,
          canBoDoc,
          tuyenDocId,
        } = values;
        // hop-dong​/filter-hop-dong-for-create-so-doc
        const formattedMonthYear = dayjs(monthYear).format("MM/YYYY");
        const res = await getRequestParams(
          `hop-dong/filter-hop-dong-for-create-so-doc`,
          {
            TuyenDocId: tuyenDocId,
            NhaMayIds: nhaMayId,
            ThangTaoSoDoc: formattedMonthYear,
            loaiKH: loaiKhachHang,
            keyIdHopDong: keyIdHopDong,
          }
        );

        console.log("res filter tao so binh thuong", res.data);

        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

// fetch api -> Tạo sổ bình thường
const fetchApiTaoSoDocBinhThuong = createAsyncThunk(
  "readingIndexSlice/fetchApiTaoSoDocBinhThuong",
  async ({ values, selectedRowKeys, tuyenDocId, optionThangNam, nhaMayId }) => {
    try {
      const {
        kyGhiChiSoId,
        ngayCuoiKy,
        ngayDauKy,
        ngayHoaDon,
        nguoiQuanLyId,
        tenSo,
      } = values;

      // format date
      const formatDate = dayjs(optionThangNam).format("MM/YYYY");
      const newMonthYear = String(formatDate);
      const userId = sessionStorage.getItem("userId");
      const res = await postRequest(`so-doc-chi-so/create-new-so-doc-chi-so`, {
        tuyenDocId: tuyenDocId,
        nguoiQuanLyId: nguoiQuanLyId,
        tenSo: tenSo,
        hopDongId: selectedRowKeys,
        userId,
        kyGhiChiSoId: kyGhiChiSoId,
        ngayDauKy: ngayDauKy,
        ngayCuoiKy: ngayCuoiKy,
        ngayHoaDon: ngayHoaDon,
        thangTaoSoDoc: newMonthYear,
        nhaMayId: nhaMayId,
      });

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        console.log("res create so doc thuong ->", res.data.data);
        toast.success("Tạo sổ đọc thành công.");

        return res.data.data;
      }
    } catch ({ err }) {
      console.log({ err });
    }
  }
);

// fetch api -> Khóa sổ đọc
const fetchApiKhoaSoDoc = createAsyncThunk(
  "readingIndexSlice/fetchApiKhoaSoDoc",
  async (values) => {
    try {
      const { key, id } = values;
      const res = await putRequest(
        `so-doc-chi-so/khoa-so-theo-so-doc-id?id=${key}&danhMucSeriHoaDonId=${id}`
      );

      console.log("res khoa so doc ->", res.data.data);
      toast.success("Khóa sổ đọc thành công.");

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// fetch api -> Mở khóa sổ đọc
const fetchApiMoKhoaSoDoc = createAsyncThunk(
  "readingIndexSlice/fetchApiMoKhoaSoDoc",
  async (key) => {
    try {
      const res = await putRequest(
        `so-doc-chi-so/mo-so-theo-so-doc-id?id=${key}`
      );

      console.log("res mở khoa so doc ->", res.data.data);
      toast.success("Mở khóa sổ đọc thành công.");

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// fetch api -> Chốt sổ đọc
const fetchApiChotSoDoc = createAsyncThunk(
  "readingIndexSlice/fetchApiChotSoDoc",
  async (values) => {
    try {
      if (values) {
        const { soDocChiSoId, isStatus } = values;
        const res = await putRequest(
          `so-doc-chi-so/update/chot-so-so-doc-chi-so?soDocChiSoId=${soDocChiSoId}&isStatus=${isStatus}`
        );
        if (isStatus === false) {
          toast.success("Hủy chốt thành công");
        } else {
          toast.success("Chốt sổ thành công");
        }

        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

const fetchApiKhoaSo = createAsyncThunk(
  "readingIndexSlice/fetchApiKhoaSo",
  async (soDocChiSoId) => {
    try {
      if (soDocChiSoId) {
        const res = await putRequest(
          `so-doc-chi-so/update/khoa-so-so-doc-chi-so-cho-dong-ho-tong-va-block?soDocChiSoId=${soDocChiSoId}`
        );
        if (res.data.statusCode === 200) {
          toast.success("Khóa sổ thành công");
        }
        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

const fetchApiMoKhoa = createAsyncThunk(
  "readingIndexSlice/fetchApiMoKhoa",
  async (soDocChiSoId) => {
    try {
      if (soDocChiSoId) {
        const res = await putRequest(
          `so-doc-chi-so/update/mo-khoa-so-so-doc-chi-so-cho-dong-ho-tong-va-block?soDocChiSoId=${soDocChiSoId}`
        );
        if (res.data.statusCode === 200) {
          toast.success("Khóa sổ thành công");
        }
        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

// fetch api -> Get chỉ số đồng hồ từ sổ đọc
const fetchApiGetChiSoDongHoTuSoDoc = createAsyncThunk(
  "readingIndexSlice/fetchApiGetChiSoDongHoTuSoDoc",
  async (values) => {
    try {
      if (values) {
        let {Thang, soDocId, isBlockType, factoryIdArr } = values;
        const res =
          isBlockType === 3
            ? await getRequest(
                `chi-so-dong-ho/get-chi-so-dong-ho-by-so-doc-chi-so-id?${Thang ? `Thang=${Thang}` : ""}&SoDocChiSoId=${soDocId}&pageNumber=1&pageSize=100000000`
              )
            : isBlockType === 2
            ? await getRequest(
                `chi-so-dong-ho/get-chi-so-dong-ho-by-so-doc-chi-so-dong-ho-block-va-tong-id?${Thang ? `Thang=${Thang}` : ""}&SoDocChiSoId=${soDocId}&LoaiDongHo=2&${factoryIdArr}&pageNumber=1&pageSize=100000000`
              )
            : await getRequest(
                `chi-so-dong-ho/get-chi-so-dong-ho-by-so-doc-chi-so-dong-ho-block-va-tong-id?${Thang ? `Thang=${Thang}` : ""}&SoDocChiSoId=${soDocId}&LoaiDongHo=1&${factoryIdArr}&pageNumber=1&pageSize=100`
              );
        console.log("res chi so dh tu so doc -> ", res.data.data.items);

        return res.data.data.items;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api -> get chỉ số đồng hồ by id
const fetchApiGetChiSoDongHoById = createAsyncThunk(
  "readingIndexSlice/fetchApiGetChiSoDongHoById",
  async (chiSoDongHoId) => {
    try {
      if (chiSoDongHoId) {
        const res = await getRequest(
          `chi-so-dong-ho/get-chi-so-dong-ho-by-id/${chiSoDongHoId}`
        );

        console.log("res chi so dh by id->", res.data.data);

        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

const createFormUpload = (values) => {
  const formData = new FormData();
  const { ChiSoDongHoId, image } = values;
  formData.append("ChiSoDongHoId", ChiSoDongHoId);
  formData.append("image", image);
  return formData;
};

const fetchApiUploadImage = createAsyncThunk(
  "readingIndexSlice/fetchApiUploadImage",
  async (values) => {
    try {
      if (values) {
        const formDataValues = createFormUpload(values);
        const res = await putRequestMultipartFormData(
          `${process.env.REACT_APP_BASE_URL}so-doc-chi-so/update/image-chi-so-local`,
          formDataValues
        );
        if (res.data.statusCode === 200) {
          toast.success("Upload hình ảnh thành công");
        }
        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

// form (Ở ghi chỉ số)
const createFormGhiChiSo = (
  values,
  ChiSoDongHoId,
  imageGhiChiSo,
  urlImage,
  TrangThaiGhiId
) => {
  const formData = new FormData();

  const { ChiSoMoi, GhiChu, DienThoai } = values;
  const UserId = sessionStorage.getItem("userId");
  console.log("DienThoai", DienThoai);
  console.log("TrangThaiGhiId", TrangThaiGhiId);

  formData.append("ChiSoDongHoId", ChiSoDongHoId);
  formData.append("UserId", UserId);
  formData.append("RequestBody.ChiSoMoi", ChiSoMoi);
  formData.append("RequestBody.GhiChu", GhiChu);
  formData.append("RequestBody.image", imageGhiChiSo);
  formData.append("RequestBody.ImageUrl", imageGhiChiSo ? null : urlImage);
  formData.append("RequestBody.DienThoai", DienThoai);
  formData.append("RequestBody.TrangThaiGhiId", TrangThaiGhiId);

  return formData;
};

// fetch api -> ghi chỉ số
const fetchApiGhiChiSo = createAsyncThunk(
  "readingIndexSlice/fetchApiGhiChiSo",
  async ({
    values,
    ChiSoDongHoId,
    imageGhiChiSo,
    TrangThaiGhiId,
    urlImage,
  }) => {
    try {
      const formData = createFormGhiChiSo(
        values,
        ChiSoDongHoId,
        imageGhiChiSo,
        urlImage,
        TrangThaiGhiId
      );

      const res = await putRequestMultipartFormData(
        `${process.env.REACT_APP_BASE_URL}so-doc-chi-so/chi-so-dong-ho/ghi-chi-so`,
        formData
      );

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
        console.log("res ghi chi so", res.data.data);
        toast.success("Ghi chỉ số thành công.");
        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

const createFormUpdate = (values) => {
  const formData = new FormData();
  formData.append("KeyId", values.KeyId);
  formData.append("Data.KeyId", values.KeyId);
  formData.append("Data.TenNhaMay", values.TenNhaMay);
  formData.append("Data.DiaChi", values.DiaChi);
  formData.append("Data.DiaChiChiTiet", values.DiaChiChiTiet);
  formData.append("Data.MaNhaMay", values.MaNhaMay);
  formData.append("Data.PhanLoaiNhaMay", values.PhanLoaiNhaMay);
  formData.append("Data.MaSoThue", values.MaSoThue);
  formData.append("Data.TaiKhoanNganHang", values.TaiKhoanNganHang);
  formData.append("Data.ChuTaiKhoanNganHang", values.ChuTaiKhoanNganHang);
  formData.append("Data.DienThoai", values.DienThoai);
  formData.append("Data.CongSuatThietKy", values.CongSuatThietKy);
  formData.append("Data.DienTichNha_m2", values.DienTichNha_m2);
  formData.append("Data.DienTichDat_m2", values.DienTichDat_m2);
  formData.append("Data.NamXayDung", values.NamXayDung);
  formData.append("Data.NamVanHanh", values.NamVanHanh);
  formData.append("Data.PhamViPhucVu", values.PhamViPhucVu);
  formData.append("Data.DanhSachToaDo", values.DanhSachToaDo);
  formData.append("Data.TenNganHang", values.TenNganHang);
  formData.append("Data.TenGiamDoc", values.TenGiamDoc);
  formData.append("Data.ChiNhanhNganHang", values.ChiNhanhNganHang);
  formData.append("Data.Image", values.Image);
  return formData;
};

const fetchUpdate = createAsyncThunk(
  "readingIndexSlice/fetchUpdate",
  async (values) => {
    try {
      const formData = createFormUpdate(values);
      const res = await putRequestMultipartFormData(
        `${process.env.REACT_APP_BASE_URL}nha-may/update`,
        formData
      );

      if (
        res?.data?.statusCode === 202 ||
        res?.data?.statusCode === 201 ||
        res?.data?.statusCode === 200
      ) {
        toast.success("Cập nhật nhà máy thành công");
        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

const createFormAdd = (values) => {
  const formData = new FormData();
  formData.append("KeyId", values.KeyId);
  formData.append("TenNhaMay", values.TenNhaMay);
  formData.append("DiaChi", values.DiaChi);
  formData.append("DiaChiChiTiet", values.DiaChiChiTiet);
  formData.append("MaNhaMay", values.MaNhaMay);
  formData.append("PhanLoaiNhaMay", values.PhanLoaiNhaMay);
  formData.append("MaSoThue", values.MaSoThue);
  formData.append("TaiKhoanNganHang", values.TaiKhoanNganHang);
  formData.append("ChuTaiKhoanNganHang", values.ChuTaiKhoanNganHang);
  formData.append("DienThoai", values.DienThoai);
  formData.append("CongSuatThietKy", values.CongSuatThietKy);
  formData.append("DienTichNha_m2", values.DienTichNha_m2);
  formData.append("DienTichDat_m2", values.DienTichDat_m2);
  formData.append("NamXayDung", values.NamXayDung);
  formData.append("NamVanHanh", values.NamVanHanh);
  formData.append("PhamViPhucVu", values.PhamViPhucVu);
  formData.append("DanhSachToaDo", values.DanhSachToaDo);
  formData.append("TenNganHang", values.TenNganHang);
  formData.append("TenGiamDoc", values.TenGiamDoc);
  formData.append("ChiNhanhNganHang", values.ChiNhanhNganHang);
  formData.append("Image", values.Image);
  return formData;
};

const fetchAdd = createAsyncThunk(
  "readingIndexSlice/fetchAdd",
  async (values) => {
    try {
      const formData = createFormAdd(values);
      const res = await postRequestMultipartFormData(
        `${process.env.REACT_APP_BASE_URL}nha-may/add`,
        formData
      );

      if (
        res?.data?.statusCode === 202 ||
        res?.data?.statusCode === 201 ||
        res?.data?.statusCode === 200
      ) {
        toast.success("Tạo nhà máy thành công");
        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
    }
  }
);

const fetchApiDsTrangThaiGhi = createAsyncThunk(
  "readingIndexSlice/fetchApiDsTrangThaiGhi",
  async (queryString) => {
    try {
      const res = await getRequest(`trang-thai-ghi/get-all?${queryString}`);

      // console.log("res trang thai ghi ->", res.data.data);

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

// fetch api -> filter ds chỉ số đh
const fetchApiFilterDsChiSoDongHo = createAsyncThunk(
  "readingIndexSlice/fetchApiFilterDsChiSoDongHo",
  async (queryString) => {
    try {
      const res = await getRequest(
        `chi-so-dong-ho/filter?${queryString}`,
      );

      console.log("res filter chi so đh ->", res.data.data);

      return res.data.data.items;
    } catch (error) {
      console.log({ error });
    }
  }
);

//get tenSo from graphql
// export const fetchTenSoOptions = createAsyncThunk(
//   "payment/getTenSoOptions",
//   async (inputData) => {
//     try {
//       console.log(inputData);
//       const { data } = await apolloClient.query({
//         query: tenSoQuery(inputData),
//         variables: {
//           first: 20,
//         },
//       });
//       return data.GetSoDocChiSos;
//     } catch (error) {
//       console.log({ error });
//     }
//   }
// );

const handleDeleteReadingIndex = createAsyncThunk(
  "readingIndexSlice/deleteReadingIndex",
  async (readingIndexId) => {
    try {
      console.log("readingIndexId", readingIndexId);
      if (readingIndexId) {
        const res = await deleteRequest(
          `so-doc-chi-so/delete-so-doc?soDocChiSoId=${readingIndexId}`
        );

        console.log("res trang thai ghi ->", res.data.data);
        toast.success("Xoá sổ đọc thành công!");
        return res.data.data;
      }
    } catch (err) {
      toast.error("Xoá sổ đọc không thành công!");
      console.log({ err });
    }
  }
);

// get  ma so tu id tuyen
const fetchMaSoTuIdTuyenDoc = createAsyncThunk(
  "readingIndex/fetchMaSoTuIdTuyenDoc",
  async (idTuyenDoc) => {
    try {
      const res = await getRequest(
        `tuyen-doc/get-by-id?tuyenDocId=${idTuyenDoc}`
      );
      console.log("id tuyen doc", res.data.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

const fetchTuyendocselection = createAsyncThunk(
  "readingIndexSlice/fetchTuyendocselection",
  async (queryString) => {
    try {
      console.log("queryString", queryString);
      if (queryString) {
        const res = await getRequest(
          `tuyen-doc/get-all-by-nha-may?nhaMayIds=${queryString}`
        );
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

const fetchTuyendocAddselection = createAsyncThunk(
  "readingIndexSlice/fetchTuyendocAddselection",
  async (queryString) => {
    try {
      console.log("queryString", queryString);
      if (queryString) {
        const res = await getRequest(
          `tuyen-doc/get-by-nha-may?nhaMayId=${queryString}`
        );
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

const fetchTuyendoc = createAsyncThunk(
  "readingIndexSlice/fetchTuyendoc",
  async (queryString) => {
    try {
      if (queryString) {
        const res = await getRequest(
          `tuyen-doc/get-all-by-nha-may?${queryString}`
        );
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchDataForMenuSoDoc = createAsyncThunk(
  "readingIndexSlice/fetchDataForMenuSoDoc",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(`so-doc-chi-so/data-filter-get-so-doc?${queryString}`);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);



export {
  readingIndexQuery,
  fetchApiGetListSoDocTheoNhaMay,
  getKGCSToCreateBook,
  getListToCreateBook,
  createBookMutiple,
  fetchApiGetListTuyenDocChuaTaoSo,
  fetchApiGetNgayTrongSoDocTheoKy,
  fetchApiTaoSoDocChiSoDongLoat,
  fetchApiFilterSoDoc,
  fetchApiFilterSoDocBinhThuong,
  fetchApiTaoSoDocBinhThuong,
  fetchApiKhoaSoDoc,
  fetchApiChotSoDoc,
  fetchApiMoKhoaSoDoc,
  fetchApiGetChiSoDongHoTuSoDoc,
  fetchApiGetChiSoDongHoById,
  fetchApiGhiChiSo,
  fetchApiDsTrangThaiGhi,
  fetchApiFilterDsChiSoDongHo,
  handleDeleteReadingIndex,
  fetchApiKhoaSo,
  fetchApiMoKhoa,
  fetchMaSoTuIdTuyenDoc,
  fetchTuyendocselection,
  fetchApiUploadImage,
  fetchTuyendoc,
  fetchTuyendocAddselection,
  fetchUpdate,fetchAdd
};

export default readingIndexSlice;
