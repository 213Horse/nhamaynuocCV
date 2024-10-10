import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteRequest, getRequest, getRequestParams } from "../../../services";
import apolloClient from "../../../config/apolloClient";
import { LOAD_CUSTOMER_GET_BY_ID } from "../../../graphql/customers/queries";
import { toast } from "react-toastify";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    data: [],
    reportNewCustomers: [],
    listOfCustomer: [],
    customerByNhaMayId: [],
    filterCustomer: [],
    btnFilterCustomer: null,
    filterModalInfoCustomer: [],
    btnFilterModalInfoCustomer: null,
    filterBangKeKH: null,
    actionClick: null,
    customerByKeyId: {},
    customerById: {},
    customerTransferContract: {},
    customerByCMND: null,
    isLoading: false,
  },
  reducers: {
    btnClickResetAllCustomer: (state, action) => {
      state.actionClick = action.payload;
    },
    setListCustomer: (state, action) => {
      state.data = action.payload;
    },
    setListCustomerByNhaMayId: (state, action) => {
      state.customerByNhaMayId = action.payload;
    },
    setFilterCustomer: (state, action) => {
      state.filterCustomer = action.payload;
    },
    btnClickFilterCustomer: (state, action) => {
      state.btnFilterCustomer = action.payload;
    },
    btnFilterBangKeKH: (state, action) => {
      state.filterBangKeKH = action.payload;
    },
    setFilterModalInfoCustomer: (state, action) => {
      state.filterModalInfoCustomer = action.payload;
    },
    btnClickFilterModalInfoCustomer: (state, action) => {
      state.btnFilterModalInfoCustomer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiGetByIdCustomer.fulfilled, (state, action) => {
        state.customerTransferContract = action.payload;
      })
      .addCase(fetchApiGetCustomerByKeyId.fulfilled, (state, action) => {
        state.customerByKeyId = action.payload;
      })
      .addCase(
        fetchApiGetCustomerIdFromOptionFactory.fulfilled,
        (state, action) => {
          state.customerById = action.payload;
        }
      )
      // get list report new customer
      .addCase(fetchApiGetListReportCustomerNew.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiGetListReportCustomerNew.fulfilled, (state, action) => {
        state.reportNewCustomers = action.payload;
        state.isLoading = false;
      })
      // get list of customer
      .addCase(fetchApiGetListOfCustomer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiGetListOfCustomer.fulfilled, (state, action) => {
        state.listOfCustomer = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchApiGetCustomerByCMND.fulfilled, (state, action) => {
        state.customerByCMND = action.payload;
      })
      .addCase(fetchApiGetCustomerByCMND.rejected, (state, action) => {
        state.customerByCMND = action.payload;
      });
  },
});

// fetch api get customer (customer id)
const fetchApiGetByIdCustomer = createAsyncThunk(
  "customer/fetchApiGetByIdCustomer",
  async (customerId) => {
    try {
      if (customerId) {
        const { data } = await apolloClient.query({
          query: LOAD_CUSTOMER_GET_BY_ID,
          variables: {
            keyId: customerId,
          },
        });

        return data.GetKhachHangs.nodes[0];
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get keyId customer
const fetchApiGetCustomerByKeyId = createAsyncThunk(
  "customer/fetchApiGetCustomerByKeyId",
  async (keyId) => {
    try {
      if (keyId) {
        const res = await getRequest(`khach-hang/get-single/${keyId}`);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get maKH
const fetchApiGetCustomerIdFromOptionFactory = createAsyncThunk(
  "customer/fetchApiGetCustomerIdFromOptionFactory",
  async (factoryId) => {
    try {
      if (factoryId) {
        const res = await getRequest(
          `khach-hang/get-ma-khach-hang/${factoryId}`
        );

        // console.log("res id cus from fac ->", res.data);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get list report new customer
const fetchApiGetListReportCustomerNew = createAsyncThunk(
  "customer/fetchApiGetListReportCustomerNew",
  async (values) => {
    try {
      const res = await getRequest(`hop-dong/get-khach-hang-moi?${values}`);

      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get list of customer
const fetchApiGetListOfCustomer = createAsyncThunk(
  "customer/fetchApiGetListOfCustomer",
  async (values) => {
    try {
      const res = await getRequestParams(
        `hop-dong/get-bang-ke-ds-khach-hang`,
        values
      );

      console.log("res bang ke ->", res.data);

      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api delete customer
const fetchApiDeleteCustomer = createAsyncThunk(
  "customer/fetchApiDeleteCustomer",
  async (keyId, { rejectWithValue }) => {
    try {
      if (keyId) {
        const res = await deleteRequest(`khach-hang/delete/${keyId}`);

        // console.log("res del kh2 ->", res.data);

        if (
          res?.data?.statusCode === 200 ||
          res?.data?.statusCode === 201 ||
          res?.data?.statusCode === 202
        ) {
          toast.success("Xóa khách hàng thành công.");

          return res.data;
        }
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.Message);
    }
  }
);

// get (Khách hàng theo CMND)
const fetchApiGetCustomerByCMND = createAsyncThunk(
  "customer/fetchApiGetCustomerByCMND",
  async (cmnd, { rejectWithValue }) => {
    try {
      if (cmnd) {
        const res = await getRequest(`khach-hang/getbycmnd/${cmnd}`);

        console.log("res kh by cmnd ->", res.data);
        if (
          res?.data?.statusCode === 200 ||
          res?.data?.statusCode === 201 ||
          res?.data?.statusCode === 202
        ) {
          return res.data.data;
        }
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.message);
    }
  }
);

export {
  fetchApiGetByIdCustomer,
  fetchApiGetCustomerByKeyId,
  fetchApiGetCustomerIdFromOptionFactory,
  fetchApiGetListReportCustomerNew,
  fetchApiGetListOfCustomer,
  fetchApiDeleteCustomer,
  fetchApiGetCustomerByCMND,
};

export default customerSlice;
