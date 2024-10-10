import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../../services";
import apolloClient from "../../../config/apolloClient";
import { GetUserQuery } from "../../../graphql/users/usersQuery";
import { toast } from "react-toastify";

const initialState = {
  danhSachNguoiDung: [],
  danhSachNguoiDungNotManage: [],
  isAddedSuccess: false,
};

export const nguoidungSlice = createSlice({
  name: "tuyendoc",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllNguoiDung.fulfilled, (state, action) => {
        state.danhSachNguoiDung = action.payload;
      })
      .addCase(getNguoiDungNotManaging.fulfilled, (state, action) => {
        state.danhSachNguoiDungNotManage = action.payload;
      })
      .addCase(AddNguoiDung.fulfilled, (state, action) => {
        state.isAddedSuccess = true;
      });

    // .addMatcher(
    //   (action) => action.type.endsWith('/pending'),
    //   (state) => {
    //     state.inProgress = true;
    //   }
    // )
  },
});

export const AddNguoiDung = createAsyncThunk(
  "nguoidung/AddNguoiDung",
  async (values) => {
    try {
      const { KeyId, matKhau, email } = values;

      const res = await postRequest(`nguoi-dung/add`, {
        KeyId,
        matKhau,
        email,
      });

      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getAllNguoiDung = createAsyncThunk(
  "nguoidung/getAllNguoiDung",
  async (queryString) => {
    try {
      const { data } = await apolloClient.query({
        query: GetUserQuery,
        variables: {
          first: 10,
        },
      });
      return data.GetUsers.nodes;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getNguoiDungNotManaging = createAsyncThunk(
  "nguoidung/getNguoiDungNotManaging",
  async (queryString) => {
    try {
      const res = await getRequest(`auth/user/get-can-bo-doc?${queryString}`);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const updateNhanVien = createAsyncThunk(
  "nguoidung/updateNhanVien",
  async (values) => {
    try {
      let { id, userName, email, normalizedUsername, phoneNumber } = values;
      const res = await putRequest(`auth/user/update-user`, {
        id: id,
        data: {
          userName: userName,
          email: email,
          normalizedUsername: normalizedUsername,
          phoneNumber: phoneNumber,
        },
      });
      if (
        res.data.statusCode === 200 ||
        res.data.statusCode === 201 ||
        res.data.statusCode === 202
      ) {
        toast.success("Cập nhật nhân viên thành công.");
      }
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default nguoidungSlice;
