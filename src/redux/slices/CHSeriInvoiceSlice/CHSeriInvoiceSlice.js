import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "../../../services";
import { toast } from "react-toastify";
import apolloClient from "../../../config/apolloClient";
import { GetTuyenDocs } from "../../../graphql/ManagementReading/ManagementReadingQuery";
import { GetUserQuery } from "../../../graphql/users/usersQuery";
const initialState = {
  danhSachSeri: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
};

export const seriInvoiceSlice = createSlice({
  name: "seriInvoiceSlice",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSeriInvoice.fulfilled, (state, action) => {
      state.danhSachSeri = [];
      state.danhSachSeri = action.payload;
    });
  },
});

export const getAllSeriInvoice = createAsyncThunk(
  "seriInvoiceSlice/getAllSeriInvoice",
  async (queryString) => {
    try {
      const res = await getRequest(
        `danh-muc-seri-hoa-don/get-all?${queryString}`
      );
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default seriInvoiceSlice;
