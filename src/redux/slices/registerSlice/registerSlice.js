import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../../services";
import {
  GetPhongBansQuery,
  GetRolesQuery,
} from "../../../graphql/register/registerQuery";
import apolloClient from "../../../config/apolloClient";

const initialState = {
  isRegisterSuccess: false,
  isVerifyEmailSuccess: false,
  roles: [],
  phongBans: [],
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.isRegisterSuccess = true;
        }
      })
      .addCase(verifyRegisterEmail.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.isVerifyEmailSuccess = true;
        }
      })
      .addCase(fetchGetRoles.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.roles = action.payload;
        }
      })
      .addCase(fetchGetPhongBans.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.phongBans = action.payload;
        }
      });
  },
});

export const registerUser = createAsyncThunk(
  "register/authenticateUser",
  async (data, { rejectWithValue }) => {
    try {
      const {
        userName,
        name,
        userCode,
        password,
        confirmPassword,
        email,
        phoneNumber,
        nhaMayIds,
        roleIds,
        phongBanId,
      } = data;
      const res = await postRequest("auth/register", {
        userName,
        name,
        userCode,
        password,
        confirmPassword,
        email,
        phoneNumber,
        nhaMayIds,
        roleIds,
        phongBanId,
      });
      if (res.data.StatusCode === 400) {
        if (res.data.Code === "Existed!")
          return rejectWithValue("Người dùng đã tồn tại");
      } else {
        return res.data;
      }
    } catch (error) {
      return rejectWithValue("Có lỗi xảy ra khi đăng ký");
    }
  }
);

export const verifyRegisterEmail = createAsyncThunk(
  "register/verifyRegisterEmail",
  async (data, { rejectWithValue }) => {
    try {
      const { userName, token } = data;
      const res = await postRequest("auth/verify-email", { token, userName });
      if (res.data) {
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          return res.data;
        }
      }
    } catch (error) {
      return rejectWithValue("Có lỗi xảy ra khi xác thực email");
    }
  }
);

export const fetchGetRoles = createAsyncThunk(
  "register/fetchGetRoles",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GetRolesQuery,
      });
      return data?.GetRoles.nodes || [];
    } catch (error) {
      return rejectWithValue("Có lỗi xảy ra khi Get Roles");
    }
  }
);

export const fetchGetPhongBans = createAsyncThunk(
  "register/fetchGetPhongBans",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GetPhongBansQuery,
      });
      return data?.GetPhongBans.nodes || [];
    } catch (error) {
      return rejectWithValue("Có lỗi xảy ra khi Get PhongBans");
    }
  }
);

export default registerSlice;
