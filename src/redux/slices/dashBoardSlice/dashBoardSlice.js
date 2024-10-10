import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services"; // Import các hàm cần thiết từ services

const dashBoardSlice = createSlice({
  name: "dashBoard",
  initialState: {
    dashBoardData: [],
    dashBoardDataTieuThu: [],
    tongSoHopDong: [],
    tongSoDongHo: [],
    listTuyenDoc: [],
    loading: false,
    error: null,
    loadingTotalContract: false,
    errorTotalContract: null,
    loadingTotalClock: false,
    errorTotalClock: null,
    loadingTieuThu: false,
    errorTieuThu: null,
    loadingTuyenDoc: false,
    errorListTuyenDoc: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashBoardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashBoardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashBoardData = action.payload;
      })
      .addCase(getDashBoardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTongSoHopDong.pending, (state) => {
        state.loadingTotalContract = true;
        state.errorTotalContract = null;
      })
      .addCase(getTongSoHopDong.fulfilled, (state, action) => {
        state.loadingTotalContract = false;
        state.tongSoHopDong = action.payload;
      })
      .addCase(getTongSoHopDong.rejected, (state, action) => {
        state.loadingTotalContract = false;
        state.errorTotalContract = action.errorTotalContract.message;
      })
      .addCase(getTongSoDongHo.pending, (state) => {
        state.loadingTotalClock = true;
        state.errorTotalClock = null;
      })
      .addCase(getTongSoDongHo.fulfilled, (state, action) => {
        state.loadingTotalClock = false;
        state.tongSoDongHo = action.payload;
      })
      .addCase(getTongSoDongHo.rejected, (state, action) => {
        state.loadingTotalClock = false;
        state.errorTotalClock = action.errorTotalClock.message;
      })
      .addCase(getDashBoardDataTieuThu.pending, (state) => {
        state.loadingTieuThu = true;
        state.errorTieuThu = null;
      })
      .addCase(getDashBoardDataTieuThu.fulfilled, (state, action) => {
        state.loadingTieuThu = false;
        state.dashBoardDataTieuThu = action.payload;
      })
      .addCase(getDashBoardDataTieuThu.rejected, (state, action) => {
        state.loadingTieuThu = false;
        state.errorTieuThu = action.errorTieuThu.message;
      })
      .addCase(fetchListTuyenDocByNhaMay.pending, (state) => {
        state.loadingTuyenDoc = true;
        state.errorListTuyenDoc = null;
      })
      .addCase(fetchListTuyenDocByNhaMay.fulfilled, (state, action) => {
        state.loadingTuyenDoc = false;
        state.listTuyenDoc = action.payload;
      })
      .addCase(fetchListTuyenDocByNhaMay.rejected, (state, action) => {
        state.loadingTuyenDoc = false;
        state.errorListTuyenDoc = action.errorListTuyenDoc.message;
      });
  },
});

const getDashBoardData = createAsyncThunk(
  "dashBoard/getDashBoardData",
  async (queryString) => {
    try {
      const res = await getRequest(
        `dong-ho-nuoc/thong-ke-doanh-thu-theo-tung-thang-va-nha-may?${queryString}`
      );
      console.log("Data Dashboard:", res.data.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);
const getDashBoardDataTieuThu = createAsyncThunk(
  "dashBoard/getDashBoardDataTieuThu",
  async (queryString) => {
    try {
      const res = await getRequest(
        `chi-so-dong-ho/tieu-thu-theo-thang?${queryString}`
      );
      console.log("Data Tieu thu:", res.data.data);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);
const getTongSoHopDong = createAsyncThunk(
  "tongSoHopDong/getTongSoHopDong",
  async (queryString) => {
    try {
      const res = await getRequest(`hop-dong/so-luong-hop-dong?${queryString}`);
      console.log("Data Tong so hop dong:", res.data.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);
const getTongSoDongHo = createAsyncThunk(
  "tongSoDongHo/getTongSoDongHo",
  async (queryString) => {
    try {
      const res = await getRequest(
        `dong-ho-nuoc/thong-ke-dong-ho-theo-tuyen-va-nha-may?${queryString}`
      );
      console.log("Data tong so dong ho:", res.data.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);
const fetchListTuyenDocByNhaMay = createAsyncThunk(
  "tongSoHopDong/fetchListTuyenDocByNhaMay",
  async (queryString) => {
    try {
      console.log("queryString", queryString);
      if (queryString) {
        const res = await getRequest(
          `tuyen-doc/get-all-by-nha-may?${queryString}&pageNumber=1&pageSize=100000`
        );
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export {
  getDashBoardData,
  getTongSoHopDong,
  getTongSoDongHo,
  getDashBoardDataTieuThu,
  fetchListTuyenDocByNhaMay,
};

export default dashBoardSlice;
