import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../../services";
import { message } from "antd";
import { toast } from "react-toastify";

const initialState = {
  danhSachtrangThaiChiSo: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
};

export const trangThaiChiSo = createSlice({
  name: "trangthaichiso",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllDMTrangThaiChiSo.fulfilled, (state, action) => {
      state.danhSachtrangThaiChiSo = action.payload;
    })

    .addCase(addDMTrangThaiChiSo.fulfilled, (state, action) => {
      state.isAddedSuccess = true;
    })

    .addCase(deleteDMTrangThaiChiSo.fulfilled, (state, action) => {
      state.isDeletedSuccess = true;
    });

    // .addMatcher(
    //   (action) => action.type.endsWith('/pending'),
    //   (state) => {
    //     state.inProgress = true;
    //   }
    // )
  },
});

export const addDMTrangThaiChiSo = createAsyncThunk(
  "trangthaichiso/addDMTrangThaiChiSo",
  async (values) => {
    try {
      const {
        queryString,
        KeyId,
        tenTrangThai,
        maMau,
        moTaNgan,
        kyHieu,
        soTt,
        khongChoPhepGhi,
        khongChoPhepHienThi
      } = values;

      const res = await postRequest(`trang-thai-ghi/add?${queryString}`, {
        KeyId,
        tenTrangThai,
        maMau,
        moTaNgan,
        soTt,
        kyHieu,
        khongChoPhepGhi,
        khongChoPhepHienThi
      });

      if(res.data.statusCode === 200){
        toast.success('Thêm thành công!')
      }
      return res.data.data;
    } catch (error) {
      console.log({ error });
      toast.error('Thêm thất bại!')
    }
  }
);

export const deleteDMTrangThaiChiSo = createAsyncThunk(
  "trangthaichiso/deleteDMTrangThaiChiSo",
  async (KeyId) => {
    try {
      const res = await deleteRequest(`trang-thai-ghi/delete/${KeyId}`);
      console.log(res);

      if(res.data.statusCode === 200) message.success({ content: 'Xóa thành công' })

    } catch (error) {
      console.log({ error });
      toast.error('Xóa thất bại')
    }
  }
);

export const getAllDMTrangThaiChiSo = createAsyncThunk(
  "trangthaichiso/getAllDMTrangThaiChiSo",
  async (queryString) => {
    try {
      const res = await getRequest(`trang-thai-ghi/get-all?${queryString}`);

      // console.log('tuyen-doc/get-all', res);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const updateDMTrangThaiChiSo = createAsyncThunk(
  "trangthaichiso/updateDMTrangThaiChiSo",
  async (values) => {
    try {
      const {
        queryString,
        KeyId,
        tenTrangThai,
        maMau,
        moTaNgan,
        soTt,
        khongChoPhepGhi,
        khongChoPhepHienThi,
        preKeyId
      } = values;

      const res = await putRequest(`trang-thai-ghi/update?${queryString}`, {
        keyId : preKeyId, 
        data : {
          keyId : "",
          tenTrangThai,
          maMau,
          moTaNgan,
          soTt,
          khongChoPhepGhi,
          khongChoPhepHienThi
        }
      });

      if(res.data.statusCode === 200){
        toast.success('Cập nhật thành công')
      }
    } catch (error) {
      console.log({ error });
      toast.error('Cập nhật thất bại')
    }
  }
);


export default trangThaiChiSo;
