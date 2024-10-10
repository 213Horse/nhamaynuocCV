import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services";

const areaSlice = createSlice({
  name: "area",
  initialState: {
    data: [],
    khuVucById:[],
    getByVungId: [],
    isLoading: false,
    khuVucAndVung:[],
    rowSelected:null,
  },
  reducers:{
    btnClickTabListArea: (state, action) => {
      state.rowSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiAllArea.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchApiAllArea.fulfilled, (state, action) => {
        state.data = action?.payload || [];
        state.isLoading = false;
      })
      .addCase(fetchApiAllAreaByNhaMay.fulfilled, (state, action) => {
        state.khuVucById = action?.payload || [];

      })
      .addCase(fetchApiAddArea.fulfilled, (state, action) => {
        const newArea = action.payload;
        console.log("new area slice ->", newArea);
      })
      
      // option select (Vùng)
      .addCase(fetchApiGetByVungId.fulfilled, (state, action) => {
        state.getByVungId = action.payload;
      })
      .addCase(fetchApiGetKhuVucAndVung.fulfilled, (state, action) => {
        state.khuVucAndVung = action.payload;
      })
   
  },
});

// fetch api all Area
const fetchApiAllArea = createAsyncThunk("area/fetchApiAllArea", async () => {
  try {
    const res = await getRequest("khu-vuc/get-all");

    // console.log("res all Area", res);

    return res.data.data;
  } catch (error) {
    console.log({ error });
  }
});

const fetchApiAllAreaByNhaMay = createAsyncThunk("area/fetchApiAllAreaByNhaMay", async (nhaMayId) => {
  try {
    const res = await getRequest(`khu-vuc/get-all-khu-vuc-by-nha-may-id/${nhaMayId}`);
    return res.data.data;
  } catch (error) {
    console.log({ error });
  }
});


// fetch api add area
const fetchApiAddArea = createAsyncThunk(
  "area/fetchApiAddArea",
  async (values) => {
    try {
      const { keyId, tenKhuVuc, vungId } = values;

      const res = await postRequest("khu-vuc/add", {
        keyId,
        tenKhuVuc,
        vungId,
      });

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Thêm khu vực thành công.");
      }

      return res.data.data;
    } catch (error) {
      toast.error("Khu vực đã tồn tại!");
      console.log({ error });
    }
  }
);

// fetch api update area
const fetchApiUpdateArea = createAsyncThunk(
  "area/fetchApiUpdateArea",
  async (values) => {
    try {
      const { prevKeyId, keyId, tenKhuVuc, vungId } = values;

      const res = await putRequest(`khu-vuc/update`, {
        keyId: prevKeyId,
        data: {
          keyId: keyId,
          tenKhuVuc: tenKhuVuc,
          vungId: vungId,
        },
      });

      toast.success("Cập nhật khu vực thành công.");

      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api delete area
const fetchApiDeleteArea = createAsyncThunk(
  "area/fetchApiDeleteArea",
  async (tabListbc) => {
    try {
      const { keyId } = tabListbc;

      const res = await deleteRequest(`khu-vuc/delete/${keyId}`, null);
      if (res.data.statusCode === 200 || res.data.statusCode === 201|| res.data.statusCode === 202) {
        toast.success("Xóa khu vực thành công.");
      }
      console.log(res)
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// fetch api get by VungId
const fetchApiGetByVungId = createAsyncThunk(
  "area/fetchApiGetByVungId",
  async (vungId) => {
    try {
      if (vungId) {
        const res = await getRequest(`khu-vuc/get-by-vungid/${vungId}`);

        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);


const fetchApiGetKhuVucAndVung = createAsyncThunk(
  "area/fetchApiGetKhuVucAndVung",
  async (queryString) => {
    try {
      if (queryString) {
        const res = await getRequest(`khu-vuc/get-khu-vuc-and-vung?${queryString}`);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export {
  fetchApiAllArea,
  fetchApiAddArea,
  fetchApiUpdateArea,
  fetchApiDeleteArea,
  fetchApiGetByVungId,
  fetchApiAllAreaByNhaMay,
  fetchApiGetKhuVucAndVung
};

export default areaSlice;
