import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getRequest,
  getRequestParams,
  putRequest,
  putRequestMultipartFormData,
} from "../../../services";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const excelSlice = createSlice({
  name: "excel",
  initialState: {
    dataManagerContract: [],
    dataHoaDon: [],
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchApiExportToExcelManagerContract.fulfilled,
      (state, action) => {
        state.dataManagerContract = action.payload;
      }
    );
    // builder.addCase(fetchApiExportToExcelHoaDon.fulfilled, (state, action) => {
    //   state.dataHoaDon = action.payload;
    // });
  },
});

// fetch api -> export to excel contract
const fetchApiExportToExcelManagerContract = createAsyncThunk(
  "excel/fetchApiExportToExcelManagerContract",
  async (factory) => {
    try {
      if (factory) {
        const res = await getRequest(
          `hop-dong/get-excel-quan-ly-hop-dong?${factory}`
          // `hop-dong/get-khach-hang-moi`,
        );
        // console.log("res export to excel", res.data);

        return res.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// const fetchApiExportToExcelHoaDon = createAsyncThunk(
//   "excel/fetchApiExportToExcelHoaDon",
//   async (values) => {
//     try {
//       let { nhaMayIds, month } = values;
//       const res = await getRequestParams(`hoa-don/export-excel-by-month`, {
//         nhaMayIds,
//         month,
//       });
//       // console.log("res export to excel", res.data);
//       console.log("rés", res);
//       return res.data;
//     } catch (error) {
//       console.log({ error });
//     }
//   }
// );

const createFormUpload = (values) => {
  const formData = new FormData();
  const { FilePath, ThangTaoChiSo } = values;
  formData.append("FilePath", FilePath);
  formData.append("ThangTaoChiSo", dayjs(ThangTaoChiSo).format("MM/YYYY"));
  return formData;
};

const fetchApiImportToExcel = createAsyncThunk(
  "excel/fetchApiImportToExcel",
  async (values) => {
    try {
      if (values) {
        const formDataValues = createFormUpload(values);
        const res = await putRequestMultipartFormData(
          `${process.env.REACT_APP_BASE_URL}so-doc-chi-so/chi-so-dong-ho/ghi-chi-so-file-excel`,
          formDataValues
        );
        if (res.data.statusCode === 200) {
          toast.success("Nhập file excel thành công");
        }
        return res.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export {
  fetchApiExportToExcelManagerContract,
  fetchApiImportToExcel,
  // fetchApiExportToExcelHoaDon,
};

export default excelSlice;
