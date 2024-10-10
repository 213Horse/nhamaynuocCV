import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../../services";

const initialState = {
  userId: "",
  name: "",
  userName: "",
  role: [],
  token: "",
  refreshToken: "",
  nhaMays: [],
  nhaMayId: "",
};

export const userLoginSlice = createSlice({
  name: "user_login",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      const {
        userId,
        name,
        userName,
        token,
        refreshToken,
        nhaMays,
        nhaMayId,
        role,
      } = action.payload;
      state.userId = userId;
      state.name = name;
      state.userName = userName;
      state.token = token;
      state.refreshToken = refreshToken;
      state.nhaMays = nhaMays;
      state.nhaMayId = nhaMayId;
      state.role = role;
    });
  },
});

export const authenticateUser = createAsyncThunk(
  "user_login/authenticateUser",
  async (data, { rejectWithValue }) => {
    try {
      const { userName, password } = data;
      const res = await postRequest("auth/authenticate", {
        userName,
        password,
      });
      if (res.data.StatusCode === 401) {
        console.log("Da vo 2");
        if (res.data.Code === "Username invalid.") {
          return rejectWithValue("Username không tồn tại!");
        }
        if (res.data.Code === "Password is wrong.") {
          console.log("Da vo 3");
          return rejectWithValue("Password không đúng!");
        }
        if (res.data.Code === "Un-Authenticate") {
          console.log("Da vo 3");
          return rejectWithValue("Không có tài khoản này!");
        }
      } else {
        return res.data;
      }
    } catch (error) {
      console.log("🚀 ~ error in authenticateUser:", error);
      return rejectWithValue("Có lỗi xảy ra khi đăng nhập");
    }
  }
);

export default userLoginSlice;
