import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, getRequestParams, putRequest } from "../../../services";
import apolloClient from "../../../config/apolloClient";
import { gql } from "@apollo/client";
import {
  contractKeyIdQuery,
  nameOrKeyIdOfCustomerQuery,
  readingNameQuery,
} from "./selectOptionsEnterIndexPage";
import { toast } from "react-toastify";

const tabListEnterIndexPageSlice = createSlice({
  name: "tabListInvoicePrintSlice",
  initialState: {
    tabList: null,
    indexPageList: null,
    isLoadingIndexTable: false,
    totalCountOfIndexTables: 1,
    readingStatusOptions: null,
    readingNameOptions: null,
    contractKeyIdOptions: null,
    nameOrKeyIdOfCustomerOptions: null,
    dataForMenu:[],
    dataTheoDongHo:[],
    dataStatTheoDongHo:[],
    indexPageThongKeList:[]
  },
  reducers: {
    btnClickTabListEnterIndexPage: (state, action) => {
      state.tabList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // get filter payment list
      .addCase(fetchFilterListIndexPage.pending, (state, action) => {
        state.isLoadingIndexTable = true;
      })
      .addCase(fetchFilterListIndexPage.fulfilled, (state, action) => {
        state.indexPageList = action.payload.data;
        // state.totalCountOfIndexTables = action.payload.totalCount;
        state.isLoadingIndexTable = false;
      })
      .addCase(fetchFilterThongKeListIndexPage.fulfilled, (state, action) => {
        state.indexPageThongKeList = action.payload;
      })
      .addCase(fetchSelectReadingStatusOptions.fulfilled, (state, action) => {
        state.readingStatusOptions = action.payload;
      })
      .addCase(fetchSelectReadingNameOptions.fulfilled, (state, action) => {
        state.readingNameOptions = action.payload;
      })
      .addCase(fetchSelectContractKeyIdOptions.fulfilled, (state, action) => {
        state.contractKeyIdOptions = action.payload;
      })
      .addCase(fetchFilterListIndexDropdownPage.fulfilled, (state, action) => {
        state.dataForMenu = action.payload;
      })
      .addCase(fetchDataTheoDongHoNuoc.fulfilled, (state, action) => {
        state.dataTheoDongHo = action.payload;
      })
      .addCase(fetchChartDataFromDongHoNuoc.fulfilled, (state, action) => {
        state.dataStatTheoDongHo = action.payload;
      })
      .addCase(
        fetchSelectNameOrKeyIdOfCustomerOptions.fulfilled,
        (state, action) => {
          state.nameOrKeyIdOfCustomerOptions = action.payload;
        }
      );
  },
});

//Fetch filter list enter index page
export const fetchFilterListIndexPage = createAsyncThunk(
  "tabListEnterIndexPageSlice/getFilterListIndexPage",
  async (queryString) => {
    try {
      if (queryString) {
        const res = await getRequest(
          `chi-so-dong-ho/filter-nhap-chi-so-entity-only?${queryString}`
        );
        return res.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchFilterThongKeListIndexPage = createAsyncThunk(
  "tabListEnterIndexPageSlice/fetchFilterThongKeListIndexPage",
  async (queryString) => {
    try {
      if (queryString) {
        const res = await getRequest(
          `chi-so-dong-ho/filter-nhap-chi-so-entity-only-thong-ke?${queryString}`
        );
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchFilterListIndexDropdownPage = createAsyncThunk(
  "tabListEnterIndexPageSlice/fetchFilterListIndexDropdownPage",
  async (queryString) => {
    try {
      if (queryString) {
        const res = await getRequest(
          `chi-so-dong-ho/drop-down-list-nhap-chi-so?${queryString}`
        );
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchChartDataFromDongHoNuoc = createAsyncThunk(
  "tabListEnterIndexPageSlice/fetchChartDataFromDongHoNuoc",
  async (queryString) => {
    try {
      if (queryString) {
        const {dongHoNuocId, nam} = queryString
        const res = await getRequestParams(
          `chi-so-dong-ho/get-chart-chi-so-dong-ho-theo-dong-ho-nuoc-id`,{dongHoNuocId:dongHoNuocId, nam:nam}
        );
        return res.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchDataTheoDongHoNuoc = createAsyncThunk(
  "tabListEnterIndexPageSlice/fetchDataTheoDongHoNuoc",
  async (queryString) => {
    try {
      if (queryString) {
        const {dongHoNuocId, nam} = queryString
        const res = await getRequestParams(
          `chi-so-dong-ho/get-data-chi-so-dong-ho-theo-dong-ho-nuoc-id`,{dongHoNuocId:dongHoNuocId, nam:nam}
        );
        return res.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const updateChiSoMoi = createAsyncThunk(
  "tabListEnterIndexPageSlice/updateChiSoMoi",
  async (values) => {
    try {
      const { chiSoDongHoId, userId, chiSoMoi, chiSoCu, doiTuongGiaId } =
        values;
      const res = await putRequest(`chi-so-dong-ho/put-chi-so-moi`, {
        chiSoDongHoId,
        userId,
        chiSoMoi,
        chiSoCu,
        doiTuongGiaId,
      });
      if(res.StatusCode === 200){
        toast.success("Cập nhật thành công.");
      }
     

      return res.data.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

//get Trang thai ghi options
export const fetchSelectReadingStatusOptions = createAsyncThunk(
  "tabListEnterIndexPageSlice/getSelectReadingStatusOptions",
  async () => {
    try {
      const { data } = await apolloClient.query({
        query: gql`
          query {
            GetTrangThaiGhis(where: { deletedTime: { eq: null } }) {
              nodes {
                id
                tenTrangThai
              }
            }
          }
        `,
      });
      console.log(data.GetTrangThaiGhis);
      return data.GetTrangThaiGhis;
    } catch (error) {
      console.log({ error });
    }
  }
);

//get so ghi options
export const fetchSelectReadingNameOptions = createAsyncThunk(
  "tabListEnterIndexPageSlice/getSelectReadingNameOptions",
  async (inputData) => {
    try {
      console.log(inputData);
      const { data } = await apolloClient.query({
        query: readingNameQuery(inputData),
        variables: {
          first: 10,
        },
      });
      return data.GetSoDocChiSos;
    } catch (error) {
      console.log({ error });
    }
  }
);

//get ma hop dong options
export const fetchSelectContractKeyIdOptions = createAsyncThunk(
  "tabListEnterIndexPageSlice/getSelectContractKeyIdOptions",
  async (inputData) => {
    try {
      console.log(inputData);
      const { data } = await apolloClient.query({
        query: contractKeyIdQuery(inputData),
        variables: {
          first: 10,
        },
      });
      return data.GetHopDongs;
    } catch (error) {
      console.log({ error });
    }
  }
);

//get ten or ma khach hang options
export const fetchSelectNameOrKeyIdOfCustomerOptions = createAsyncThunk(
  "tabListEnterIndexPageSlice/getSelectNameOrKeyIdOfCustomerOptions",
  async (inputData) => {
    try {
      console.log(inputData);
      const { data } = await apolloClient.query({
        query: nameOrKeyIdOfCustomerQuery(inputData),
        variables: {
          first: 10,
        },
      });
      return data.GetKhachHangs;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default tabListEnterIndexPageSlice;
