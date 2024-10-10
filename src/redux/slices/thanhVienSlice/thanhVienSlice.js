import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, getRequestParams, postRequest } from "../../../services";

const initialState = {
  members: [],
  idPhongBan: null,
  userID: null,
};

export const thanhVienSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetMember.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.members = action.payload;
      }
    });
    builder.addCase(fetchGetIdPhongBan.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.idPhongBan = action.payload;
      }
    });
  },
});

export const fetchGetMember = createAsyncThunk(
  "member/fetchGetMember",
  async (nhaMayIds, { rejectWithValue }) => {
    try {
      const res = await getRequest(`auth/get-users-info?${nhaMayIds}`);
      if (res.data) {
        return res.data.data;
      }
    } catch (error) {
      return rejectWithValue("Có lỗi xảy ra khi Get Members");
    }
  }
);

export const fetchGetIdPhongBan = createAsyncThunk(
  "member/fetchGetIdPhongBan",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await getRequest(`phongban/get-by-user-id?userId=${userId}`);
      if (res.data) {
        return res.data.data;
      }
    } catch (error) {
      return rejectWithValue("Có lỗi xảy ra khi Get Members");
    }
  }
);

export const fetchUpdatePhongBan = createAsyncThunk(
  "member/fetchUpdatePhongBan",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { userId, phongBanId } = data;
      console.log("UserID: ", userId);
      console.log("phongBanId: ", phongBanId);

      const res = await postRequest("auth/user/update-phong-ban", {
        userId,
        phongBanId,
      });
      console.log("🚀 ~ res:", res);
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        return fulfillWithValue("Cập nhật phòng ban mới thành công!");
      }
    } catch (error) {
      return rejectWithValue("Có lỗi xảy ra khi cập nhật phòng ban mới!");
    }
  }
);

export const { setUser } = thanhVienSlice.actions;
export default thanhVienSlice;
