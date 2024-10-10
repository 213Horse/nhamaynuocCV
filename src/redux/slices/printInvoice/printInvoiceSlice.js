import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../../../services";

export const printInvoiceSlice = createSlice({
  name: "printInvoiceSlice",
  initialState: {
    printInvoice: [],
    printInvoiceDetail: [],
    viewInvoiceDetail: [],
    isLoadingprintInvoice: false,
    isLoadingprintInvoiceDetail: false,
    isLoadingViewInvoiceDetail: false,
    queryPrintInvoice: "",
    queryPrintInvoiceDetail: "",
    queryViewInvoiceDetail: "",
  },
  reducers: {
    setQueryPrintInvoice: (state, action) => {
      state.queryPrintInvoice = action.payload;
    },
    setQueryPrintInvoiceDetail: (state, action) => {
      state.queryPrintInvoiceDetail = action.payload;
    },
    setQueryViewInvoiceDetail: (state, action) => {
      state.queryViewInvoiceDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrintInvoice.pending, (state, action) => {
        state.isLoadingprintInvoice = true;
      })
      .addCase(fetchPrintInvoice.fulfilled, (state, action) => {
        state.printInvoice = action.payload;
        state.isLoadingprintInvoice = false;
      })
      .addCase(fetchPrintInvoiceDetail.pending, (state, action) => {
        state.isLoadingprintInvoiceDetail = true;
      })
      .addCase(fetchPrintInvoiceDetail.fulfilled, (state, action) => {
        state.printInvoiceDetail = action.payload;
        state.isLoadingprintInvoiceDetail = false;
      })
      .addCase(fetchViewInvoiceDetail.pending, (state, action) => {
        state.isLoadingViewInvoiceDetail = true;
      })
      .addCase(fetchViewInvoiceDetail.fulfilled, (state, action) => {
        state.viewInvoiceDetail = action.payload;
        state.isLoadingViewInvoiceDetail = false;
      });
  },
});

//Fetch list invoice by nhaMayId
export const fetchPrintInvoice = createAsyncThunk(
  "printInvoice/fetchPrintInvoice",
  async (queryString, { rejectWithValue }) => {
    try {
      if (queryString) {
        const res = await getRequest(
          `so-doc-chi-so/get-all-so-thanh-toan?${queryString}`
        );
        console.log("get list hoa don theo nhaMayId", res.data);

        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
      return rejectWithValue(err.response.data.Message);
    }
  }
);
export const fetchPrintInvoiceDetail = createAsyncThunk(
  "printInvoiceDetail/fetchPrintInvoiceDetail",
  async (queryString, { rejectWithValue }) => {
    try {
      if (queryString) {
        const res = await getRequest(
          `hoa-don/get-all-so-thanh-toan?${queryString}`
        );
        console.log("get detail hoa don", res.data);

        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
      return rejectWithValue(err.response.data.Message);
    }
  }
);
export const fetchViewInvoiceDetail = createAsyncThunk(
  "viewInvoiceDetail/fetchViewInvoiceDetail",
  async (idHoaDon, { rejectWithValue }) => {
    try {
      if (idHoaDon) {
        const res = await getRequest(`hoa-don/print-hoa-don/${idHoaDon}`);
        console.log("get view detail hoa don", res.data);

        return res.data.data;
      }
    } catch (err) {
      console.log({ err });
      return rejectWithValue(err.response.data.Message);
    }
  }
);
