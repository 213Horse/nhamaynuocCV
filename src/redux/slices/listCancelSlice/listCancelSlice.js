import {
  CATEGORY_TYPE,
  CATEGORY_ACTIONS,
  getCategory,
  postCategory,
} from "../../../services/categoryServices";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services";
import { toast } from "react-toastify";

const listCancelSlice = createSlice({
  name: "listCancel",
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiAllCancel.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiAllCancel.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      });
  },
});

// fetch api all Cancel
const fetchApiAllCancel = createAsyncThunk(
  "listCancel/fetchApiAllCancel",
  async (queryString) => {
    try {
      const res = await getCategory(CATEGORY_TYPE.CANCEL, queryString);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api add Cancel
const fetchApiAddCancel = createAsyncThunk(
  "listCancel/fetchApiAddCancel",
  async (values) => {
    try {
      const { keyId, lyDo, kyHieu, queryString } = values;

      const res = await postCategory(
        CATEGORY_ACTIONS.ADD,
        CATEGORY_TYPE.CANCEL,
        {
          danhMuc: {
            keyId: kyHieu,
            value: lyDo,
            kyHieu: kyHieu,
            nhaMayId: queryString,
          },
        }
      );

      toast.success("Thêm thành công.");

      return res.data.data;
    } catch (error) {
      // toast.error("lý do hủy đã tồn tại!");
      console.log({ error });
    }
  }
);

// fetch api update Cancel
const fetchApiUpdateCancel = createAsyncThunk(
  "listCancel/fetchApiUpdateCancel",
  async (values) => {
    try {
      const { keyId, lyDo, id, queryString, kyHieu } = values;

      const res = await postCategory(
        CATEGORY_ACTIONS.MODIFY,
        CATEGORY_TYPE.CANCEL,
        {
          id: id,
          danhMuc: {
            keyId: kyHieu,
            value: lyDo,
            kyHieu: kyHieu,
            nhaMayId: queryString,
          },
        }
      );

      toast.success("Cập nhật thành công.");

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api delete Cancel
const fetchApiDeleteCancel = createAsyncThunk(
  "listCancel/fetchApiDeleteCancel",
  async (tabListCancel) => {
    try {
      const { keyId, id, kyHieu } = tabListCancel;
      console.log(keyId, id);
      const res = await postCategory(
        CATEGORY_ACTIONS.DELETE,
        CATEGORY_TYPE.CANCEL,
        {
          id: id,
          danhMuc: {
            keyId: keyId,
            kyHieu: kyHieu,
          },
        }
      );

      toast.success("Xóa thành công.");

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api search Cancel by id
const fetchApiSearchByIdCancel = createAsyncThunk(
  "listCancel/fetchApiSearchByIdCancel",
  async (idCancel) => {
    try {
      const res = await getRequest(`ly-do-huy/get-singe?id=${idCancel}`);

      console.log("res search", res.data.data);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export {
  fetchApiAllCancel,
  fetchApiAddCancel,
  fetchApiUpdateCancel,
  fetchApiDeleteCancel,
  fetchApiSearchByIdCancel,
};

export default listCancelSlice;
