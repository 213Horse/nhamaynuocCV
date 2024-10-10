import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { postRequest, postRequestMultipartFormData } from "../../../services";

const attachmentSlice = createSlice({
  name: "attachment",
  initialState: {
    data: [],
  },
  reducers: {
    setDataFileOfContract: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiSaveFileToContract.fulfilled, (state, action) => {
        state.data.GetHopDongs.nodes[0].fileDinhKems.unshift(action.payload);
      })
      .addCase(fetchApiDeleteFileOfContract.fulfilled, (state, action) => {
        const fileId = action.payload;

        const file = state.data.GetHopDongs.nodes[0].fileDinhKems.findIndex(
          (_file) => _file.id === fileId
        );

        if (file > -1) {
          state.data.GetHopDongs.nodes[0].fileDinhKems.splice(file, 1);
        }
      });
  },
});

// create form date
const createFormDate = (newImage, hopDongId) => {
  const form = new FormData();

  form.append("HopdongId", hopDongId);
  if (newImage?.length === 1) {
    form.append("files", newImage[0].imageFile);
  } else if (newImage?.length > 1) {
    newImage.forEach((_image) => {
      form.append("files", _image.imageFile);
    });
  }
  form.append("ContentType", "");
  form.append("ContentDisposition", "");
  form.append("Headers", {
    additionalProp1: ["string"],
    additionalProp2: ["string"],
    additionalProp3: ["string"],
  });
  form.append("Length", 1);
  form.append("Name", "");
  form.append("FileName", "");

  return form;
};

// fetch api save file
const fetchApiSaveFileToContract = createAsyncThunk(
  "attachment/fetchApiSaveFileToContract",
  async ({ newImage, hopDongId }) => {
    try {
      const formData = createFormDate(newImage, hopDongId);

      const res = await postRequestMultipartFormData(
        `${process.env.REACT_APP_BASE_URL}upload/add`,
        formData
      );

      console.log("res create file ->", res.data.data);
      toast.success("Thêm thành công file.");

      return res.data.data;
    } catch (error) {
      toast.error("Thêm không thành công file!");
      console.log({ error });
    }
  }
);

// fetch api delete file
const fetchApiDeleteFileOfContract = createAsyncThunk(
  "attachment/fetchApiDeleteFileOfContract",
  async ({ hopDongId, fileId }) => {
    try {
      const res = await postRequest(
        `upload/delete?FileDinhKemId=${fileId}&HopdongId=${hopDongId}`
      );
      console.log("res del file", res.data.data);
      toast.success("Xóa thành công file.");

      return res.data.data;
    } catch (error) {
      toast.error("Xóa không thành công file!");
      console.log({ error });
    }
  }
);

export { fetchApiSaveFileToContract, fetchApiDeleteFileOfContract };

export default attachmentSlice;
