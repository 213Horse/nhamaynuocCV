import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../../services";
import { toast } from "react-toastify";

const bangGiaSlice = createSlice({
    name: "bangGia",
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBangGia.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

// fetch api all bang gia
const getAllBangGia = createAsyncThunk(
    "bangGia/getAllBangGia",
    async () => {
        try {
            const res = await getRequest("doi-tuong-gia/get-all");
            return res.data.data;
        } catch (error) {
            console.log({ error });
        }
    }
);

// fetch api add region
const postBangGia = createAsyncThunk(
    "bangGia/postBangGia",
    async (values) => {
        try {
            const { keyId,
                ngayBatDau,
                ngayKetThuc,
                vat,
                bvmt,
                phiBvmt,
                dtTinhGia,
                kieuTinh,
                coToiThieu,
                tinhTu,
                toiThieu,
                phiDuyTriId,
                danhSachDoiTuongGiaId } = values;

            const res = await postRequest("doi-tuong-gia/add", {
                keyId,
                ngayBatDau,
                ngayKetThuc,
                vat,
                bvmt,
                phiBvmt,
                dtTinhGia,
                kieuTinh,
                coToiThieu,
                tinhTu,
                toiThieu,
                phiDuyTriId,
                danhSachDoiTuongGiaId
            });

            toast.success("Thêm đối tượng giá thành công.");

            return res.data.data;
        } catch (error) {
            console.log({ error });
        }
    }
);

// fetch api update region
const putBangGia = createAsyncThunk(
    "bangGia/putBangGia",
    async (values) => {
        try {
            const { keyId,
                ngayBatDau,
                ngayKetThuc,
                vat,
                bvmt,
                phiBvmt,
                dtTinhGia,
                kieuTinh,
                coToiThieu,
                tinhTu,
                toiThieu,
                phiDuyTriId,
                danhSachDoiTuongGiaId } = values;

            const res = await postRequest("doi-tuong-gia/update", {
                keyId,
                ngayBatDau,
                ngayKetThuc,
                vat,
                bvmt,
                phiBvmt,
                dtTinhGia,
                kieuTinh,
                coToiThieu,
                tinhTu,
                toiThieu,
                phiDuyTriId,
                danhSachDoiTuongGiaId
            });

            toast.success("Cập nhật đổi tượng giá thành công.");

            return res.data.data;
        } catch (error) {
            console.log({ error });
        }
    }
);

// fetch api delete region
const deleteBangGia = createAsyncThunk(
    "bangGia/deleteBangGia",
    async (tabBangGia) => {
        try {
            const { keyId } = tabBangGia;

            const res = await postRequest(`doi-tuong-gia/delete?id=${keyId}`, null);

            toast.success("Xóa đối tượng giá thành công.");

            return res.data.data;
        } catch (error) {
            console.log({ error });
        }
    }
);

export {
    getAllBangGia,
    postBangGia,
    putBangGia,
    deleteBangGia
};

export default bangGiaSlice;