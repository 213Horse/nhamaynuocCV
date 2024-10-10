import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../../services";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import moment from "moment";
const initialState = {
  listReadingIndex: [],
  listReadingIndexBlock: [],
  dsSoDocTheoNhaMay: [],
  filterSoDoc: [],
  filterSoDocBinhThuong: [],
  actionFilter: null,
  isLoading: false,
  dataKGCS: null,
  listToCreateBook: [],
  tabList: null,
  tuyenDocChuaTaoSo: [],
  optionThangNam: null,
  dataOptionKyGhiChiSo: null,
};
const readingIndexBlockSlice = createSlice({
  name: "readingIndexBlockSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(readingIndexBlockQuery.pending, (state) => {
        state.isLoading = true;
      })
      // get list -> sổ đọc block
      .addCase(readingIndexBlockQuery.fulfilled, (state, action) => {
        state.listReadingIndexBlock = action.payload;
        state.isLoading = false;
      })
      .addCase(readingIndexBlockQuery.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
// get all list -> sổ đọc block
const readingIndexBlockQuery = createAsyncThunk(
  "readingIndexSlice/readingIndexBlockQuery",
  async (nhaMayId) => {
    console.log(nhaMayId);
    if (nhaMayId) {
      const res = await getRequest(
        `so-doc-chi-so/get-all-theo-loai-dong-ho?nhaMayId=${nhaMayId}&loaiDongHo=2`
      );
      return res.data.data;
    }
  }
);
export const fetchCreateReadingIndexBlock = createAsyncThunk(
  "readingIndexBlockSlice/fetchCreateReadingIndexBlock",
  async (values) => {
    try {
      const {
        thangTaoSoDoc,
        kyGhiChiSoId,
        nhaMayId,
        ngayDauKy,
        ngayCuoiKy,
        ngayHoaDon,
      } = values;

      console.log({
        thangTaoSoDoc: dayjs(thangTaoSoDoc).format("MM/YYYY"),
        kyGhiChiSoId,
        nhaMayId,
        ngayDauKy: moment(ngayDauKy).toISOString(),
        ngayCuoiKy: moment(ngayCuoiKy).toISOString(),
        ngayHoaDon: moment(ngayHoaDon).toISOString(),
      });

      await postRequest(`so-doc-chi-so/create-so-doc-chi-so-dong-ho-block`, {
        thangTaoSoDoc: dayjs(thangTaoSoDoc).format("MM/YYYY"),
        kyGhiChiSoId,
        nhaMayId,
        ngayDauKy: moment(ngayDauKy).toISOString(),
        ngayCuoiKy: moment(ngayCuoiKy).toISOString(),
        ngayHoaDon: moment(ngayHoaDon).toISOString(),
      });
    } catch (error) {
      toast.error("Tạo sổ thất bại");
    }
  }
);
export { readingIndexBlockQuery };
export default readingIndexBlockSlice;
