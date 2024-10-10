import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../../../services";
import apolloClient from "../../../config/apolloClient";
import { payment } from "../../../graphql/payment/payment";
import {
  billCollectorQuery,
  customerNameQuery,
  lineReadingQuery,
  meterReaderQuery,
  phoneNumberQuery,
} from "../../../graphql/payment/selectOptions";
import { toast } from "react-toastify";

export const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState: {
    totalPageOfPaymentList: null,
    queryPaymentList: "",
    paymentList: [],
    paymentDetail: [],
    selectAreaOptions: [],
    selectInvoiceSeriesOptions: [],
    selectRegionOptions: [],
    selectMeterReaderOptions: {},
    selectBillCollectorOptions: {},
    selectSeriesInvoiceOptions: [],
    selectLineReadingOptions: [],
    selectPaymentTypeOptions: [],
    selectPriceObjectOptions: [],
    selectCustomerNameOptions: [],
    selectPhoneNumberOptions: [],
    isLoadingPhoneNumberSelect: false,
    isLoadingCustomerNameSelect: false,
    isLoadingPriceObjectSelect: false,
    isLoadingPaymentTypeSelect: false,
    isLoadingLineReadingSelect: false,
    isLoadingMeterReaderSelect: false,
    isLoadingSeriesInvoiceSelect: false,
    isLoadingBillCollectorSelect: false,
    isLoadingAreaSelect: false,
    isLoadingInvoiceSeriesSelect: false,
    isLoadingRegionSelect: false,
    isLoadingPaymentDetail: false,
    isLoadingPaymentList: false,
  },
  reducers: {
    setListPayment: (state, action) => {
      state.data = action.payload;
    },
    setQueryPaymentList: (state, action) => {
      state.queryPaymentList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getAllPayment.fulfilled, (state, action) => {
      //   state.data = action.payload;
      // });

      // get filter payment list
      .addCase(fetchFilterListPayment.pending, (state, action) => {
        state.isLoadingPaymentList = true;
      })
      .addCase(fetchFilterListPayment.fulfilled, (state, action) => {
        state.paymentList = action.payload.data;
        state.totalPageOfPaymentList = action.payload.message;
        console.log(state.totalPageOfPaymentList);
        state.isLoadingPaymentList = false;
      })

      // get payment detail
      .addCase(fetchPaymentDetail.pending, (state, action) => {
        state.isLoadingPaymentDetail = true;
      })
      .addCase(fetchPaymentDetail.fulfilled, (state, action) => {
        state.paymentDetail = action.payload;
        state.isLoadingPaymentDetail = false;
      })

      // get options for select khu vuc
      .addCase(fetchSelectAreaOptions.pending, (state, action) => {
        state.isLoadingAreaSelect = true;
      })
      .addCase(fetchSelectAreaOptions.fulfilled, (state, action) => {
        state.selectAreaOptions = action.payload;
        state.isLoadingAreaSelect = false;
      })

      // get options for select vung
      .addCase(fetchSelectRegionOptions.pending, (state, action) => {
        state.isLoadingRegionSelect = true;
      })
      .addCase(fetchSelectRegionOptions.fulfilled, (state, action) => {
        state.selectRegionOptions = action.payload;
        state.isLoadingRegionSelect = false;
      })

      // get options for select Can bo doc
      .addCase(fetchSelectMeterReaderOptions.pending, (state, action) => {
        state.isLoadingMeterReaderSelect = true;
      })
      .addCase(fetchSelectMeterReaderOptions.fulfilled, (state, action) => {
        state.selectMeterReaderOptions = action.payload;
        state.isLoadingMeterReaderSelect = false;
      })

      // get options for select Can bo thu
      .addCase(fetchSelectBillCollectorOptions.pending, (state, action) => {
        state.isLoadingBillCollectorSelect = true;
      })
      .addCase(fetchSelectBillCollectorOptions.fulfilled, (state, action) => {
        state.selectBillCollectorOptions = action.payload;
        state.isLoadingBillCollectorSelect = false;
      })

      // get options for select Ma so hoa don
      .addCase(fetchSelectSeriesInvoiceOptions.pending, (state, action) => {
        state.isLoadingSeriesInvoiceSelect = true;
      })
      .addCase(fetchSelectSeriesInvoiceOptions.fulfilled, (state, action) => {
        state.selectSeriesInvoiceOptions = action.payload;
        state.isLoadingSeriesInvoiceSelect = false;
      })

      // get options for select Tuyen doc
      // .addCase(fetchSelectLineReadingOptions.pending, (state, action) => {
      //   state.isLoadingLineReadingSelect = true;
      // })
      // .addCase(fetchSelectLineReadingOptions.fulfilled, (state, action) => {
      //   state.selectLineReadingOptions = action.payload;
      //   state.isLoadingLineReadingSelect = false;
      // })

      // get options for select Hinh thuc thanh toan
      .addCase(fetchSelectPaymentTypeOptions.pending, (state, action) => {
        state.isLoadingPaymentTypeSelect = true;
      })
      .addCase(fetchSelectPaymentTypeOptions.fulfilled, (state, action) => {
        state.selectPaymentTypeOptions = action.payload;
        state.isLoadingPaymentTypeSelect = false;
      })

      // get options for select Doi tuong gia
      .addCase(fetchSelectPriceObjectOptions.pending, (state, action) => {
        state.isLoadingPriceObjectSelect = true;
      })
      .addCase(fetchSelectPriceObjectOptions.fulfilled, (state, action) => {
        state.selectPriceObjectOptions = action.payload;
        state.isLoadingPriceObjectSelect = false;
      })

      // get options for select Khach hang
      .addCase(fetchSelectCustomerNameOptions.pending, (state, action) => {
        state.isLoadingCustomerNameSelect = true;
      })
      .addCase(fetchSelectCustomerNameOptions.fulfilled, (state, action) => {
        state.selectCustomerNameOptions = action.payload;
        state.isLoadingCustomerNameSelect = false;
      })

      // get options for select Khach hang
      .addCase(fetchSelectPhoneNumberOptions.pending, (state, action) => {
        state.isLoadingPhoneNumberSelect = true;
      })
      .addCase(fetchSelectPhoneNumberOptions.fulfilled, (state, action) => {
        state.selectPhoneNumberOptions = action.payload;
        state.isLoadingPhoneNumberSelect = false;
      });
  },
});

/*---------------------------------------GET REQUEST-------------------------------------------------*/

//Fetch payment detail
export const fetchPaymentDetail = createAsyncThunk(
  "payment/getPaymentDetail",
  async (keyId) => {
    try {
      if (keyId) {
        const res = await getRequest(
          `hoa-don/get-single/thanh-toan/${keyId}/details`
        );
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

//Fetch filter list payment
export const fetchFilterListPayment = createAsyncThunk(
  "payment/getFilterListPayment",
  async (queryString) => {
    try {
      if (queryString) {
        console.log(queryString);
        const res = await getRequest(`thanh-toan/filter?${queryString}`);
        return res.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

//Fetch data for select khu vuc
export const fetchSelectAreaOptions = createAsyncThunk(
  "payment/getSelectAreaOptions",
  async (vungId) => {
    try {
      const res = await getRequest(`khu-vuc/get-by-vungid/${vungId}`);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

//Fetch data for select vung
export const fetchSelectRegionOptions = createAsyncThunk(
  "payment/getSelectRegionOptions",
  async () => {
    try {
      const res = await getRequest(`vung/get-all`);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

//Fetch data for select ma so hoa don
export const fetchSelectSeriesInvoiceOptions = createAsyncThunk(
  "payment/getSelectSeriesInvoiceSeriesOptions",
  async () => {
    try {
      const res = await getRequest(`danh-muc-seri-hoa-don/get-all`);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

//Fetch data for select hinh thuc thanh toan
export const fetchSelectPaymentTypeOptions = createAsyncThunk(
  "payment/getSelectPaymentTypeOptions",
  async () => {
    try {
      const res = await getRequest(`phuong-thuc-thanh-toan/get-all`);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

//Fetch data for select doi tuong gia
export const fetchSelectPriceObjectOptions = createAsyncThunk(
  "payment/getSelectPriceObjectOptions",
  async () => {
    try {
      const res = await getRequest(`danh-sach-doi-tuong-gia/get-all`);
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

//GET FROM GRAPHQL

export const fetchSelectMeterReaderOptions = createAsyncThunk(
  "payment/getSelectMeterReaderOptions",
  async () => {
    try {
      const { data } = await apolloClient.query({
        query: meterReaderQuery,
        variables: {
          first: 10,
        },
      });
      return data.GetUsers;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchSelectBillCollectorOptions = createAsyncThunk(
  "payment/getSelectBillCollectorOptions",
  async () => {
    try {
      const { data } = await apolloClient.query({
        query: billCollectorQuery,
        variables: {
          first: 10,
        },
      });
      console.log(data.GetUsers);
      return data.GetUsers;
    } catch (error) {
      console.log({ error });
    }
  }
);

// export const fetchSelectLineReadingOptions = createAsyncThunk(
//   "payment/getSelectLineReadingOptions",
//   async (factoryIdArr) => {
//     try {
//       const { data } = await apolloClient.query({
//         query: lineReadingQuery(factoryIdArr),
//         variables: {
//           first: 10,
//         },
//       });
//       console.log(data.GetTuyenDocs);
//       return data.GetTuyenDocs;
//     } catch (error) {
//       console.log({ error });
//     }
//   }
// );

export const fetchSelectCustomerNameOptions = createAsyncThunk(
  "payment/getSelectCustomerNameOptions",
  async (inputData) => {
    try {
      console.log(inputData);
      const { data } = await apolloClient.query({
        query: customerNameQuery(inputData),
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

export const fetchSelectPhoneNumberOptions = createAsyncThunk(
  "payment/getSelectPhoneNumberOptions",
  async (inputData) => {
    try {
      console.log(inputData);
      const { data } = await apolloClient.query({
        query: phoneNumberQuery(inputData),
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
/*---------------------------------------END GET REQUEST-------------------------------------------------*/

/*---------------------------------------POST REQUEST-------------------------------------------------*/
export const postPayment = createAsyncThunk(
  "payment/postPayment",
  async (values) => {
    try {
      console.log(values);
      const { thanhToanId, nguoiThuTienId, hinhThucThanhToan, ghiChu } = values;

      const res = await postRequest("thanh-toan/thanh-toan-by-id", {
        thanhToanId,
        nguoiThuTienId,
        hinhThucThanhToan,
        ghiChu,
      });

      toast.success("Ghi lại thành công.");

      return res.data.data;
    } catch (error) {
      console.log({ error });
      toast.error("Thanh toán thát bại.");
    }
  }
);
/*---------------------------------------END POST REQUEST-------------------------------------------------*/
