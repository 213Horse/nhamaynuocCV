import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../../services";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import moment from "moment";
import TableRevenueMoney from "../../../components/CustomerRevenueMoneyWater/TableRevenueMoney/TableRevenueMoney";

const readingIndexTotalSlice = createSlice({
  name: "readingIndexTotalSlice",
  initialState: {
    isLoading: false,
    isFilter: false,
    isFilterBlock:false,
    listReadingIndexTotal: [],
    filterSoDocTotal: [],
    filterValue: [], //save value of filter form
  },
  reducers: {
    btnClickClearFilter: (state, action) => {
      state.filterSoDocTotal = [];
      state.isFilter = false;
      state.isFilterBlock = false;
      state.filterValue = null;
    },
    btnClickFilter: (state, action) => {
      state.filterValue = action.payload;
    },
    btnClickFilterBlock: (state, action) => {
      state.filterValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllReadingIndexTotal.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllReadingIndexTotal.fulfilled, (state, action) => {
      state.listReadingIndexTotal = action.payload || [];
      state.isFilter = false;
      state.isLoading = false;
    });
    builder.addCase(fetchAllReadingIndexTotalBlock.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchAllReadingIndexTotalBlock.fulfilled,
      (state, action) => {
        state.listReadingIndexTotal = action.payload || [];
        state.isFilterBlock = false;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchReadingIndexTotalFilter.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchReadingIndexTotalFilter.fulfilled, (state, action) => {
      state.filterSoDocTotal = action.payload || [];
      state.isFilter = true;
      state.isLoading = false;
    });
    builder.addCase(
      fetchReadingIndexTotalFilterBlock.pending,
      (state, action) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchReadingIndexTotalFilterBlock.fulfilled,
      (state, action) => {
        state.filterSoDocTotal = action.payload || [];
        state.isFilterBlock = true;
        state.isLoading = false;
      }
    );
  },
});

export const fetchReadingIndexTotalFilter = createAsyncThunk(
  "readingIndexTotalSlice/fetchReadingIndexTotalFilter",
  async (values) => {
    try {
      console.log("FILTER: ", values);
      const {
        monthYear,
        nguoiQuanLyId,
        nhaMayId,
        pageNumber,
        // ky,
        // status,
        // tenSo,
        // tuyenDocId,
      } = values;
      const formatDate = dayjs(monthYear).format("MM/YYYY");
      // console.log('FILTER: ', formatDate);
      const res = await getRequest(
        `so-doc-chi-so/filter-so-doc-chi-so-cua-dong-ho-tong?thangTaoSoDoc=${formatDate}${
          nguoiQuanLyId ? `&nguoiQuanLyId=${nguoiQuanLyId}` : ""
        }${
          nhaMayId !== "all"
            ? `${nhaMayId ? `&nhaMayIds=${nhaMayId}` : ""}`
            : ""
        }&pageNumber=${pageNumber ? pageNumber : 1}&pageSize=10`
      );

      let filteredData = res?.data?.data;
      // if (tuyenDocId) {
      //   console.log(tuyenDocId);
      //   filteredData = {
      //     ...filteredData,
      //     items: filteredData?.items.filter(
      //       (item) => item.tuyenDocId === tuyenDocId
      //     ),
      //   };
      // }

      // if (status) {
      //   console.log(status, typeof status);
      //   filteredData = {
      //     ...filteredData,
      //     items: filteredData.items.filter((item) => item.trangThai === status),
      //   };
      // }

      // if (ky) {
      //   filteredData = filteredData.filter((item) => item.kyGhiChiSoId === ky);
      // }

      // if (tenSo) {
      //   filteredData = filteredData.filter((item) =>
      //     item.tenSo.includes(tenSo)
      //   );
      // }

      console.log("FILTER LIST: ", filteredData);
      return filteredData;
    } catch (error) {
      console.log({ error });
      return [];
    }
  }
);
export const fetchReadingIndexTotalFilterBlock = createAsyncThunk(
  "readingIndexTotalSlice/fetchReadingIndexTotalFilterBlock",
  async (values) => {
    try {
      // console.log('FILTER: ', values);
      const {
        monthYear,
        nguoiQuanLyId,
        nhaMayId,
        pageNumber,
        // ky,
        // status,
        // tenSo,
        // tuyenDocId,
      } = values;
      const formatDate = dayjs(monthYear).format("MM/YYYY");
      // console.log('FILTER: ', formatDate);
      const res = await getRequest(
        `so-doc-chi-so/filter-so-doc-chi-so-cua-dong-ho-block?thangTaoSoDoc=${formatDate}${
          nguoiQuanLyId ? `&nguoiQuanLyId=${nguoiQuanLyId}` : ""
        }${
          nhaMayId !== "all"
            ? `${nhaMayId ? `&nhaMayIds=${nhaMayId}` : ""}`
            : ""
        }&pageNumber=${pageNumber ? pageNumber : 1}&pageSize=10`
      );

      let filteredData = res?.data?.data;
      // if (tuyenDocId) {
      //   filteredData = filteredData.filter(
      //     (item) => item.tuyenDocId === tuyenDocId
      //   );
      // }

      // if (status) {
      //   filteredData = filteredData.filter((item) => item.trangThai === status);
      // }

      // if (ky) {
      //   filteredData = filteredData.filter((item) => item.kyGhiChiSoId === ky);
      // }

      // if (tenSo) {
      //   filteredData = filteredData.filter((item) =>
      //     item.tenSo.includes(tenSo)
      //   );
      // }

      console.log("FILTER LIST: ", res?.data?.data);
      return filteredData;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchAllReadingIndexTotal = createAsyncThunk(
  "readingIndexTotalSlice/fetchAllReadingIndexTotal",
  async (values) => {
    try {
      let { nhaMayId, pageNumber } = values;

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
      const res =
        nhaMayId === "all"
          ? await getRequest(
              `so-doc-chi-so/get-all-theo-loai-dong-ho??nhaMayIds=${factoryQueryString}&loaiDongHo=1&pageNumber=${
                pageNumber ? pageNumber : 1
              }&pageSize=10`
            )
          : await getRequest(
              `so-doc-chi-so/get-all-theo-loai-dong-ho?nhaMayIds=${factoryQueryString}&loaiDongHo=1&pageNumber=${
                pageNumber ? pageNumber : 1
              }&pageSize=10`
            );
      console.log("TOTAL: ", res.data.data);
      return res?.data?.data || [];
    } catch (error) {
      console.log({ error });
      return [];
    }
  }
);
export const fetchAllReadingIndexTotalBlock = createAsyncThunk(
  "readingIndexTotalSlice/fetchAllReadingIndexTotalBlock",
  async (values) => {
    try {
      let { nhaMayId, pageNumber } = values;
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
      const res =
        nhaMayId === "all"
          ? await getRequest(
              `so-doc-chi-so/get-all-theo-loai-dong-ho??nhaMayIds=${factoryQueryString}&loaiDongHo=2&pageNumber=${
                pageNumber ? pageNumber : 1
              }&pageSize=10`
            )
          : await getRequest(
              `so-doc-chi-so/get-all-theo-loai-dong-ho?nhaMayIds=${factoryQueryString}&loaiDongHo=2&pageNumber=${
                pageNumber ? pageNumber : 1
              }&pageSize=10`
            );
      console.log("TOTAL: ", res.data.data);
      return res?.data?.data || [];
    } catch (error) {
      console.log({ error });
      return [];
    }
  }
);

export const fetchCreateReadingIndexTotal = createAsyncThunk(
  "readingIndexTotalSlice/fetchCreateReadingIndexTotal",
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
      const userId = sessionStorage.getItem('userId')
      const res = await postRequest(
        `so-doc-chi-so/create-so-doc-chi-so-dong-ho-tong`,
        {
          thangTaoSoDoc: dayjs(thangTaoSoDoc).format("MM/YYYY"),
          kyGhiChiSoId,
          nhaMayId,
          userId,
          ngayDauKy: dayjs(ngayDauKy).toISOString("DD/MM/YYYY"),
          ngayCuoiKy: dayjs(ngayCuoiKy).toISOString("DD/MM/YYYY"),
          ngayHoaDon: dayjs(ngayHoaDon).toISOString("DD/MM/YYYY"),
        }
      );
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Tạo sổ thành công");
      }
    } catch (error) {
      toast.error("Tạo sổ thất bại");
    }
  }
);
export const fetchCreateReadingIndexTotalBlock = createAsyncThunk(
  "readingIndexTotalSlice/fetchCreateReadingIndexTotalBlock",
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

      const userId = sessionStorage.getItem('userId')
      console.log({
        thangTaoSoDoc: dayjs(thangTaoSoDoc).format("MM/YYYY"),
        kyGhiChiSoId,
        nhaMayId,
        ngayDauKy: moment(ngayDauKy).toISOString(),
        ngayCuoiKy: moment(ngayCuoiKy).toISOString(),
        ngayHoaDon: moment(ngayHoaDon).toISOString(),
      });

      const res = await postRequest(
        `so-doc-chi-so/create-so-doc-chi-so-dong-ho-block`,
        {
          thangTaoSoDoc: dayjs(thangTaoSoDoc).format("MM/YYYY"),
          kyGhiChiSoId,
          nhaMayId,
          userId,
          ngayDauKy: moment(ngayDauKy).toISOString("DD/MM/YYYY"),
          ngayCuoiKy: moment(ngayCuoiKy).toISOString("DD/MM/YYYY"),
          ngayHoaDon: moment(ngayHoaDon).toISOString("DD/MM/YYYY"),
        }
      );
      console.log(res);
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Tạo sổ thành công");
      }
    } catch (error) {
      toast.error("Tạo sổ thất bại");
    }
  }
);
export default readingIndexTotalSlice;
