import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../../services";
import axios from "axios";

const initialState = {
    isChangePasswordSuccess: false,
    isResetPasswordSuccess: false,
    isChangePasswordOK: null
};

export const passwordSlice = createSlice({
    name: 'password',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(changePassword.fulfilled, (state, action) => {
                console.log("Action.fulfilled:", action.payload);
                state.isChangePasswordOK = action.payload;
            })
            .addCase(changePassword.rejected, (state, action) => {
                console.log("Action.rejected:", action.payload);
                state.isChangePasswordOK = action.payload;
            })
    }
})

export const changePassword = createAsyncThunk(
    'password/changePassword',
    async (data, { rejectWithValue }) => {
        try {
            let authToken = sessionStorage.getItem("token");
            console.log("Da vao changePassword 1");
            const { oldPassword, password, confirmPassword, userName } = data;
            console.log("🚀 ~ data:", data)
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/change-password`, {
                oldPassword, password, confirmPassword, userName
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: authToken ? `Bearer ${authToken}` : undefined,
                }
            });
            console.log("🚀 ~ res.data:", res.data);
            console.log("🚀 ~ res:", res);
            console.log("Da vao changePassword 2");
            if (res.data) {
                if (res.data.StatusCode === 401 && res.data.Code === "Username invalid.") {
                    return rejectWithValue('Username không tồn tại');
                }
                if (res.data.StatusCode === 401 && res.data.Code === "Password is wrong.") {
                    return rejectWithValue('Mật Khẩu hiện tại không đúng!');
                }
                return res.data;
            }
        } catch (error) {
            if (error.response.data.Code === "Password is wrong.") {
                return rejectWithValue('Sai password cũ');
            } else {
                return rejectWithValue('Có lỗi xảy ra cập nhật mật khẩu mới');
            }
        }
    }
)

export const sendEmail = createAsyncThunk(
    'password/sendEmail',
    async (userName, { rejectWithValue }) => {
        try {
            const res = await postRequest('auth/forgot-password', userName);
            if (res.data) {
                if (res.data.StatusCode === 401 && res.data.Code === "Username invalid.") {
                    return rejectWithValue('Username không tồn tại');
                }
                return res.data;
            }
        } catch (error) {
            return rejectWithValue('Bị lỗi trong quá trình lấy lại mật khẩu ~ Vui lòng thử lại sau!');
        }
    }
)

export const resetPassword = createAsyncThunk(
    'password/resetPassword',
    async (data, { rejectWithValue }) => {
        try {
            const { token, password, confirmPassword, userName } = data;
            const res = await postRequest('auth/reset-password', {
                token, password, confirmPassword, userName
            });
            if (res.data) {
                if (res.data.StatusCode === 401 && res.data.Code === "Username invalid.") {
                    return rejectWithValue('Username không tồn tại');
                }
                if (res.data.StatusCode === 401 && res.data.Code === "The Token is invalid.") {
                    return rejectWithValue('Token không tồn tại, vui lòng kiểm tra lại Email!');
                }
                return res.data;
            }
        } catch (error) {
            return rejectWithValue('Bị lỗi trong quá trình lấy lại mật khẩu ~ Vui lòng thử lại sau!');
        }
    }
)

export default passwordSlice;