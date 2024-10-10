import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services";
import { toast } from "react-toastify";

const regionSlice = createSlice({
  name: "region",
  initialState: {
    data: [],
    isLoading: false,
    getByKhuVucId: [],
    getByKhuVucIdV2: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiAllRegion.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiAllRegion.fulfilled, (state, action) => {
        state.data = action?.payload || [];
        state.isLoading = false;
      })

      // option select (khu vực)
      .addCase(fetchApiGetByKhuVucId.fulfilled, (state, action) => {
        state.getByKhuVucId = action.payload;
      })
      .addCase(fetchApiGetByKhuVucIdV2.fulfilled, (state, action) => {
        state.getByKhuVucIdV2 = action.payload;
      });
  },
});

// fetch api all region
const fetchApiAllRegion = createAsyncThunk(
  "region/fetchApiAllRegion",
  async (queryString) => {
    try {
      const res = await getRequest(
        `vung/get-vung-by-nha-may-id?${queryString}`
      );

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api add region
const fetchApiAddRegion = createAsyncThunk(
  "region/fetchApiAddRegion",
  async (values) => {
    try {
      const { keyId, nhaMayId, tenVung } = values;

      const res = await postRequest("vung/add", {
        keyId,
        nhaMayId,
        tenVung,
      });

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Thêm vùng thành công.");
      }

      return res.data.data;
    } catch (error) {
      toast.error("Tên vùng đã tồn tại!");
      console.log({ error });
    }
  }
);

// fetch api update region
const fetchApiUpdateRegion = createAsyncThunk(
  "region/fetchApiUpdateRegion",
  async (values) => {
    try {
      const { prevKeyId, keyId, nhaMayId, tenVung } = values;

      const res = await putRequest(`vung/update`, {
        keyId: prevKeyId,
        data: {
          keyId: keyId,
          nhaMayId: nhaMayId,
          tenVung: tenVung,
        },
      });
      toast.success("Cập nhật vùng thành công.");

      return res.data.data;
    } catch (error) {
      toast.error("Cập nhật vùng thất bại.");
    }
  }
);

// fetch api delete region
const fetchApiDeleteRegion = createAsyncThunk(
  "region/fetchApiDeleteRegion",
  async (tabListbc) => {
    try {
      const { keyId } = tabListbc;

      const res = await deleteRequest(`vung/delete/${keyId}`, null);

      toast.success("Xóa vùng thành công.");

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api search region by id
const fetchApiSearchByIdRegion = createAsyncThunk(
  "region/fetchApiSearchByIdRegion",
  async (idRegion) => {
    try {
      const res = await getRequest(`vung/get-singe?id=${idRegion}`);

      console.log("res search", res.data.data);

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get by khuVucId
const fetchApiGetByKhuVucId = createAsyncThunk(
  "region/fetchApiGetByKhuVucId",
  async (khuVucId) => {
    try {
      if (khuVucId) {
        const res = await getRequest(`tuyen-doc/get-by-khuvucid/${khuVucId}`);

        console.log("res by khuvucid ->", res.data.data);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
const fetchApiGetByKhuVucIdV2 = createAsyncThunk(
  "region/fetchApiGetByKhuVucIdV2",
  async (khuVucId) => {
    try {
      if (khuVucId) {
        const res = await getRequest(
          `tuyen-doc/get-by-khuvucid-v2/${khuVucId}`
        );

        console.log("res by khuvucidv2 ->", res.data.data);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export {
  fetchApiAllRegion,
  fetchApiAddRegion,
  fetchApiUpdateRegion,
  fetchApiDeleteRegion,
  fetchApiSearchByIdRegion,
  fetchApiGetByKhuVucId,
  fetchApiGetByKhuVucIdV2,
};

export default regionSlice;
