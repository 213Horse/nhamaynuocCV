import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services";

export const invoicePrintSlice = createSlice({
  name: "invoicePrintSlice",
  initialState: {
    invoicePrintList: {},
    isLoadingInvoicePrintList: false,
    queryInvoicePrintList: "",
    invoicePrintDetail: null,
  },
  reducers: {
    setQueryInvoicePrintList: (state, action) => {
      state.queryInvoicePrintList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListInvoicePrint.pending, (state, action) => {
        state.isLoadingInvoicePrintList = true;
      })
      .addCase(fetchListInvoicePrint.fulfilled, (state, action) => {
        state.invoicePrintList = action.payload;
        state.isLoadingInvoicePrintList = false;
      })
      .addCase(fetchFilterListInvoicePrint.pending, (state, action) => {
        state.isLoadingInvoicePrintList = true;
      })
      .addCase(fetchFilterListInvoicePrint.fulfilled, (state, action) => {
        state.invoicePrintList = action.payload;
        state.isLoadingInvoicePrintList = false;
      })
      .addCase(fetchFilterInHoaDon.pending, (state, action) => {
        state.isLoadingInvoicePrintList = true;
      })
      .addCase(fetchFilterInHoaDon.fulfilled, (state, action) => {
        state.invoicePrintList = action.payload;
        state.isLoadingInvoicePrintList = false;
      })
      .addCase(fetchFilterInKetHoaDon.pending, (state, action) => {
        state.isLoadingInvoicePrintList = true;
      })
      .addCase(fetchFilterInKetHoaDon.fulfilled, (state, action) => {
        state.invoicePrintList = action.payload;
        state.isLoadingInvoicePrintList = false;
      })
      .addCase(
        fetchFilterInLaiHoaDonTheoMaKhachHang.pending,
        (state, action) => {
          state.isLoadingInvoicePrintList = true;
        }
      )
      .addCase(
        fetchFilterInLaiHoaDonTheoMaKhachHang.fulfilled,
        (state, action) => {
          state.invoicePrintList = action.payload;
          state.isLoadingInvoicePrintList = false;
        }
      )
      .addCase(fetchFilterInLaiHoaDon.pending, (state, action) => {
        state.isLoadingInvoicePrintList = true;
      })
      .addCase(fetchFilterInLaiHoaDon.fulfilled, (state, action) => {
        state.invoicePrintList = action.payload;
        state.isLoadingInvoicePrintList = false;
      });
  },
});

//Fetch list InvoicePrint by nhaMayId
export const fetchListInvoicePrint = createAsyncThunk(
  "invoicePrint/getListInvoicePrint",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(`in-hoa-don/get-all?${queryString}`);
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

//Fetch list InvoicePrint by nhaMayId
export const fetchFilterListInvoicePrint = createAsyncThunk(
  "invoicePrint/getFilterListInvoicePrint",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(
          `in-hoa-don/filter-in-hoa-don?${queryString}`
        );
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
//Fetch list filter In hoa don
export const fetchFilterInHoaDon = createAsyncThunk(
  "invoicePrint/getfetchFilterInHoaDon",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(`in-hoa-don/in-hoa-don?${queryString}`);
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
//Fetch list filter In ket hoa don
export const fetchFilterInKetHoaDon = createAsyncThunk(
  "invoicePrint/getfetchFilterInKetHoaDon",
  async (queryString) => {
    console.log(queryString);
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(
          `in-hoa-don/in-ket-hoa-don?${queryString}`
        );
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
//Fetch list filter In lai hoa don
export const fetchFilterInLaiHoaDon = createAsyncThunk(
  "invoicePrint/getfetchFilterInLaiHoaDon",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(
          `in-hoa-don/in-lai-hoa-don?${queryString}`
        );
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
//Fetch list filter In lai hoa don theo ma khach hang
export const fetchFilterInLaiHoaDonTheoMaKhachHang = createAsyncThunk(
  "invoicePrint/getfetchFilterInLaiHoaDonTheoMaKhachHang",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(
          `in-hoa-don/in-lai-hoa-don-theo-ma-khach-hang?${queryString}`
        );
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
